import { useState } from 'react';
import axios from 'axios';
import { CloudRain, CheckCircle, Loader2, AlertTriangle, KeySquare, Building } from 'lucide-react';

export function OnipublishIntegration() {
    const [formData, setFormData] = useState({
        instituicao: '',
        token: ''
    });

    const [isSyncing, setIsSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSync = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSyncing(true);
        setSyncStatus('idle');
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:3000/api/onipublish/sync', formData);
            if (response.data.success) {
                setSyncStatus('success');
            } else {
                setSyncStatus('error');
                setErrorMessage(response.data.error || 'Erro desconhecido');
            }
        } catch (error: any) {
            console.error("AXIOS ERROR", error);
            setSyncStatus('error');
            try {
                let detail = error.message;
                if (error.response?.data) {
                    const data = error.response.data;
                    if (data.details && Array.isArray(data.details)) {
                        detail = data.details.map((d: any) => d.message).join(', ');
                    } else if (data.error) {
                        detail = data.error;
                    }
                }
                setErrorMessage(detail);
            } catch (innerError: any) {
                setErrorMessage("Erro crítico ao formatar resposta: " + innerError.message);
            }
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-3 mb-8">
                <CloudRain className="w-8 h-8 text-wine-900" />
                <h1 className="text-3xl font-bold text-slate-800">Integração Onipublish</h1>
            </div>

            <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-8 max-w-3xl">

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8 flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-amber-800 font-bold mb-1">Como funciona a sincronização?</h3>
                        <p className="text-amber-700 text-sm leading-relaxed">
                            Ao clicar em Sincronizar, nossa plataforma iŕá conectar diretamente no banco de dados do Onipublish e importar
                            automaticamente todas as Disciplinas, Unidades, links de Vídeos e estruturar dentro do modelo Conexem.
                            Isso pode demorar alguns minutos dependendo do tamanho da sua base.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSync} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-600 flex items-center gap-2">
                                <Building className="w-4 h-4" /> Código da Instituição
                            </label>
                            <input type="text" name="instituicao" placeholder="Ex: 12345" value={formData.instituicao} onChange={handleChange} required
                                className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-slate-50 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all font-mono" />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-600 flex items-center gap-2">
                                <KeySquare className="w-4 h-4" /> Token de Segurança (32 Caracteres)
                            </label>
                            <input type="password" name="token" placeholder="********************************" value={formData.token} onChange={handleChange} required
                                className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-slate-50 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all font-mono" />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex-1">
                            {syncStatus === 'success' && (
                                <div className="flex items-center gap-2 text-green-600 font-medium animate-in fade-in slide-in-from-bottom-2">
                                    <CheckCircle className="w-5 h-5" /> Importação concluída com sucesso!
                                </div>
                            )}
                            {syncStatus === 'error' && (
                                <div className="flex flex-col text-rose-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        <span>Erro ao tentar sincronizar.</span>
                                    </div>
                                    {errorMessage && (
                                        <span className="text-sm mt-1 ml-7 text-rose-400">{errorMessage}</span>
                                    )}
                                </div>
                            )}
                        </div>

                        <button type="submit" disabled={isSyncing || !formData.instituicao || !formData.token}
                            className="bg-[#4A2333] hover:bg-[#3B0E20] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-lg font-bold transition-colors duration-200 shadow-md flex items-center gap-2">
                            {isSyncing ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Sincronizando e Criando Cursos...</>
                            ) : (
                                <><CloudRain className="w-5 h-5" /> Sincronizar Agora</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
