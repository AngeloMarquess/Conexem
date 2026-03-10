import { Play } from 'lucide-react';

const testimonials = [
    {
        name: 'Sheusder',
        text: 'Já aplicava funis, mas foi na Conexem que ganhou clareza para escalar. Hoje sua agência fatura múltiplos milhões ao ano com vendas todos os dias.',
        img: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1400&auto=format&fit=crop',
        alt: false
    },
    {
        name: 'Sâmia Ribeiro',
        text: 'Focando em vendas diretas de produtos low ticket, seu negócio bombou. Isso permitiu que ela se tornasse uma mãe em tempo integral.',
        img: 'https://images.unsplash.com/photo-1520975954732-35dd222996f0?q=80&w=1200&auto=format&fit=crop',
        alt: true
    }
];

export function LandingTestimonials() {
    return (
        <section id="depoimentos" className="py-24 bg-card-bg">
            <div className="max-w-5xl mx-auto px-5">
                <h2 className="text-4xl font-bold text-center text-white mb-12">Veja só algumas histórias de nossos alunos</h2>

                <div className="space-y-10">
                    {testimonials.map((depo, idx) => (
                        <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 ${depo.alt ? 'bg-white/5' : ''}`}>

                            {/* Media Block */}
                            <div className={`relative rounded-2xl overflow-hidden aspect-video border border-white/10 cursor-pointer group ${depo.alt ? 'md:order-last' : ''}`}>
                                <img src={depo.img} alt={depo.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                                <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-plum-600 fill-plum-600 ml-1" />
                                </button>
                            </div>

                            {/* Text Block */}
                            <div>
                                <h4 className="text-xl font-extrabold text-blue-300 mb-3">{depo.name}</h4>
                                <p className="text-slate-300 text-lg leading-relaxed">{depo.text}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
