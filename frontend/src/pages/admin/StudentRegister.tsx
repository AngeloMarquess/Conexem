import { useState, useRef } from 'react';
import { Camera, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '../../utils/supabase';

export function StudentRegister() {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        usuario: '',
        email: '',
        dataNascimento: '',
        whatsapp: '',
        senha: '',
        confirmacaoSenha: ''
    });

    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errMsg, setErrMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');
        setErrMsg('');

        if (formData.senha !== formData.confirmacaoSenha) {
            setErrMsg('As senhas não coincidem.');
            setStatus('error');
            setIsLoading(false);
            return;
        }

        try {
            // 1. Create user via backend API (uses service_role key, bypasses RLS)
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.senha,
                    full_name: `${formData.nome} ${formData.sobrenome}`,
                    role: 'student',
                    username: formData.usuario,
                    whatsapp: formData.whatsapp,
                    date_of_birth: formData.dataNascimento,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.details || 'Erro ao cadastrar usuário.');
            }

            const userId = result.user?.id;

            // 2. Upload Avatar if exists
            if (photoFile && userId) {
                const fileExt = photoFile.name.split('.').pop();
                const filePath = `${userId}/avatar.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, photoFile);

                if (!uploadError) {
                    const { data: publicUrlData } = supabase.storage
                        .from('avatars')
                        .getPublicUrl(filePath);

                    // Best-effort avatar URL update
                    await fetch(`http://localhost:3000/users/${userId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ avatar_url: publicUrlData.publicUrl }),
                    }).catch(() => { /* avatar update is best-effort */ });
                }
            }

            setStatus('success');

        } catch (error: any) {
            console.error('Error saving student:', error);
            setStatus('error');
            setErrMsg(error.message || 'Erro inesperado ao cadastrar aluno.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Cadastro de alunos</h1>

            <div className="bg-white shadow-sm border border-slate-100 rounded-lg p-8 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div
                            className="relative w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors group overflow-hidden"
                            onClick={() => photoInputRef.current?.click()}
                        >
                            {photoPreview ? (
                                <>
                                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white w-8 h-8" />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-slate-400 group-hover:text-slate-500">
                                    <Camera className="w-8 h-8 mb-1" />
                                    <span className="text-[10px] font-medium uppercase tracking-wider">Foto</span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={photoInputRef}
                            onChange={handlePhotoChange}
                            accept="image/png, image/jpeg, image/jpg"
                            className="hidden"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-600">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-600">Sobrenome</label>
                            <input
                                type="text"
                                name="sobrenome"
                                placeholder="Sobrenome"
                                value={formData.sobrenome}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-600">Usuário</label>
                            <input
                                type="text"
                                name="usuario"
                                placeholder="Usuário"
                                value={formData.usuario}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-600">Whatsapp</label>
                            <input
                                type="tel"
                                name="whatsapp"
                                placeholder="Whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-600">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-600">Data de nascimento</label>
                            <input
                                type="date"
                                name="dataNascimento"
                                value={formData.dataNascimento}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600">Confirmação de senha</label>
                        <input
                            type="password"
                            name="confirmacaoSenha"
                            placeholder="Confirmação de senha"
                            value={formData.confirmacaoSenha}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        {status === 'success' && (
                            <div className="mb-4 flex items-center gap-2 text-green-600 font-medium bg-green-50 p-3 rounded-md">
                                <CheckCircle className="w-5 h-5" /> Aluno cadastrado com sucesso!
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mb-4 flex items-center gap-2 text-rose-500 font-medium bg-rose-50 p-3 rounded-md">
                                <AlertTriangle className="w-5 h-5" /> {errMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#4A2333] hover:bg-[#3B0E20] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Cadastrando...</>
                            ) : (
                                "Cadastrar"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
