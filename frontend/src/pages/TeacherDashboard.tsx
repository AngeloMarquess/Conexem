import { KpiCards } from '../components/dashboard/KpiCards';
import { ChurnRiskScatterChart } from '../components/dashboard/ChurnRiskScatterChart';
import { InactiveUsersTable } from '../components/dashboard/InactiveUsersTable';

export function TeacherDashboard() {
    return (
        <div className="min-h-screen bg-zinc-950 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Painel de Evasão (Churn)</h1>
                    <p className="text-zinc-400 mt-2">Visão geral do engajamento e métricas de risco preditivas</p>
                </header>

                <KpiCards />
                <ChurnRiskScatterChart />
                <InactiveUsersTable />

            </div>
        </div>
    );
}
