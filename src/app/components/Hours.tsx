"use client";

import { Clock, Phone, AlertCircle, User, Calendar, ShieldAlert } from "lucide-react";

interface HoursProps {
    notice?: any;
}

export default function Hours({ notice }: HoursProps) {
    const hours = [
        { day: "Pondělí", time: "7:00 – 13:00", info: "Odběry do 9:00" },
        { day: "Úterý", time: "11:00 – 18:00", info: "Odpolední ordinace" },
        { day: "Středa", time: "7:00 – 13:00", info: "Odběry do 9:00" },
        { day: "Čtvrtek", time: "7:00 – 13:00", info: "Odběry do 9:00" },
        { day: "Pátek", time: "7:00 – 12:00", info: "Pouze akutní" },
    ];

    const vacations = notice?.vacations || [];
    const substituteText = notice?.substituteText;

    const formatDateRange = (vac: any) => {
        if (vac.note) return vac.note;
        if (!vac.startDate) return "";
        const formatDate = (dStr: string) => {
            const parts = dStr.split("-");
            if (parts.length === 3) {
                return `${parseInt(parts[2], 10)}. ${parseInt(parts[1], 10)}. ${parts[0]}`;
            }
            return dStr;
        };
        if (!vac.endDate || vac.startDate === vac.endDate) return formatDate(vac.startDate);
        return `${formatDate(vac.startDate)} – ${formatDate(vac.endDate)}`;
    };

    return (
        <section id="hours" className="py-24 bg-slate-50">
            <div className="container space-y-12">
                {/* 1. Hlavní Ordinační Hodiny Card */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-white shadow-2xl">
                    {/* Decorative gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-medium text-blue-200 mb-6">
                                    <Clock size={14} />
                                    Kdy nás zastihnete
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Ordinační hodiny</h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Pro zajištění plynulého chodu ordinace a minimálního čekání ošetřujeme pacienty <span className="text-white font-bold underline decoration-blue-400">výhradně na objednání</span>.
                                </p>
                            </div>

                            <div className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1 text-white">Objednejte se telefonicky</h4>
                                        <p className="text-slate-300 text-sm mb-3">Volejte prosím v ordinačních hodinách.</p>
                                        <a href="tel:+420545162070" className="text-2xl md:text-3xl font-bold text-blue-300 hover:text-white transition-colors tracking-wide">
                                            +420 545 162 070
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hours Table */}
                        <div className="space-y-4 bg-white/5 p-6 rounded-3xl border border-white/10">
                            {hours.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                        <span className="font-bold text-xl text-white w-28">{item.day}</span>
                                        {item.info && (
                                            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/20 text-blue-200">
                                                {item.info}
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-mono text-xl text-blue-300 font-bold tracking-wide">{item.time}</span>
                                </div>
                            ))}

                            <div className="mt-6 pt-6 border-t border-white/10 flex items-start gap-3 text-sm text-slate-300">
                                <AlertCircle size={18} className="mt-0.5 text-blue-400 shrink-0" />
                                <p className="leading-relaxed">
                                    Poslední pacient je ošetřen 30 minut před koncem pracovní doby.
                                    V případě akutních potíží nás kontaktujte telefonicky ráno.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Statické oddělené bloky: DOVOLENÁ 2026 a ZÁSTUP (Sleek Clean Blue Design) */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">

                    {/* BLOK DOVOLENÁ 2026 */}
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-md space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-bold shrink-0">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">DOVOLENÁ 2026</h3>
                                <p className="text-xs text-slate-500 font-medium">Plánované termíny dovolených a úpravy provozu</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {vacations.map((vac: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <ShieldAlert size={18} className="text-blue-600 shrink-0" />
                                        <span className="font-bold text-slate-900 text-base">{vac.title}</span>
                                    </div>
                                    <span className="font-bold text-sm bg-blue-100/80 text-blue-900 px-3 py-1 rounded-lg border border-blue-200 text-right shadow-xs">
                                        {formatDateRange(vac)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BLOK ZÁSTUP V DOBĚ DOVOLENÉ */}
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-md space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-bold shrink-0">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Zástup v době dovolené</h3>
                                <p className="text-xs text-slate-500 font-medium">V případě naší nepřítomnosti zastupuje:</p>
                            </div>
                        </div>

                        {substituteText && (
                            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 text-slate-900 space-y-2">
                                <div className="text-lg font-bold text-blue-950 whitespace-pre-line leading-relaxed border-l-4 border-blue-600 pl-4 py-1">
                                    {substituteText}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
