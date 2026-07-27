"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Clock, CheckCircle2, Phone, Mail, Calendar, User, ShieldAlert, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeroClientProps {
    notice: any;
}

const hoursList = [
    { dayIndex: 1, dayName: "Pondělí", time: "7:00 – 13:00", info: "Odběry do 9:00" },
    { dayIndex: 2, dayName: "Úterý", time: "11:00 – 18:00", info: "Odpolední ordinace" },
    { dayIndex: 3, dayName: "Středa", time: "7:00 – 13:00", info: "Odběry do 9:00" },
    { dayIndex: 4, dayName: "Čtvrtek", time: "7:00 – 13:00", info: "Odběry do 9:00" },
    { dayIndex: 5, dayName: "Pátek", time: "7:00 – 12:00", info: "Pouze akutní" },
];

const hoursData: Record<number, { open: string; close: string }> = {
    1: { open: "7:00", close: "13:00" },
    2: { open: "11:00", close: "18:00" },
    3: { open: "7:00", close: "13:00" },
    4: { open: "7:00", close: "13:00" },
    5: { open: "7:00", close: "12:00" },
};

export default function HeroClient({ notice }: HeroClientProps) {
    const [status, setStatus] = useState<"OPEN" | "CLOSING_SOON" | "CLOSED">("CLOSED");
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);

    // Calculate current operating status & today's index
    useEffect(() => {
        const now = new Date();
        const day = now.getDay(); // 0 = Sun, 1 = Mon ...
        setCurrentDayIndex(day);

        const schedule = hoursData[day];

        if (schedule) {
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const currentTime = hours * 60 + minutes;

            const [openHour, openMinute] = schedule.open.split(":").map(Number);
            const [closeHour, closeMinute] = schedule.close.split(":").map(Number);
            const openTime = openHour * 60 + openMinute;
            const closeTime = closeHour * 60 + closeMinute;

            if (currentTime >= openTime && currentTime < closeTime - 30) {
                setStatus("OPEN");
            } else if (currentTime >= closeTime - 30 && currentTime < closeTime) {
                setStatus("CLOSING_SOON");
            } else {
                setStatus("CLOSED");
            }
        } else {
            setStatus("CLOSED");
        }
    }, []);

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
        <section id="home" className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-slate-50/50">
            {/* Extended Background with subtle texture */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 to-white/95 z-10" />
                <img src="/images/waiting_room.png" alt="Background Texture" className="w-full h-full object-cover opacity-10" />
            </div>

            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/50 blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
                <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-100/50 blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left Column: Text & CTA */}
                    <div className="lg:col-span-6 text-center lg:text-left space-y-6">
                        {/* Optional Badge if accepting patients */}
                        {notice?.acceptingNewPatients && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm animate-fade-in-up">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Přijímáme nové pacienty
                            </div>
                        )}

                        {/* Main Heading */}
                        <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                            Vaše zdraví, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                naše priorita
                            </span>
                        </h1>

                        <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Moderní ordinace praktického lékaře v Brně.
                            Spojujeme odbornost s lidským přístupem pro celou rodinu.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                            <Link
                                href="/#contact"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            >
                                Objednat se
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="/#services"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
                            >
                                <PlayCircle className="w-5 h-5 ml-2 mr-2" />
                                Naše služby
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="pt-6 border-t border-slate-200/60 flex gap-6 justify-center lg:justify-start text-slate-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-blue-500" />
                                <span className="font-medium text-sm">Smlouvy se všemi pojišťovnami</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-blue-500" />
                                <span className="font-medium text-sm">Online objednání</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Section Cards (1. Ordinační hodiny 1:1, 2. Dovolená & Zástup bez žluté) */}
                    <div className="lg:col-span-6 space-y-6">

                        {/* KARTA 1: ORDINAČNÍ HODINY (Stejný styl 1:1 jako v sekci Ordinační hodiny) */}
                        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-slate-800 space-y-5 relative overflow-hidden">
                            {/* Glow accent */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex items-center justify-between border-b border-slate-800 pb-3 relative z-10">
                                <div>
                                    <h3 className="font-bold text-xl text-white flex items-center gap-2">
                                        <Clock size={22} className="text-blue-400" />
                                        Ordinační hodiny
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-0.5">Špitálka 253/6, Brno-Zábrdovice</p>
                                </div>
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0",
                                    status === "OPEN" && "bg-green-500/20 text-green-300 border border-green-500/30",
                                    status === "CLOSING_SOON" && "bg-orange-500/20 text-orange-300 border border-orange-500/30",
                                    status === "CLOSED" && "bg-slate-800 text-slate-400 border border-slate-700"
                                )}>
                                    {status === "OPEN" && "• Dnes Otevřeno"}
                                    {status === "CLOSING_SOON" && "• Za chvíli zavíráme"}
                                    {status === "CLOSED" && "• Dnes Zavřeno"}
                                </span>
                            </div>

                            {/* Hours Table 1:1 matching Hours.tsx */}
                            <div className="space-y-2 relative z-10">
                                {hoursList.map((item) => {
                                    const isToday = currentDayIndex === item.dayIndex;
                                    return (
                                        <div
                                            key={item.dayName}
                                            className={cn(
                                                "flex items-center justify-between p-3.5 rounded-xl transition-all",
                                                isToday
                                                    ? "bg-blue-600 text-white font-bold shadow-lg border-l-4 border-l-blue-300"
                                                    : "bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="w-20 font-bold text-base">{item.dayName}</span>
                                                {isToday && (
                                                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-white text-blue-800 shadow-xs">
                                                        Dnes
                                                    </span>
                                                )}
                                                {!isToday && item.info && (
                                                    <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                                                        {item.info}
                                                    </span>
                                                )}
                                            </div>
                                            <span className={cn(
                                                "font-mono font-bold tracking-wide text-base",
                                                isToday ? "text-white" : "text-blue-300"
                                            )}>
                                                {item.time}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Quick Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 pt-2 relative z-10">
                                <a href="tel:+420545162070" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors text-sm shadow-md shadow-blue-600/30">
                                    <Phone size={16} /> Zavolat
                                </a>
                                <a href="mailto:ordinace@finemedica.cz" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition-colors text-sm border border-slate-700">
                                    <Mail size={16} /> Napsat
                                </a>
                            </div>
                        </div>

                        {/* KARTA 2: DOVOLENÁ 2026 & ZÁSTUP (Sleek Slate/Blue Style - Bez ošklivé žluté!) */}
                        <div className="bg-white rounded-3xl p-6 md:p-7 shadow-xl border border-slate-200 space-y-4">
                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <Calendar size={20} className="text-blue-600 shrink-0" />
                                    DOVOLENÁ 2026 & ZÁSTUP
                                </h3>
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                    Informace k provozu
                                </span>
                            </div>

                            {/* Vacations List */}
                            <div className="space-y-2">
                                {vacations.map((vac: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ShieldAlert size={16} className="text-blue-600 shrink-0" />
                                            <span className="font-bold text-slate-900 text-xs sm:text-sm">{vac.title}</span>
                                        </div>
                                        <span className="font-bold text-xs bg-blue-100/70 text-blue-900 px-2.5 py-1 rounded-md shrink-0 border border-blue-200/50">
                                            {formatDateRange(vac)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Substitute Info (Clean Slate/Blue style) */}
                            {substituteText && (
                                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                                    <div className="font-bold text-xs uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                                        <User size={15} className="text-blue-600" /> V případě dovolené zastupuje:
                                    </div>
                                    <div className="text-xs text-slate-800 font-bold whitespace-pre-line leading-relaxed pl-3 border-l-4 border-blue-600">
                                        {substituteText}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
