import { Check } from 'lucide-react';

export function LandingFeatures() {
    return (
        <>
            <section id="sobre" className="py-20">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Sobre Nós</h2>
                        <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                            A Conexem nasceu para entregar estética premium, velocidade e simplicidade para quem vende conhecimento. Somos criadores e entendemos a dor de quem precisa lançar rápido e escalar com segurança.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {[
                            { icon: '🚀', title: 'Foco em conversão', desc: 'Equipe e empresa mais alinhada em busca de resultados.' },
                            { icon: '🛡️', title: 'Conexões', desc: 'Entre empresários e infoprodutores.' },
                            { icon: '🤝', title: 'Suporte humano', desc: 'Gente que entende negócios digitais migração assistida e time próximo.' }
                        ].map((card, i) => (
                            <div key={i} className="bg-card-bg border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col items-start hover:-translate-y-1 transition-transform"
                                style={{ backgroundImage: 'radial-gradient(400px 200px at 0% 0%, rgba(101,28,45,.25), transparent 60%)' }}>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-wine-900 via-plum-600 to-amber-400 grid place-items-center text-2xl mb-4">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                                <p className="text-slate-400">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section id="infoprodutores" className="py-20 border-y border-white/10 bg-gradient-to-b from-wine-800/20 to-black/80">
                <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                    <div>
                        <span className="text-amber-400 font-bold tracking-widest uppercase text-xs">Para criadores</span>
                        <h2 className="text-4xl font-bold text-white mt-2 mb-8">Ferramentas para lançar e escalar sem fricção</h2>

                        <ul className="space-y-4">
                            {[
                                { title: 'Checkout que vende', desc: 'Upsell 1-clique, cupons, pix e split de pagamento.' },
                                { title: 'Editor de páginas', desc: 'Seções prontas e blocos reordenáveis.' },
                                { title: 'Player rápido & seguro', desc: 'Streaming adaptativo e marca d\'água por aluno.' },
                                { title: 'Automação nativa', desc: 'Dispare aulas, certificados e e-mails por progresso e eventos.' }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 items-start">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-terra-500 flex-shrink-0 grid place-items-center mt-1">
                                        <Check size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <strong className="text-white text-lg block">{item.title}</strong>
                                        <span className="text-slate-400 text-sm mt-1 block">{item.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl">
                        <img alt="Área de membros" className="rounded-xl object-cover w-full h-auto" src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1400&auto=format&fit=crop" />
                    </div>
                </div>
            </section>
        </>
    );
}
