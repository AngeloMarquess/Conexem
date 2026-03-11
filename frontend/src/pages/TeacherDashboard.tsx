import { useState, useEffect } from 'react';
import axios from 'axios';
import { KpiCards } from '../components/dashboard/KpiCards';
import { ChurnRiskScatterChart } from '../components/dashboard/ChurnRiskScatterChart';
import { InactiveUsersTable } from '../components/dashboard/InactiveUsersTable';

export function TeacherDashboard() {
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/telemetry/churn-risk');
                if (res.data.success) {
                    setMetrics(res.data.data);
                }
            } catch (error) {
                console.error('Failed to load telemetry', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Painel de Evasão (Churn)</h1>
                    <p className="text-zinc-400 mt-2">Visão geral do engajamento e métricas de risco preditivas</p>
                </header>

                {loading ? (
                    <div className="text-zinc-400 py-10 w-full text-center">Calculando preditivos analíticos...</div>
                ) : metrics ? (
                    <>
                        <KpiCards data={metrics} />
                        <ChurnRiskScatterChart data={metrics} />
                        <InactiveUsersTable users={metrics.highRiskUsers} />
                    </>
                ) : (
                    <div className="text-red-500 w-full text-center">Nenhum dado analítico encontrado.</div>
                )}
            </div>
        </div>
    );
}
