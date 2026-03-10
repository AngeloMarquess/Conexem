export function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
    const baseStyle = "px-6 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-brand-netflix hover:bg-brand-netflix/80 text-white shadow-lg",
        secondary: "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}

export function ProgressBar({ progress, className = '' }: { progress: number, className?: string }) {
    return (
        <div className={`w-full bg-white/10 rounded-full h-1.5 overflow-hidden ${className}`}>
            <div
                className="bg-brand-netflix h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            ></div>
        </div>
    );
}

export function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-zinc-800 rounded-md ${className}`}></div>
    );
}
