import { PlayCircle, CheckCircle2, Lock } from 'lucide-react';

const mockModules = [
    {
        id: 1,
        title: 'Módulo 1: Introdução ao Mercado',
        progress: 100,
        lessons: [
            { id: 101, title: 'O que é Inbound Marketing?', duration: '25:00', status: 'completed' },
            { id: 102, title: 'A Jornada de Compra', duration: '18:30', status: 'completed' },
            { id: 103, title: 'Funil de Vendas na Prática', duration: '32:15', status: 'completed' },
        ]
    },
    {
        id: 2,
        title: 'Módulo 2: Estratégias de Atração',
        progress: 45,
        lessons: [
            { id: 201, title: 'Criando sua primeira Persona', duration: '22:10', status: 'completed' },
            { id: 202, title: 'SEO: O guia definitivo', duration: '45:00', status: 'playing' },
            { id: 203, title: 'Marketing de Conteúdo', duration: '28:40', status: 'locked' },
        ]
    },
    {
        id: 3,
        title: 'Módulo 3: Conversão e Fechamento',
        progress: 0,
        lessons: [
            { id: 301, title: 'Landing Pages de Alta Conversão', duration: '35:20', status: 'locked' },
            { id: 302, title: 'Email Marketing Automations', duration: '40:00', status: 'locked' },
        ]
    }
];

export function SidebarRoadmap() {
    return (
        <div className="w-full h-full bg-wine-950/30 rounded-xl border border-white/5 overflow-hidden flex flex-col">

            {/* Header Sidebar */}
            <div className="p-5 border-b border-white/5 bg-wine-950/50">
                <h3 className="text-lg font-bold text-white mb-2">Trilha do Curso</h3>
                <div className="flex items-center gap-3">
                    <div className="flex-grow h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full w-[45%]"></div>
                    </div>
                    <span className="text-xs font-semibold text-amber-400">45%</span>
                </div>
            </div>

            {/* Modules List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col">
                    {mockModules.map((modulo) => (
                        <div key={modulo.id} className="border-b border-white/5">

                            {/* Module Header */}
                            <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left group">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{modulo.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{modulo.lessons.length} aulas</p>
                                </div>
                                {modulo.progress === 100 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                            </button>

                            {/* Lessons List */}
                            <div className="flex flex-col py-2">
                                {modulo.lessons.map((lesson) => (
                                    <button
                                        key={lesson.id}
                                        className={`flex items-start gap-4 p-3 pl-6 hover:bg-white/5 transition-colors text-left w-full
                      ${lesson.status === 'playing' ? 'bg-amber-500/10 border-l-2 border-amber-500' : 'border-l-2 border-transparent'}
                      ${lesson.status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                                    >
                                        <div className="mt-0.5">
                                            {lesson.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                            {lesson.status === 'playing' && <PlayCircle className="w-4 h-4 text-amber-500" />}
                                            {lesson.status === 'locked' && <Lock className="w-4 h-4 text-slate-500" />}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${lesson.status === 'playing' ? 'text-amber-400' : 'text-slate-300'}`}>
                                                {lesson.title}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">{lesson.duration}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
