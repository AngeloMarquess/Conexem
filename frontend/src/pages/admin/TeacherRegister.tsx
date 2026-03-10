import { useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle, Camera, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../utils/supabase';

export function TeacherRegister() {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        usuario: '',
        email: '',
        dataNascimento: '',
        whatsapp: '',
        areaAtuacao: '',
        senha: '',
        confirmacaoSenha: ''
    });

    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [diplomaFile, setDiplomaFile] = useState<File | null>(null);
    const [certificadosFiles, setCertificadosFiles] = useState<File[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errMsg, setErrMsg] = useState('');

    const photoInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const certsInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleDiplomaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDiplomaFile(e.target.files[0]);
        }
    };

    const handleCertificadosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCertificadosFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmacaoSenha) {
            return;
        }

        setIsLoading(true);
        setStatus('idle');
        setErrMsg('');

        try {
            // 1. Create Auth User Native Flow
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.senha,
                options: {
                    data: {
                        full_name: `${formData.nome} ${formData.sobrenome}`,
                        role: 'teacher'
                    }
                }
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error('Usuário não criado.');

            const userId = authData.user.id;
            let avatarUrl = null;
            let diplomaUrl = null;
            const certsUrls: string[] = [];

            // 2. Upload Avatar
            if (photoFile) {
                const fileExt = photoFile.name.split('.').pop();
                const filePath = `${userId}/avatar.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, photoFile);
                if (!uploadError) {
                    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
                    avatarUrl = data.publicUrl;
                }
            }

            // 3. Upload Diploma
            if (diplomaFile) {
                const fileExt = diplomaFile.name.split('.').pop();
                const filePath = `${userId}/diploma.${fileExt}`;
                const { error: dError } = await supabase.storage.from('documents').upload(filePath, diplomaFile);
                if (!dError) {
                    const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
                    diplomaUrl = data.publicUrl;
                }
            }

            // 4. Upload Certificados
            for (let i = 0; i < certificadosFiles.length; i++) {
                const file = certificadosFiles[i];
                const fileExt = file.name.split('.').pop();
                const filePath = `${userId}/certificado_${i}.${fileExt}`;
                const { error: cError } = await supabase.storage.from('documents').upload(filePath, file);
                if (!cError) {
                    const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
                    certsUrls.push(data.publicUrl);
                }
            }

            // 5. Update Profile
            const { error: profileError } = await supabase
                .from('users')
                .update({
                    username: formData.usuario,
                    whatsapp: formData.whatsapp,
                    date_of_birth: formData.dataNascimento,
                    avatar_url: avatarUrl,
                    area_atuacao: formData.areaAtuacao,
                    diploma_url: diplomaUrl,
                    certificados_urls: certsUrls
                })
                .eq('id', userId);

            if (profileError) throw profileError;

            setStatus('success');
            // reset form here if needed for consecutive creations

        } catch (error: any) {
            console.error('Error saving teacher:', error);
            setStatus('error');
            setErrMsg(error.message || 'Erro inesperado ao cadastrar professor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Cadastro de Professores</h1>

            <div className="bg-white shadow-sm border border-slate-100 rounded-lg p-8 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Informações Pessoais */}
                    <div>
                        <h2 className="text-xl font-semibold border-b border-slate-100 pb-3 mb-5 text-wine-900">Informações Pessoais</h2>

                        <div className="flex flex-col md:flex-row gap-8 mb-6 items-start">
                            {/* Avatar Upload */}
                            <div className="flex-shrink-0 flex flex-col items-center">
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
                                            <span className="text-[10px] font-medium uppercase tracking-wider text-center leading-tight">Foto de<br />Perfil</span>
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

                            {/* Text Fields Grid */}
                            <div className="flex-grow w-full space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-600">Nome</label>
                                        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required
                                            className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-600">Sobrenome</label>
                                        <input type="text" name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} onChange={handleChange} required
                                            className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Data de nascimento</label>
                                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Whatsapp</label>
                                <input type="tel" name="whatsapp" placeholder="(00) 00000-0000" value={formData.whatsapp} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Área de Atuação</label>
                                <select name="areaAtuacao" value={formData.areaAtuacao} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all">
                                    <option value="" disabled>Selecione a área</option>
                                    <option value="tecnologia">Tecnologia</option>
                                    <option value="marketing">Marketing Digital</option>
                                    <option value="negocios">Negócios</option>
                                    <option value="design">Design</option>
                                    <option value="saude">Saúde</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Documentação */}
                    <div>
                        <h2 className="text-xl font-semibold border-b border-slate-100 pb-3 mb-5 text-wine-900">Documentação (Upload de Arquivos)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Diploma */}
                            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}>
                                <UploadCloud className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                <p className="text-sm font-medium text-slate-700">Clique para enviar o Diploma (.pdf, .jpg)</p>
                                {diplomaFile && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-wine-800 bg-wine-50 px-3 py-2 rounded-lg">
                                        <File size={16} />
                                        <span className="text-sm font-semibold truncate max-w-[200px]">{diplomaFile.name}</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" ref={fileInputRef} onChange={handleDiplomaChange} accept=".pdf,.jpg,.jpeg,.png" />
                            </div>

                            {/* Certificados */}
                            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer"
                                onClick={() => certsInputRef.current?.click()}>
                                <UploadCloud className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                <p className="text-sm font-medium text-slate-700">Clique para enviar os Certificados (múltiplos)</p>
                                {certificadosFiles.length > 0 && (
                                    <div className="mt-4 text-wine-800 bg-wine-50 px-3 py-2 rounded-lg">
                                        <p className="text-sm font-semibold">{certificadosFiles.length} arquivos selecionados</p>
                                    </div>
                                )}
                                <input type="file" multiple className="hidden" ref={certsInputRef} onChange={handleCertificadosChange} accept=".pdf,.jpg,.jpeg,.png" />
                            </div>
                        </div>
                    </div>

                    {/* Dados de Acesso */}
                    <div>
                        <h2 className="text-xl font-semibold border-b border-slate-100 pb-3 mb-5 text-wine-900">Dados de Acesso</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Usuário</label>
                                <input type="text" name="usuario" placeholder="Nome de usuário" value={formData.usuario} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">E-mail</label>
                                <input type="email" name="email" placeholder="email@conexem.com" value={formData.email} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Senha</label>
                                <input type="password" name="senha" placeholder="Senha forte" value={formData.senha} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Confirmação de senha</label>
                                <input type="password" name="confirmacaoSenha" placeholder="Confirme a senha" value={formData.confirmacaoSenha} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all" />
                            </div>
                        </div>
                        {formData.senha && formData.confirmacaoSenha && formData.senha !== formData.confirmacaoSenha && (
                            <div className="flex items-center gap-2 mt-3 text-rose-500 text-sm font-medium">
                                <AlertCircle size={16} /> Senhas não conferem!
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex flex-col items-end gap-3 mt-4">
                        {status === 'success' && (
                            <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 p-3 rounded-md w-full justify-end">
                                <CheckCircle className="w-5 h-5" /> Professor cadastrado com sucesso!
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-rose-500 font-medium bg-rose-50 p-3 rounded-md w-full justify-end">
                                <AlertCircle className="w-5 h-5" /> {errMsg}
                            </div>
                        )}

                        <button type="submit"
                            disabled={formData.senha !== formData.confirmacaoSenha || isLoading}
                            className="bg-[#4A2333] hover:bg-[#3B0E20] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-10 py-3.5 rounded-lg font-bold transition-colors duration-200 shadow-md flex items-center gap-2">
                            {isLoading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Mapeando Arquivos e Cadastrando...</>
                            ) : (
                                "Cadastrar Professor"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
