import { Check } from 'lucide-react';

export function LandingPricing() {
    return (
        <section id="planos" className="py-24">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Planos simples, foco no seu crescimento</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">Sem letras miúdas. Suporte humano e migração assistida.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Plan 1 */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative flex flex-col">
                        <span className="absolute top-4 right-4 bg-gradient-to-r from-wine-900 to-plum-600 text-xs font-bold px-3 py-1 rounded-full text-white">Essencial</span>
                        <div className="text-4xl font-black text-white mt-4 mb-2">R$ 29,90<span className="text-sm text-slate-400 font-normal">/mês</span></div>
                        <ul className="space-y-4 my-8 flex-grow">
                            {['Pessoas Físicas', '1 produto e 1 comunidade', 'Checkout PIX/cartão', 'Editor de páginas'].map((f, i) => (
                                <li key={i} className="flex gap-3 text-slate-300 items-center">
                                    <Check size={18} className="text-amber-400" /> {f}
                                </li>
                            ))}
                        </ul>
                        <a href="https://wa.me/message/SNZYA6TP2P5EO1" className="w-full py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-colors text-center">Começar</a>
                    </div>

                    {/* Plan 2 */}
                    <div className="bg-white/5 border border-amber-400/50 shadow-[0_10px_40px_rgba(214,143,74,0.15)] rounded-3xl p-8 relative flex flex-col transform md:-translate-y-4">
                        <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-terra-500 text-xs font-bold px-3 py-1 rounded-full text-white shadow-lg">Recomendado</span>
                        <div className="text-4xl font-black text-white mt-4 mb-2">R$ 99,90<span className="text-sm text-slate-400 font-normal">/mês</span></div>
                        <ul className="space-y-4 my-8 flex-grow">
                            {['Produtos ilimitados', 'Upsell 1-clique', 'Player seguro + trilhas', 'Automação e webhooks'].map((f, i) => (
                                <li key={i} className="flex gap-3 text-slate-300 items-center">
                                    <Check size={18} className="text-amber-400" /> {f}
                                </li>
                            ))}
                        </ul>
                        <a href="https://wa.me/message/SNZYA6TP2P5EO1" className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-terra-500 text-white hover:scale-105 transition-transform text-center shadow-xl">Assinar agora</a>
                    </div>

                    {/* Plan 3 */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative flex flex-col">
                        <span className="absolute top-4 right-4 bg-gradient-to-r from-wine-900 to-plum-600 text-xs font-bold px-3 py-1 rounded-full text-white">Pro</span>
                        <div className="text-4xl font-black text-white mt-4 mb-2">R$ 149,90<span className="text-sm text-slate-400 font-normal">/mês</span></div>
                        <ul className="space-y-4 my-8 flex-grow">
                            {['Treinar equipes', 'SLA prioritário', 'Múltiplas áreas de membros', 'SSO e API avançada'].map((f, i) => (
                                <li key={i} className="flex gap-3 text-slate-300 items-center">
                                    <Check size={18} className="text-amber-400" /> {f}
                                </li>
                            ))}
                        </ul>
                        <a href="https://wa.me/message/SNZYA6TP2P5EO1" className="w-full py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-colors text-center">Falar com vendas</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
