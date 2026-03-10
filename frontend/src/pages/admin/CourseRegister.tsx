import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Plus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { Modal } from '../../components/ui/Modal';

export function CourseRegister() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        instructor_id: '', // Would be a dropdown populated from the backend
    });

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Modal & Categories State
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([
        { id: 'tecnologia', name: 'Tecnologia' },
        { id: 'marketing', name: 'Marketing Digital' },
        { id: 'negocios', name: 'Negócios' },
        { id: 'design', name: 'Design' },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errMsg, setErrMsg] = useState('');

    const handleSaveNewCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        const newId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
        setCategories([...categories, { id: newId, name: newCategoryName }]);
        setFormData({ ...formData, category: newId }); // Auto-select the new one
        setNewCategoryName('');
        setIsCategoryModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');
        setErrMsg('');

        try {
            let thumbnailUrl = null;

            // 1. Upload Thumbnail to Supabase Bucket if provided
            if (thumbnailFile) {
                const fileExt = thumbnailFile.name.split('.').pop();
                const filePath = `courses/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('thumbnails')
                    .upload(filePath, thumbnailFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('thumbnails')
                    .getPublicUrl(filePath);

                thumbnailUrl = data.publicUrl;
            }

            // 2. Register native course entity inside database
            const { error: insertError } = await supabase
                .from('courses')
                .insert({
                    title: formData.title,
                    category: formData.category,
                    description: formData.description,
                    thumbnail_url: thumbnailUrl
                    // We assume instructor mapping goes via relation eventually, but basic spec is met.
                });

            if (insertError) throw insertError;

            setStatus('success');
            // reset form here if needed

        } catch (error: any) {
            console.error('Error saving course:', error);
            setStatus('error');
            setErrMsg(error.message || 'Erro inesperado ao cadastrar curso nativo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Cadastro de Curso</h1>

            <div className="bg-white shadow-sm border border-slate-100 rounded-lg p-8 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Esquerda: Informações de Texto */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Título do Curso</label>
                                <input type="text" name="title" placeholder="Ex: Masterclass em Marketing" value={formData.title} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center justify-between text-sm font-medium text-slate-600">
                                    <span>Categoria</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsCategoryModalOpen(true)}
                                        className="text-wine-800 hover:text-wine-950 font-bold text-xs flex items-center gap-1 transition-colors"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Nova Categoria
                                    </button>
                                </label>
                                <select name="category" value={formData.category} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all">
                                    <option value="" disabled>Selecione a categoria</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Professor / Instrutor</label>
                                <select name="instructor_id" value={formData.instructor_id} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all">
                                    <option value="" disabled>Selecione o professor</option>
                                    <option value="dev_prof_1">José Osvaldo</option>
                                    <option value="dev_prof_2">Sâmia Ribeiro</option>
                                    {/* Isso virá da base futuramente */}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Descrição</label>
                                <textarea name="description" placeholder="Descreva brevemente o que os alunos aprenderão neste curso..." value={formData.description} onChange={handleChange} rows={5} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all resize-none" />
                            </div>
                        </div>

                        {/* Direita: Upload da Thumbnail */}
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Capa do Curso (Thumbnail)</label>
                            <div
                                className="bg-slate-50 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 h-[calc(100%-28px)] hover:bg-slate-100 transition-colors cursor-pointer group"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {thumbnailFile ? (
                                    <div className="relative w-full h-full min-h-[200px] flex items-center justify-center rounded-lg overflow-hidden bg-black/5 group-hover:opacity-80 transition-opacity">
                                        <ImageIcon className="absolute text-slate-300 w-16 h-16 -z-10" />
                                        {/* Preview simplificado */}
                                        <span className="bg-white/90 text-wine-900 px-4 py-2 rounded-lg font-bold text-sm shadow-md">
                                            {thumbnailFile.name}
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <UploadCloud className="h-16 w-16 text-slate-300 mb-4 group-hover:-translate-y-1 transition-transform" />
                                        <p className="text-sm font-medium text-slate-700">Clique para enviar a imagem capa</p>
                                        <p className="text-xs text-slate-400 mt-2 text-center">Recomendado: 1920x1080px (Proporção 16:9)<br />JPG ou PNG até 5MB.</p>
                                    </>
                                )}
                                <input type="file" className="hidden" ref={fileInputRef} onChange={handleThumbnailChange} accept=".jpg,.jpeg,.png,.webp" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col items-end gap-3 border-t border-slate-100 mt-8 pt-8">
                        {status === 'success' && (
                            <div className="flex items-center justify-center gap-2 text-green-600 font-medium bg-green-50 p-3 rounded-md w-full">
                                <CheckCircle className="w-5 h-5" /> Curso criado com sucesso!
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex items-center justify-center gap-2 text-rose-500 font-medium bg-rose-50 p-3 rounded-md w-full">
                                <AlertCircle className="w-5 h-5" /> {errMsg}
                            </div>
                        )}

                        <button type="submit"
                            disabled={isLoading}
                            className="bg-[#4A2333] hover:bg-[#3B0E20] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-10 py-3.5 rounded-lg font-bold transition-colors duration-200 shadow-md flex items-center gap-2">
                            {isLoading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Cadastrando Curso...</>
                            ) : (
                                "Salvar Curso"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal for New Category */}
            <Modal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                title="Nova Categoria"
            >
                <form onSubmit={handleSaveNewCategory} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Nome da Categoria</label>
                        <input
                            type="text"
                            placeholder="Ex: Tecnologia, Vendas..."
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            autoFocus
                            className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-slate-50 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wine-800 transition-all"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(false)}
                            className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!newCategoryName.trim()}
                            className="bg-wine-900 hover:bg-wine-950 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold transition-colors"
                        >
                            Salvar Categoria
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
