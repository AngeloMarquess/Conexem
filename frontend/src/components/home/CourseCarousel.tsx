import { PlayCircle, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
    id: string;
    title: string;
    thumbnailUrl: string;
    teacher: string;
    progress?: number;
    duration?: string;
    isNew?: boolean;
}

export function CourseCard({ title, thumbnailUrl, teacher, progress, duration, isNew }: CourseCardProps) {
    return (
        <Link to="/classroom" className="group rounded-xl overflow-hidden bg-wine-950/20 border border-white/5 hover:border-amber-400/50 transition-all flex flex-col h-full relative cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-wine-950/50">

            {/* Thumbnail Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-amber-500 rounded-full p-3 shadow-lg shadow-amber-500/50 scale-75 group-hover:scale-100 transition-transform">
                        <PlayCircle className="w-8 h-8 text-wine-950 fill-current" />
                    </div>
                </div>

                {isNew && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                        Novo
                    </span>
                )}

                {duration && !progress && (
                    <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-sm">
                        <Clock className="w-3 h-3" /> {duration}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-white mb-1 line-clamp-2 leading-tight group-hover:text-amber-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">{teacher}</p>
                </div>

                {/* Progress Bar (if exists) */}
                {progress !== undefined && (
                    <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-slate-300 font-medium">Progresso</span>
                            {progress === 100 ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                                <span className="text-amber-400 font-bold">{progress}%</span>
                            )}
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-green-500' : 'bg-amber-500'}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}

interface CourseCarouselProps {
    title: string;
    courses: CourseCardProps[];
}

export function CourseCarousel({ title, courses }: CourseCarouselProps) {
    return (
        <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 font-serif">{title}</h2>

            {/* Scrollable Container (Netflix style swipe) */}
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 px-1 custom-scrollbar snap-x">
                {courses.map((course, idx) => (
                    <div key={idx} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
                        <CourseCard {...course} />
                    </div>
                ))}
            </div>
        </div>
    );
}
