"use client";

import { Clock, Phone, AlertCircle, User, Calendar, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HoursProps {
    notice?: any;
}

export default function Hours({ notice }: HoursProps) {
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);

    useEffect(() => {
        const now = new Date();
        setCurrentDayIndex(now.getDay()); // 0 = Sun, 1 = Mon, 2 = Tue ...
    }, []);

    const hours = [
        { dayIndex: 1, day: "Pondělí", time: "7:00 – 13:00", info: "Odběry do 9:00" },
        { dayIndex: 2, day: "Úterý", time: "11:00 – 18:00", info: "Odpolední ordinace" },
        { dayIndex: 3, day: "Středa", time: "7:00 – 13:00", info: "Odběry do 9:00" },
        { dayIndex: 4, day: "Čtvrtek", time: "7:00 – 13:00", info: "Odběry do 9:00" },
        { dayIndex: 5, day: "Pátek", time: "7:00 – 12:00", info: "Pouze akutní" },
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

                        {/* Hours Table with Today Highlighted */}
                        <div className="space-y-3 bg-white/5 p-6 rounded-3xl border border-white/10">
                            {hours.map((item) => {
                                const isToday = currentDayIndex === item.dayIndex;
                                return (
                                    <div
                                        key={item.day}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl transition-all",
                                            isToday
                                                ? "bg-blue-600 text-white font-bold shadow-lg border-l-4 border-l-blue-300"
                                                : "bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-xl text-white w-28">{item.day}</span>
                                            {isToday && (
                                                <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded bg-white text-blue-800 shadow-xs">
                                                    Dnes
                                                </span>
                                            )}
                                            {!isToday && item.info && (
                                                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/20 text-blue-200 hidden sm:inline">
                                                    {item.info}
                                                </span>
                                            )}
                                        </div>
                                        <span className={cn(
                                            "font-mono text-xl font-bold tracking-wide",
                                            isToday ? "text-white" : "text-blue-300"
                                        )}>
                                            {item.time}
                                        </span>
                                    </div>
                                );
                            })}

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

                {/* 2. Statické oddělené bloky: DOVOLENÁ 2026 a ZÁSTUP (Rovnoměrně vysoké karty - items-stretch) */}
                <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                    {/* BLOK DOVOLENÁ 2026 */}
                    <div className="bg-orange-50/60 rounded-[2rem] p-8 border border-orange-200/80 shadow-md flex flex-col justify-between space-y-6 h-full">
                        <div>
                            <div className="flex items-center gap-3 border-b border-orange-200 pb-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md shadow-orange-600/30">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-orange-950">DOVOLENÁ 2026</h3>
                                    <p className="text-xs text-orange-800 font-medium">Plánované termíny dovolených a úpravy provozu</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {vacations.map((vac: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl bg-white border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ShieldAlert size={18} className="text-orange-600 shrink-0" />
                                            <span className="font-bold text-slate-900 text-base">{vac.title}</span>
                                        </div>
                                        <span className="font-bold text-sm bg-orange-600 text-white px-3 py-1 rounded-lg text-right shadow-xs">
                                            {formatDateRange(vac)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-orange-200/60 text-xs text-orange-900 font-medium">
                            * V době dovolených je ordinace zavřená, akustická péče je zajištěna zastupujícím lékařem.
                        </div>
                    </div>

                    {/* BLOK ZÁSTUP V DOBĚ DOVOLENÉ */}
                    <div className="bg-orange-50/60 rounded-[2rem] p-8 border border-orange-200/80 shadow-md flex flex-col justify-between space-y-6 h-full">
                        <div>
                            <div className="flex items-center gap-3 border-b border-orange-200 pb-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md shadow-orange-600/30">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-orange-950">Zástup v době dovolené</h3>
                                    <p className="text-xs text-orange-800 font-medium">V případě naší nepřítomnosti zastupuje:</p>
                                </div>
                            </div>

                            {substituteText && (
                                <div className="p-6 rounded-2xl bg-white border border-orange-200/80 text-slate-900 space-y-3 shadow-xs h-full flex flex-col justify-center">
                                    <div className="text-lg font-bold text-orange-950 whitespace-pre-line leading-relaxed border-l-4 border-orange-500 pl-4 py-1">
                                        {substituteText}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-orange-200/60 text-xs text-orange-900 font-medium">
                            * Před návštěvou zastupující ordinace prosím nejprve zavolejte na uvedené telefonní číslo.
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
