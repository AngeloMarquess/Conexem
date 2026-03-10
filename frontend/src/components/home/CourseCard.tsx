import { ProgressBar } from '../ui/core';

interface CourseCardProps {
    title: string;
    thumbnail: string;
    progress?: number;
}

export function CourseCard({ title, thumbnail, progress }: CourseCardProps) {
    return (
        <div className="flex-none w-[260px] lg:w-[320px] group cursor-pointer">
            <div className="relative rounded-md overflow-hidden aspect-video bg-zinc-800 transition-transform duration-300 group-hover:scale-105 group-hover:z-10 shadow-lg">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* Overlay on hover/always slightly visible at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2">{title}</h3>
                </div>

                {/* Progress Bar fixed at bottom if applicable */}
                {progress !== undefined && (
                    <div className="absolute bottom-0 w-full">
                        <ProgressBar progress={progress} className="rounded-none h-1" />
                    </div>
                )}
            </div>
        </div>
    );
}
