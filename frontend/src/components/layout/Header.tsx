import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300">
            <div className="flex items-center justify-between px-6 py-4 lg:px-12">
                <Link to="/" className="text-brand-netflix text-3xl font-bold tracking-tighter">
                    EDFLIX
                </Link>

                <div className="flex items-center gap-6 text-white">
                    <button className="flex items-center gap-2 hover:text-gray-300 transition">
                        <Search className="w-5 h-5" />
                        <span className="hidden sm:block">Buscar</span>
                    </button>

                    <button className="hover:text-gray-300 transition">
                        <Bell className="w-5 h-5" />
                    </button>

                    <button className="hover:text-gray-300 transition">
                        <User className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
