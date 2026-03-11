import { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Settings2, SkipBack, SkipForward, PlayCircle } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/auth';

export function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const session = useAuthStore(s => s.session);

    const togglePlay = async () => {
        const nextState = !isPlaying;
        setIsPlaying(nextState);

        // Simulated trigger - Only log 'lesson_start' if it just started playing
        if (nextState && session?.user) {
            try {
                await axios.post('http://localhost:3000/api/telemetry/log', {
                    userId: session.user.id,
                    actionType: 'lesson_start'
                    // lessonId would dynamically come via props based on the mapped array logic, currently generic for UI sample hooks
                });
            } catch (err) {
                console.error("Failed to map interaction trace telemetry", err);
            }
        }
    };

    return (
        <div className="w-full relative bg-black aspect-video rounded-xl overflow-hidden group shadow-2xl ring-1 ring-white/10">
            {/* Video Placeholder - Would be an actual <video> or iframe in production */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
                <PlayCircle className="w-20 h-20 text-white/20" />
            </div>

            {/* Video Overlay Info (top) */}
            <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-xl font-bold">Módulo 1: Introdução ao Mercado</h2>
                <p className="text-slate-300 text-sm">Aula 01 - O que é Inbound Marketing?</p>
            </div>

            {/* Video Controls (bottom) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 cursor-pointer group/progress relative">
                    <div className="h-full bg-amber-500 w-[45%] relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full scale-0 group-hover/progress:scale-100 transition-transform"></div>
                    </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="text-white hover:text-amber-400 transition-colors">
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                        </button>
                        <button className="text-white hover:text-amber-400 transition-colors">
                            <SkipBack className="w-5 h-5" />
                        </button>
                        <button className="text-white hover:text-amber-400 transition-colors">
                            <SkipForward className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2 group/volume ml-2">
                            <button className="text-white hover:text-amber-400 transition-colors">
                                <Volume2 className="w-5 h-5" />
                            </button>
                            <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 origin-left">
                                <div className="w-full h-1 bg-white/20 rounded-full mt-2 cursor-pointer">
                                    <div className="w-[70%] h-full bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <span className="text-white/80 text-sm ml-2 font-mono">14:20 / 25:00</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-white hover:text-amber-400 transition-colors hidden sm:block">
                            <span className="text-sm font-semibold border-2 border-current px-1.5 py-0.5 rounded text-[10px]">CC</span>
                        </button>
                        <button className="text-white hover:text-amber-400 transition-colors">
                            <Settings2 className="w-5 h-5" />
                        </button>
                        <button className="text-white hover:text-amber-400 transition-colors">
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
