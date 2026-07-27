"use client";

import { Clock, Phone, AlertCircle } from "lucide-react";

export default function Hours() {
    const hours = [
        { day: "Pondělí", time: "7:00 - 13:00", info: "Odběry do 9:00" },
        { day: "Úterý", time: "11:00 - 18:00", info: "Odpolední ordinace" },
        { day: "Středa", time: "7:00 - 13:00", info: "Odběry do 9:00" },
        { day: "Čtvrtek", time: "7:00 - 13:00", info: "Odběry do 9:00" },
        { day: "Pátek", time: "7:00 - 12:00", info: "Pouze akutní" },
    ];

    return (
        <section id="hours" className="py-24 bg-white">
            <div className="container">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-white shadow-2xl">
                    {/* Decorative gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-medium text-blue-200 mb-6">
                                    <Clock size={14} />
                                    Kdy nás zastihnete
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Ordinační hodiny</h2>
                                <p className="text-slate-400 text-lg">
                                    Pro zajištění plynulého chodu ordinace a minimálního čekání ošetřujeme pacienty <span className="text-white font-semibold">výhradně na objednání</span>.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Objednejte se telefonicky</h4>
                                        <p className="text-slate-400 text-sm mb-4">Volejte prosím v ordinačních hodinách.</p>
                                        <a href="tel:+420545162070" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
                                            +420 545 162 070
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {hours.map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-default"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                        <span className="font-semibold text-lg w-24">{item.day}</span>
                                        {item.info && (
                                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/10 text-slate-300 group-hover:bg-blue-500/20 group-hover:text-blue-200 transition-colors">
                                                {item.info}
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-mono text-lg text-blue-300 font-medium tracking-wide">{item.time}</span>
                                </div>
                            ))}

                            <div className="mt-8 pt-8 border-t border-white/10 flex items-start gap-3 text-sm text-slate-400">
                                <AlertCircle size={16} className="mt-0.5 text-orange-400" />
                                <p>
                                    Poslední pacient je ošetřen 30 minut před koncem pracovní doby.
                                    V případě akutních potíží nás prosím kontaktujte telefonicky hned ráno.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
