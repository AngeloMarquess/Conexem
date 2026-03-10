export function LandingHeader() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/45 border-b border-white/5 h-[70px]">
            <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
                <div className="flex items-center gap-3 font-extrabold cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wine-900 via-plum-600 to-amber-400 grid place-items-center shadow-lg">
                        <span className="font-serif text-xl tracking-wide text-white">Cx</span>
                    </div>
                    <strong className="text-lg tracking-wide text-white">Conexem</strong>
                </div>

                <nav className="hidden lg:block">
                    <ul className="flex gap-5 m-0 p-0 list-none text-slate-200">
                        <li><a href="#home" className="opacity-90 hover:opacity-100 transition-opacity">Home</a></li>
                        <li><a href="#sobre" className="opacity-90 hover:opacity-100 transition-opacity">Sobre</a></li>
                        <li><a href="#solucoes" className="opacity-90 hover:opacity-100 transition-opacity">Soluções</a></li>
                        <li><a href="#depoimentos" className="opacity-90 hover:opacity-100 transition-opacity">Depoimentos</a></li>
                        <li><a href="#planos" className="opacity-90 hover:opacity-100 transition-opacity">Planos</a></li>
                    </ul>
                </nav>

                <a
                    href="https://conexem.com.br/cadastro-de-alunos/"
                    className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white bg-gradient-to-br from-wine-900 via-plum-600 to-amber-400 shadow-[0_8px_24px_rgba(142,62,103,0.35)] border border-white/5 hover:scale-105 transition-transform"
                >
                    Criar conta
                </a>

                {/* Mobile menu toggle button placeholder */}
                <div className="lg:hidden text-white cursor-pointer">
                    ☰
                </div>
            </div>
        </header>
    );
}
