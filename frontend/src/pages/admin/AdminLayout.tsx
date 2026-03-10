import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../../components/layout/AdminSidebar';

export function AdminLayout() {
    return (
        <div className="flex h-screen bg-wine-950 font-sans selection:bg-amber-400 selection:text-wine-950 overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-auto bg-zinc-50 border-l border-white/10">
                {/* Usamos bgColor claro pois o admin dashboard pedido na imagem tem fundo e cards brancos */}
                <div className="p-8 lg:p-12 max-w-5xl mx-auto min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
