import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/core';

export function InactiveUsersTable({ users = [] }: { users: any[] }) {
    // Map backend telemetry payload onto expected mock-style local formatting
    const mappedUsers = users.map((u, idx) => ({
        id: u.id || idx,
        name: u.full_name,
        lastActive: `${u.daysInactive} dias atrás`,
        module: 'Módulo Pendente', // Could be fetched from a deeper JOIN on progress table
        risk: u.riskLevel === 'High' ? 'Crítico' : 'Alto'
    }));

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl overflow-hidden mt-8">
            <h3 className="text-white font-semibold mb-6">Alunos inativos ({'>'} 7 dias)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-zinc-400 border-b border-zinc-800">
                            <th className="pb-4 font-medium">Nome</th>
                            <th className="pb-4 font-medium">Último Acesso</th>
                            <th className="pb-4 font-medium">Módulo Estagnado</th>
                            <th className="pb-4 font-medium">Risco</th>
                            <th className="pb-4 font-medium text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-zinc-200">
                        {mappedUsers.map(u => (
                            <tr key={u.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                                <td className="py-4 font-medium">{u.name}</td>
                                <td className="py-4">{u.lastActive}</td>
                                <td className="py-4">{u.module}</td>
                                <td className="py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-netflix/20 text-brand-netflix">
                                        {u.risk}
                                    </span>
                                </td>
                                <td className="py-4 text-right">
                                    <Button variant="secondary" className="px-4 py-2 text-sm flex gap-2 items-center ml-auto">
                                        <MessageCircle size={16} /> Resgatar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
