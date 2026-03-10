import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

const data = [
    { diasSemAcesso: 1, progresso: 90, z: 200, name: 'João Silva' },
    { diasSemAcesso: 8, progresso: 25, z: 200, name: 'Maria Souza' },
    { diasSemAcesso: 14, progresso: 10, z: 200, name: 'Pedro Alves' },
    { diasSemAcesso: 3, progresso: 60, z: 200, name: 'Ana Beatriz' },
    { diasSemAcesso: 20, progresso: 5, z: 200, name: 'Carlos Santos' },
    { diasSemAcesso: 5, progresso: 80, z: 200, name: 'Juliana Costa' },
];

export function ChurnRiskScatterChart() {
    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl h-[400px]">
            <h3 className="text-white font-semibold mb-6">Mapa de Risco de Evasão (Dias vs Progresso)</h3>
            <ResponsiveContainer width="100%" height="85%">
                <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis type="number" dataKey="diasSemAcesso" name="Dias inativo" unit=" dias" stroke="#a1a1aa" />
                    <YAxis type="number" dataKey="progresso" name="Progresso" unit="%" stroke="#a1a1aa" />
                    <ZAxis type="number" range={[100, 300]} name="Volume" />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                    />
                    <Scatter name="Alunos" data={data} fill="#e50914" shape="circle" fillOpacity={0.8} />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
