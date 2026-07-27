export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <span className="text-3xl font-bold tracking-tighter text-white block">
                            Fine<span className="text-blue-500">Medica</span>
                        </span>
                        <p className="max-w-sm text-lg leading-relaxed text-slate-400">
                            Moderní ordinace praktického lékaře pro dospělé.
                            Spojujeme odbornost s moderními technologiemi pro vaše zdraví.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">Navigace</h4>
                        <ul className="space-y-4">
                            <li><a href="#services" className="hover:text-blue-400 transition-colors">Služby ordinace</a></li>
                            <li><a href="#hours" className="hover:text-blue-400 transition-colors">Ordinační doba</a></li>
                            <li><a href="#contact" className="hover:text-blue-400 transition-colors">Kontaktujte nás</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">Informace</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Ceník výkonů</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">GDPR a Soukromí</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Pro nové pacienty</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <p>© {currentYear} FineMedica s.r.o.</p>
                    <div className="flex items-center gap-8 opacity-60">
                        <span>IČO: 21510512</span>
                        <span>IČZ: 72996235</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
