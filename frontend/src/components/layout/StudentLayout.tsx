import { Outlet, Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

export function StudentLayout() {
    return (
        <div className="min-h-screen bg-card-bg text-white font-sans selection:bg-wine-600 selection:text-white">
            {/* Header Fixo */}
            <header className="sticky top-0 z-50 bg-wine-950/80 backdrop-blur-md border-b border-white/5 transition-all">
                <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">

                    {/* Logo & Navigation */}
                    <div className="flex items-center gap-8">
                        <Link to="/dashboard" className="flex items-center gap-3 group">
                            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-gradient-to-br from-wine-900 via-plum-600 to-amber-400 place-items-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <span className="font-serif text-xl font-bold text-white">Cx</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                                Conexem
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6 ml-4">
                            <Link to="/dashboard" className="text-sm font-medium text-white hover:text-amber-400 transition-colors">Início</Link>
                            <Link to="/dashboard/courses" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Meus Cursos</Link>
                            <Link to="/dashboard/community" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Comunidade</Link>
                        </nav>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        <div className="hidden sm:flex relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar cursos..."
                                className="w-48 lg:w-64 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white/10 transition-all"
                            />
                        </div>

                        <button className="relative p-2 text-slate-300 hover:text-white transition-colors group">
                            <Bell className="w-5 h-5 group-hover:animate-swing" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-wine-950"></span>
                        </button>

                        <div className="flex items-center gap-3 border-l border-white/10 pl-4 lg:pl-6 ml-2">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-sm font-semibold text-white">Aluno Teste</span>
                                <span className="text-xs text-amber-400 font-medium tracking-wide">1.250 XP</span>
                            </div>
                            <Link to="/dashboard/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border-2 border-transparent hover:border-amber-400 transition-colors overflow-hidden">
                                <User className="text-slate-400 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Render */}
            <main className="w-full flex-grow">
                <Outlet />
            </main>

        </div>
    );
}
