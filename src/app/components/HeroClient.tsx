"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Clock, CheckCircle2, Phone, Mail, Calendar, User, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
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
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Embla carousel for 2 slides
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

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

                    {/* Right Column: Interactive 2-Slide Hero Container (Page 1: Hours 1:1, Page 2: Vacations & Substitute) */}
                    <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-slate-800 space-y-5 relative overflow-hidden">
                        
                        {/* Header with 2-Page Tabs & Controls */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
                            <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
                                <button
                                    onClick={() => emblaApi && emblaApi.scrollTo(0)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
                                        selectedIndex === 0
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-slate-400 hover:text-white"
                                    )}
                                >
                                    <Clock size={16} />
                                    Ordinační hodiny
                                </button>
                                <button
                                    onClick={() => emblaApi && emblaApi.scrollTo(1)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
                                        selectedIndex === 1
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-slate-400 hover:text-white"
                                    )}
                                >
                                    <Calendar size={16} />
                                    Dovolená & Zástup
                                </button>
                            </div>

                            {/* Arrow Controls */}
                            <div className="flex gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                                <button
                                    onClick={scrollPrev}
                                    className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition-colors"
                                    aria-label="Předchozí"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={scrollNext}
                                    className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition-colors"
                                    aria-label="Následující"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Carousel Viewport */}
                        <div className="overflow-hidden relative z-10" ref={emblaRef}>
                            <div className="flex touch-pan-y">

                                {/* SLIDE 1: ORDINAČNÍ HODINY (1:1 styling like Hours.tsx) */}
                                <div className="flex-[0_0_100%] min-w-0 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-slate-400">Špitálka 253/6, Brno-Zábrdovice</p>
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

                                    {/* Hours Table 1:1 */}
                                    <div className="space-y-2">
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
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <a href="tel:+420545162070" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors text-sm shadow-md shadow-blue-600/30">
                                            <Phone size={16} /> Zavolat
                                        </a>
                                        <a href="mailto:ordinace@finemedica.cz" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition-colors text-sm border border-slate-700">
                                            <Mail size={16} /> Napsat
                                        </a>
                                    </div>
                                </div>

                                {/* SLIDE 2: DOVOLENÁ 2026 & ZÁSTUP */}
                                <div className="flex-[0_0_100%] min-w-0 space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                        <h4 className="font-bold text-base text-white flex items-center gap-2">
                                            <ShieldAlert size={18} className="text-blue-400" />
                                            DOVOLENÁ 2026
                                        </h4>
                                        <span className="text-xs text-slate-400">Plánované termíny</span>
                                    </div>

                                    {/* Vacations List */}
                                    <div className="space-y-2">
                                        {vacations.map((vac: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2"
                                            >
                                                <span className="font-bold text-slate-100 text-xs sm:text-sm">{vac.title}</span>
                                                <span className="font-bold text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-md shrink-0 border border-blue-500/30">
                                                    {formatDateRange(vac)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Substitute Info */}
                                    {substituteText && (
                                        <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-800/60 space-y-1.5">
                                            <div className="font-bold text-xs uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                                                <User size={15} className="text-blue-400" /> V případě dovolené zastupuje:
                                            </div>
                                            <div className="text-xs text-slate-100 font-bold whitespace-pre-line leading-relaxed pl-3 border-l-4 border-blue-500">
                                                {substituteText}
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
