import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingFeatures } from '../components/landing/LandingFeatures';
import { LandingTestimonials } from '../components/landing/LandingTestimonials';
import { LandingPricing } from '../components/landing/LandingPricing';

export function Landing() {
    return (
        <div className="min-h-screen bg-wine-950 font-sans selection:bg-amber-400 selection:text-wine-950">
            <LandingHeader />

            <main>
                <LandingHero />
                <LandingFeatures />
                <LandingTestimonials />
                <LandingPricing />
            </main>

            <footer className="border-t border-white/10 py-10 mt-20">
                <div className="max-w-7xl mx-auto px-5 text-center text-slate-500">
                    <p>© 2026 Conexem. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
