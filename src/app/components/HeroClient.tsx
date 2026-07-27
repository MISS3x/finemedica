"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Clock, CheckCircle2, Info, Phone, Mail, User, Calendar, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface HeroClientProps {
    notice: any;
}

const hoursList = [
    { dayIndex: 1, dayName: "Pondělí", time: "7:00 – 13:00", info: "Odběry do 9:00" },
    { dayIndex: 2, dayName: "Úterý", time: "11:00 – 18:00", info: "Odpolední" },
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

    // Embla Carousel Setup (2 slides: Hours & Vacations)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 6000, stopOnInteraction: false })
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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

    const formatDateRange = (start?: string, end?: string) => {
        if (!start) return "";
        const formatDate = (dStr: string) => {
            const parts = dStr.split("-");
            if (parts.length === 3) {
                return `${parseInt(parts[2], 10)}.${parseInt(parts[1], 10)}.`;
            }
            return dStr;
        };
        if (!end || start === end) return formatDate(start);
        return `${formatDate(start)} – ${formatDate(end)}`;
    };

    const vacations = notice?.vacations || [];

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
                        {/* Badge */}
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

                    {/* Right Column: Rotating 2-Table Noticeboard */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 animate-fade-in-up flex flex-col overflow-hidden">

                            {/* Floating Decoration */}
                            <div className="absolute -top-5 -right-5 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-bounce-slow z-30">
                                <Clock className="w-7 h-7 text-blue-600" />
                            </div>

                            {/* Noticeboard Header with Slide Selector */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-white/60">
                                <div className="flex items-center gap-2">
                                    <Info className="text-blue-600 shrink-0" size={20} />
                                    <span className="font-bold text-slate-900 text-base">Informační tabule</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Slide Indicators / Tabs */}
                                    <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                                        <button
                                            onClick={() => emblaApi && emblaApi.scrollTo(0)}
                                            className={cn(
                                                "px-3 py-1 rounded-lg transition-all",
                                                selectedIndex === 0 ? "bg-white text-blue-600 shadow-sm" : "hover:text-slate-900"
                                            )}
                                        >
                                            Hodiny
                                        </button>
                                        <button
                                            onClick={() => emblaApi && emblaApi.scrollTo(1)}
                                            className={cn(
                                                "px-3 py-1 rounded-lg transition-all",
                                                selectedIndex === 1 ? "bg-white text-blue-600 shadow-sm" : "hover:text-slate-900"
                                            )}
                                        >
                                            Dovolená
                                        </button>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={scrollPrev} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" aria-label="Previous">
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button onClick={scrollNext} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" aria-label="Next">
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Viewport */}
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex touch-pan-y">

                                    {/* SLIDE 1: ORDINAČNÍ HODINY */}
                                    <div className="flex-[0_0_100%] min-w-0 p-6 md:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                                                    <Clock size={20} className="text-blue-600" />
                                                    Ordinační hodiny
                                                </h3>
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                                    status === "OPEN" && "bg-green-100 text-green-700",
                                                    status === "CLOSING_SOON" && "bg-orange-100 text-orange-700",
                                                    status === "CLOSED" && "bg-slate-100 text-slate-500"
                                                )}>
                                                    {status === "OPEN" && "• Otevřeno"}
                                                    {status === "CLOSING_SOON" && "• Za chvíli zavíráme"}
                                                    {status === "CLOSED" && "• Zavřeno"}
                                                </span>
                                            </div>

                                            {/* Table of Hours */}
                                            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                                                {hoursList.map((item) => {
                                                    const isToday = currentDayIndex === item.dayIndex;
                                                    return (
                                                        <div
                                                            key={item.dayName}
                                                            className={cn(
                                                                "flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                                                                isToday ? "bg-blue-50/90 font-bold text-blue-900 border-l-4 border-l-blue-600" : "text-slate-700 hover:bg-white"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-20 font-semibold">{item.dayName}</span>
                                                                {isToday && (
                                                                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                                                                        Dnes
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <span className="font-medium text-slate-500 text-xs hidden sm:inline">{item.info}</span>
                                                                <span className="font-bold text-slate-900">{item.time}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Quick Actions Footer */}
                                        <div className="grid grid-cols-2 gap-3 pt-6 mt-4">
                                            <a href="tel:+420545162070" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors text-sm shadow-md shadow-blue-500/20">
                                                <Phone size={16} /> Zavolat
                                            </a>
                                            <a href="mailto:ordinace@finemedica.cz" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors text-sm">
                                                <Mail size={16} /> Napsat
                                            </a>
                                        </div>
                                    </div>

                                    {/* SLIDE 2: DOVOLENÁ & ZÁSTUP */}
                                    <div className="flex-[0_0_100%] min-w-0 p-6 md:p-8 flex flex-col justify-between space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                                                    <Calendar size={20} className="text-blue-600" />
                                                    Plánované dovolené
                                                </h3>
                                                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                                                    Provoz & Zástup
                                                </span>
                                            </div>

                                            {/* List of Vacations */}
                                            <div className="space-y-2 mb-4">
                                                {vacations.length > 0 ? (
                                                    vacations.map((vac: any, idx: number) => (
                                                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-amber-900">
                                                            <div className="flex items-center gap-2 font-bold text-sm">
                                                                <ShieldAlert size={16} className="text-amber-600 shrink-0" />
                                                                <span>{vac.title || "Dovolená"}</span>
                                                            </div>
                                                            <span className="font-bold text-xs bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-xs">
                                                                {formatDateRange(vac.startDate, vac.endDate)}
                                                            </span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-medium flex items-center gap-2">
                                                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                                                        <span>V nejbližší době neplánujeme žádnou dovolenou.</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Substitute Information Block */}
                                            {notice?.substituteText && (
                                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-sm space-y-1.5">
                                                    <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-blue-600">
                                                        <User size={14} /> V době nepřítomnosti zastupuje
                                                    </div>
                                                    <div className="text-slate-600 font-medium whitespace-pre-line leading-relaxed text-xs">
                                                        {notice.substituteText}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-2">
                                            <Link href="#contact" className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-md">
                                                Kontaktovat ordinaci
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Bottom Carousel Dots */}
                            <div className="flex justify-center gap-2 pb-4 pt-1">
                                {[0, 1].map((index) => (
                                    <button
                                        key={index}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-300",
                                            index === selectedIndex ? "bg-blue-600 w-6" : "bg-slate-200 hover:bg-slate-300 w-2"
                                        )}
                                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                        aria-label={`Přejít na kartu ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
