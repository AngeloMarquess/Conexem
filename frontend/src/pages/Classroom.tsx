import { VideoPlayer } from '../components/classroom/VideoPlayer';
import { SidebarRoadmap } from '../components/classroom/SidebarRoadmap';
import { ChevronLeft, MessageSquare, Award, Flame, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Classroom() {
    return (
        <div className="container mx-auto px-4 md:px-8 py-6 max-w-[1600px]">

            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Voltar para o curso</span>
                </Link>

                {/* Gamification Quick Stats */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded-full border border-amber-500/20">
                        <Flame className="w-4 h-4" />
                        <span className="text-xs font-bold">12 Dias Seguidos</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-white/5">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs font-bold">1250 XP</span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[75vh]">

                {/* Left Column: Player & Meta */}
                <div className="flex-1 flex flex-col gap-6">
                    <VideoPlayer />

                    <div className="bg-wine-950/20 rounded-xl border border-white/5 p-6 flex-grow">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-white/10 text-slate-300 text-xs font-bold px-2.5 py-1 rounded">Aula 02</span>
                                    <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                                        <Award className="w-3.5 h-3.5" /> +50 XP
                                    </span>
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-2">SEO: O guia definitivo para buscas orgânicas</h1>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
                                    Nesta aula você vai aprender os fundamentos do SEO moderno, como otimizar suas páginas, utilizar palavras-chaves de cauda longa e as principais atualizações do algoritmo do Google para manter seu site rankeando.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
                            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                                <MessageSquare className="w-4 h-4" /> 12 dúvidas no fórum
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Roadmap Sidebar */}
                <div className="w-full lg:w-[400px] flex-shrink-0">
                    <SidebarRoadmap />
                </div>

            </div>
        </div>
    );
}
