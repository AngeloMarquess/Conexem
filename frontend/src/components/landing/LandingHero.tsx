import { Play } from 'lucide-react';

export function LandingHero() {
    return (
        <section id="home" className="relative pt-24 pb-10 overflow-hidden">
            {/* Background Mask */}
            <div className="absolute inset-0 bg-gradient-to-br from-wine-900/90 via-plum-600/65 to-amber-400/45 opacity-60 pointer-events-none"
                style={{ maskImage: 'radial-gradient(70% 60% at 70% 20%, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(70% 60% at 70% 20%, black 40%, transparent 70%)' }}>
            </div>

            <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                <div className="relative z-10">
                    <span className="text-amber-400 font-bold tracking-widest uppercase text-xs">
                        Tecnologia & conversão
                    </span>
                    <h1 className="text-5xl lg:text-6xl font-black leading-tight mt-2 mb-4 text-white">
                        Mais do que plataforma: <span className="bg-gradient-to-r from-amber-400 via-terra-500 to-plum-600 bg-clip-text text-transparent">o ecossistema</span> para vender cursos com aparência premium.
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6">
                        Hospede, venda e entregue conteúdo com a experiência que o seu aluno merece checkouts otimizados, players rápidos, áreas de membros modernas e automações nativas.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <a href="https://wa.me/message/SNZYA6TP2P5EO1"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-white bg-gradient-to-br from-wine-900 via-plum-600 to-amber-400 shadow-lg border border-white/5 hover:scale-105 transition-transform">
                            Começar agora
                        </a>
                        <a href="#recursos"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-white bg-white/5 border border-white/15 hover:bg-white/10 transition-colors">
                            Ver recursos
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-5 mt-8">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl min-w-[140px]">
                            <b className="text-2xl text-white">+12k</b>
                            <div className="text-slate-400 text-sm">alunos ativos</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl min-w-[140px]">
                            <b className="text-2xl text-white">+200</b>
                            <div className="text-slate-400 text-sm">Infoprodutores</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl min-w-[140px]">
                            <b className="text-2xl text-white">3x</b>
                            <div className="text-slate-400 text-sm">mais conversão</div>
                        </div>
                    </div>
                </div>

                {/* Video Card Area */}
                <div className="relative z-10 bg-card-bg border border-white/10 p-6 rounded-3xl shadow-2xl"
                    style={{ backgroundImage: 'radial-gradient(600px 400px at 20% 0%, rgba(214,143,74,.15), transparent 60%),radial-gradient(600px 400px at 100% 100%, rgba(142,62,103,.15), transparent 60%)' }}>
                    <div className="aspect-[16/10] rounded-xl relative overflow-hidden flex items-center justify-center border border-white/10 bg-black">
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop" alt="Hero background" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

                        <button className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-wine-900 via-plum-600 to-amber-400 shadow-xl hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white fill-white ml-2" />
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 mt-6 opacity-90">
                        <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white">Confiável por criadores</span>
                        <img alt="logo 1" src="https://dummyimage.com/120x26/ffffff/000000.png&text=Marca+1" className="h-6 opacity-75 grayscale sepia" />
                        <img alt="logo 2" src="https://dummyimage.com/120x26/ffffff/000000.png&text=Marca+2" className="h-6 opacity-75 grayscale sepia" />
                    </div>
                </div>
            </div>
        </section>
    );
}
