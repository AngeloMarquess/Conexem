import { Users, Activity, AlertTriangle } from 'lucide-react';

export function KpiCards() {
    const kpis = [
        { title: 'Total de Alunos', value: '1,245', icon: Users, color: 'text-blue-500' },
        { title: 'Taxa de Engajamento', value: '88%', icon: Activity, color: 'text-green-500' },
        { title: 'Alunos em Risco Crítico', value: '34', icon: AlertTriangle, color: 'text-brand-netflix' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {kpis.map((kpi, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-zinc-400 text-sm font-medium">{kpi.title}</p>
                        <p className="text-3xl font-bold text-white mt-2">{kpi.value}</p>
                    </div>
                    <div className={`p-4 bg-zinc-950 rounded-full ${kpi.color}`}>
                        <kpi.icon size={28} />
                    </div>
                </div>
            ))}
        </div>
    );
}
