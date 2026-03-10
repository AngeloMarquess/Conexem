import { PlayCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroContinueWatching() {
    return (
        <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden group mb-12 shadow-2xl ring-1 ring-white/5">
            {/* Background Image / Gradient map */}
            <div className="absolute inset-0 bg-slate-900">
                <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
                    alt="Course Cover"
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-wine-950 via-wine-950/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">

                {/* Flag */}
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full border border-amber-500/20 w-fit mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wide uppercase">Continue de onde parou</span>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl mb-4 font-serif">
                    Masterclass em Inbound Marketing B2B
                </h1>

                <p className="text-slate-300 max-w-2xl text-lg mb-8 line-clamp-2">
                    Módulo 2 • Aula 02: SEO: O guia definitivo para buscas orgânicas. Prepare-se para dominar os maiores motores de busca.
                </p>

                {/* Progress & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <Link to="/classroom" className="bg-white text-wine-950 hover:bg-slate-200 transition-colors px-8 py-3.5 rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl">
                        <PlayCircle className="w-6 h-6 fill-current text-wine-950" /> Retomar Aula
                    </Link>

                    <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg">
                            <Clock className="w-4 h-4 text-slate-400" />
                            Faltam 14min
                        </div>
                        <span>45% concluído</span>
                    </div>
                </div>

                {/* Bottom progress line indication */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
                    <div className="h-full bg-amber-500 w-[45%] relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
