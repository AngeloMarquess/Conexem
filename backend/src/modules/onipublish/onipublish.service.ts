import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Requires service role to insert courses unconditionally on private node
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface OnipublishDisciplina {
    id: number;
    nome: string;
    slug: string;
    alteracao: string;
    status: number;
    carga_horaria: number;
    video_introducao: string;
    objetivo: string;
    ementa: string;
    unidades?: Array<{
        id: number;
        nome: string;
        numero: number;
    }>;
}

export class OnipublishService {

    /**
     * Puxa a lista de cursos (Disciplinas) e mapeia para os formatos nativos da plataforma.
     */
    async syncDisciplinas(instituicao: string, token: string) {
        try {
            const BASE_URL = `https://ws.onilearning.com.br/getDisciplinas.php`;
            const queryParams = new URLSearchParams({
                instituicao,
                token,
                unidades: '1', // Requesting direct unities mapping
            });

            const response = await fetch(`${BASE_URL}?${queryParams}`);

            if (!response.ok) {
                throw new Error(`Onipublish API Error: ${response.status}`);
            }

            // Expected return is an array directly evaluating the spec
            const dados: OnipublishDisciplina[] = await response.json();

            if (!Array.isArray(dados)) {
                throw new Error('Formato da API do Onipublish inválido (esperado Array de disciplinas).');
            }

            // Extract and clean valid courses 
            const coursesToInsert = dados
                .filter(disc => disc.status === 1)
                .map(disc => ({
                    // We let Supabase Generate native IDs via default randomUUID if not provided
                    external_id: disc.id.toString(),
                    title: disc.nome,
                    description: disc.objetivo || disc.ementa,
                    thumbnail_url: null, // Depending on additional config, external apis might provide this inside modules
                    category: 'Importados', // Default bucket for missing Onipublish categorization
                    origin: 'onipublish'
                }));

            // Make the Insert
            // Consider an Upsert mapped to 'external_id' if updates should happen dynamically later.
            // For now, straightforward insert matching schema.
            const { data, error } = await supabase
                .from('courses')
                .insert(coursesToInsert)
                .select();

            if (error) {
                throw new Error(`Database Insert Error: ${error.message}`);
            }

            // Process returned values and generate summary map
            return {
                message: `${coursesToInsert.length} cursos sincronizados e criados no banco nativo!`,
                preview: data
            };

        } catch (error) {
            console.error('Falha ao processar Onipublish', error);
            throw error;
        }
    }
}
