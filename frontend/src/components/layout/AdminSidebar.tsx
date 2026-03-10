import { CloudRain } from 'lucide-react';
import { Users, BookOpen, GraduationCap, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function AdminSidebar() {
    const location = useLocation();

    const links = [
        { to: '/admin/students/new', label: 'Alunos', icon: GraduationCap },
        { to: '/admin/teachers/new', label: 'Professores', icon: Users },
        { to: '/admin/courses/new', label: 'Cursos', icon: BookOpen },
        { to: '/admin/integrations/onipublish', label: 'Onipublish', icon: CloudRain },
        { to: '/admin/settings', label: 'Configurações', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-card-bg border-r border-white/10 flex flex-col h-full sticky top-0">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3 font-extrabold text-white">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-wine-900 via-plum-600 to-amber-400 grid place-items-center shadow-lg">
                        <span className="font-serif text-lg tracking-wide">Cx</span>
                    </div>
                    <span className="tracking-wide">Admin</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const active = location.pathname.startsWith(link.to);
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active
                                ? 'bg-wine-900 text-white font-semibold'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <link.icon size={20} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-white/5 hover:text-rose-400 rounded-xl transition-colors">
                    <LogOut size={20} />
                    Sair
                </button>
            </div>
        </aside>
    );
}
