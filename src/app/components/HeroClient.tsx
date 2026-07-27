"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Clock, CheckCircle2, Phone, Mail, AlertTriangle } from "lucide-react";
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

    const hasVacations = notice?.vacations && notice.vacations.length > 0;

    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50/50">
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
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Text & CTA */}
                    <div className="text-center lg:text-left space-y-8">
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
                        <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                            Vaše zdraví, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                naše priorita
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Moderní ordinace praktického lékaře v Brně.
                            Spojujeme odbornost s lidským přístupem pro celou rodinu.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            >
                                Objednat se
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="#services"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
                            >
                                <PlayCircle className="w-5 h-5 ml-2 mr-2" />
                                Naše služby
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="pt-8 border-t border-slate-200/60 flex gap-8 justify-center lg:justify-start text-slate-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-blue-500" />
                                <span className="font-medium text-sm">Smlouvy se všemi pojišťovnami</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-blue-500" />
                                <span className="font-medium text-sm">Online objednání</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Static, Readable Opening Hours Card (No rotating carousel) */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 animate-fade-in-up p-6 md:p-8 flex flex-col space-y-6">

                            {/* Floating Clock Icon */}
                            <div className="absolute -top-5 -right-5 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 hidden md:block z-30">
                                <Clock className="w-7 h-7 text-blue-600" />
                            </div>

                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h3 className="font-bold text-2xl text-slate-900 flex items-center gap-2">
                                        <Clock size={24} className="text-blue-600" />
                                        Ordinační hodiny
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">Špitálka 253/6, Brno-Zábrdovice</p>
                                </div>
                                <span className={cn(
                                    "px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0",
                                    status === "OPEN" && "bg-green-100 text-green-700 border border-green-200",
                                    status === "CLOSING_SOON" && "bg-orange-100 text-orange-700 border border-orange-200",
                                    status === "CLOSED" && "bg-slate-100 text-slate-600 border border-slate-200"
                                )}>
                                    {status === "OPEN" && "• Dnes Otevřeno"}
                                    {status === "CLOSING_SOON" && "• Za chvíli zavíráme"}
                                    {status === "CLOSED" && "• Dnes Zavřeno"}
                                </span>
                            </div>

                            {/* Alert Banner if Vacation or Alert text exists */}
                            {(notice?.alertText || hasVacations) && (
                                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm space-y-1 animate-in fade-in">
                                    <div className="font-bold text-amber-800 flex items-center gap-2 text-sm">
                                        <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                                        <span>{notice?.alertTitle || "Upozornění k provozu"}</span>
                                    </div>
                                    <p className="text-xs text-amber-900 font-medium leading-relaxed">
                                        {notice?.alertText || "Pozor na změnu ordinační doby z důvodu dovolené."}
                                    </p>
                                    <a href="#hours" className="inline-block text-xs font-bold text-amber-800 underline mt-1 hover:text-amber-950">
                                        Detail dovolené a zástup níže ↓
                                    </a>
                                </div>
                            )}

                            {/* Stable, High-contrast Hours Table */}
                            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/70">
                                {hoursList.map((item) => {
                                    const isToday = currentDayIndex === item.dayIndex;
                                    return (
                                        <div
                                            key={item.dayName}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 text-base transition-colors",
                                                isToday ? "bg-blue-600 text-white font-bold" : "text-slate-800 hover:bg-white"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="w-24 font-bold">{item.dayName}</span>
                                                {isToday && (
                                                    <span className="text-[11px] uppercase font-extrabold px-2 py-0.5 rounded bg-white text-blue-700 shadow-xs">
                                                        Dnes
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={cn("text-xs font-medium hidden sm:inline", isToday ? "text-blue-100" : "text-slate-500")}>
                                                    {item.info}
                                                </span>
                                                <span className={cn("font-bold font-mono tracking-tight text-base", isToday ? "text-white" : "text-slate-900")}>
                                                    {item.time}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Direct Quick Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <a href="tel:+420545162070" className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors text-base shadow-md shadow-blue-600/20">
                                    <Phone size={18} /> Zavolat
                                </a>
                                <a href="mailto:ordinace@finemedica.cz" className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-base">
                                    <Mail size={18} /> Napsat
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
