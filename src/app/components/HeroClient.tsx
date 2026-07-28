"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Clock, CheckCircle2, Phone, Mail, Calendar, User, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import PhoneModal from "./PhoneModal";

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
    const [status, setStatus] = useState<"OPEN" | "CLOSING_SOON" | "AFTER_HOURS" | "CLOSED">("CLOSED");
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

    // Left bottom card auto-rotator between Dovolené (0) and Zástup (1)
    const [leftSlideIndex, setLeftSlideIndex] = useState(0);
    const [leftProgress, setLeftProgress] = useState(0);

    // 8-second rotator for left bottom card
    useEffect(() => {
        setLeftProgress(0);
        const startTime = Date.now();
        const DURATION = 8000; // 8 seconds

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const p = Math.min(100, (elapsed / DURATION) * 100);
            setLeftProgress(p);

            if (elapsed >= DURATION) {
                clearInterval(interval);
                setLeftSlideIndex((prev) => (prev === 0 ? 1 : 0));
            }
        }, 30);

        return () => clearInterval(interval);
    }, [leftSlideIndex]);

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
            } else if (currentTime >= closeTime) {
                setStatus("AFTER_HOURS");
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
                {/* items-stretch forces left and right columns to have equal container height */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                    {/* Left Column: Text, CTA & Tall Rotating Vacation/Substitute Card */}
                    <div className="lg:col-span-6 text-center lg:text-left flex flex-col justify-between space-y-6">
                        <div className="space-y-6">
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
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const contactEl = document.getElementById("contact");
                                        if (contactEl) {
                                            contactEl.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 cursor-pointer"
                                >
                                    Objednat se
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </a>
                                <a
                                    href="#services"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const servicesEl = document.getElementById("services");
                                        if (servicesEl) {
                                            servicesEl.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 cursor-pointer"
                                >
                                    <PlayCircle className="w-5 h-5 ml-2 mr-2" />
                                    Naše služby
                                </a>
                            </div>

                            {/* Trust Indicators */}
                            <div className="pt-4 border-t border-slate-200/60 flex flex-wrap gap-6 justify-center lg:justify-start text-slate-500">
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

                        {/* Left Bottom Auto-Rotating Card (Tall & Large Readable Fonts) */}
                        <div className="relative p-5 sm:p-6 rounded-2xl bg-orange-50/90 border border-orange-200/90 text-left space-y-4 shadow-sm overflow-hidden animate-in fade-in duration-300 flex flex-col justify-between">
                            {/* Card Header with Tab Indicators */}
                            <div className="flex items-center justify-between border-b border-orange-200/80 pb-3">
                                <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-orange-950">
                                    {leftSlideIndex === 0 ? (
                                        <>
                                            <Calendar size={18} className="text-orange-600 shrink-0" />
                                            <span>Plánované termíny dovolených 2026</span>
                                        </>
                                    ) : (
                                        <>
                                            <User size={18} className="text-orange-600 shrink-0" />
                                            <span>Zástup v době dovolené</span>
                                        </>
                                    )}
                                </div>

                                {/* Indicator Dots */}
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => setLeftSlideIndex(0)}
                                        className={cn(
                                            "h-2.5 rounded-full transition-all duration-300",
                                            leftSlideIndex === 0 ? "bg-orange-600 w-6" : "bg-orange-300 hover:bg-orange-400 w-2.5"
                                        )}
                                        aria-label="Zobrazit termíny dovolené"
                                    />
                                    <button
                                        onClick={() => setLeftSlideIndex(1)}
                                        className={cn(
                                            "h-2.5 rounded-full transition-all duration-300",
                                            leftSlideIndex === 1 ? "bg-orange-600 w-6" : "bg-orange-300 hover:bg-orange-400 w-2.5"
                                        )}
                                        aria-label="Zobrazit zástup"
                                    />
                                </div>
                            </div>

                            {/* SLIDE CONTENT - TALL & LARGE FONTS */}
                            {leftSlideIndex === 0 ? (
                                <div className="space-y-2 animate-in fade-in duration-300">
                                    {vacations.map((vac: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-3 rounded-xl bg-white border border-orange-200/80 text-orange-950 text-sm sm:text-base font-bold shadow-2xs"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <ShieldAlert size={18} className="text-orange-600 shrink-0" />
                                                <span>{vac.title}</span>
                                            </div>
                                            <span className="font-mono font-bold bg-orange-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm shrink-0 shadow-2xs">
                                                {formatDateRange(vac)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                substituteText && (
                                    <div className="text-sm sm:text-base font-bold text-orange-950 leading-relaxed border-l-4 border-orange-500 pl-4 py-1 space-y-3 animate-in fade-in duration-300">
                                        <div className="space-y-1">
                                            <p className="text-xl sm:text-2xl font-black text-orange-950">MUDr. Eva Klusáčková</p>
                                            <p className="text-sm sm:text-base font-semibold text-orange-900">
                                                Institut komplexní péče, spol. s r.o. • Franzova 43, 614 00 Brno - Maloměřice
                                            </p>
                                        </div>
                                        <div>
                                            <a
                                                href="tel:+420732892607"
                                                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm sm:text-base shadow-md shadow-orange-600/30 transition-all hover:scale-105"
                                            >
                                                <Phone size={16} /> Firemní telefon: +420 732 892 607
                                            </a>
                                        </div>
                                    </div>
                                )
                            )}

                            {/* Animated 8s Progress Line */}
                            <div
                                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 transition-all duration-75 ease-linear pointer-events-none"
                                style={{ width: `${leftProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Dedicated Exclusively to Ordinační hodiny */}
                    <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-slate-800 space-y-5 relative overflow-hidden flex flex-col justify-between">
                        
                        {/* Header of Right Dark Container */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/30">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white leading-none">Ordinační hodiny</h3>
                                    <p className="text-xs text-slate-400 mt-1">Špitálka 253/6, Brno-Zábrdovice</p>
                                </div>
                            </div>

                            <span className={cn(
                                "px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shrink-0 border",
                                status === "OPEN" && "bg-green-500/20 text-green-300 border-green-500/30",
                                status === "CLOSING_SOON" && "bg-orange-500/20 text-orange-300 border-orange-500/30",
                                (status === "AFTER_HOURS" || status === "CLOSED") && "bg-slate-800 text-slate-400 border-slate-700"
                            )}>
                                {status === "OPEN" && "• Dnes Otevřeno"}
                                {status === "CLOSING_SOON" && "• Za chvíli zavíráme"}
                                {status === "AFTER_HOURS" && "• Dnes již zavřeno"}
                                {status === "CLOSED" && "• Dnes zavřeno"}
                            </span>
                        </div>

                        {/* Hours Table */}
                        <div className="space-y-2.5">
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
                                            {item.info && (
                                                <span className={cn(
                                                    "text-xs font-medium hidden sm:inline ml-1",
                                                    isToday ? "text-blue-100" : "text-slate-400"
                                                )}>
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
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                            <button
                                onClick={() => setIsPhoneModalOpen(true)}
                                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors text-sm shadow-md shadow-blue-600/30"
                            >
                                <Phone size={16} /> Zavolat
                            </button>
                            <a href="mailto:ordinace@finemedica.cz" className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition-colors text-sm border border-slate-700">
                                <Mail size={16} /> Napsat
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* Senior-Friendly Phone Modal */}
            <PhoneModal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} />
        </section>
    );
}
