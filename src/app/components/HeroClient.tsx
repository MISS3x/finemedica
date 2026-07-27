"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Clock, CheckCircle2, AlertTriangle, Info, MapPin, Phone, Mail, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface HeroClientProps {
    notice: any;
}

const hoursData = [
    null, // Sunday
    { open: "7:00", close: "13:00" }, // Monday
    { open: "11:00", close: "18:00" }, // Tuesday
    { open: "7:00", close: "13:00" }, // Wednesday
    { open: "7:00", close: "13:00" }, // Thursday
    { open: "7:00", close: "12:00" }, // Friday
    null, // Saturday
];

export default function HeroClient({ notice }: HeroClientProps) {
    const [status, setStatus] = useState<"OPEN" | "CLOSING_SOON" | "CLOSED">("CLOSED");
    const [todayHours, setTodayHours] = useState<string | null>(null);

    // Embla Carousel Setup
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 6000, stopOnInteraction: false })
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // Determine Status Logic (unchanged)
    useEffect(() => {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours * 60 + minutes;

        const schedule = hoursData[day];

        if (schedule) {
            setTodayHours(`${schedule.open} – ${schedule.close}`);
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
            setTodayHours("Dnes zavřeno");
            setStatus("CLOSED");
        }
    }, [status]); // Add status to dep array to re-trigger if needed, though empty is fine for on-mount. Logic relies on 'now'.

    // Define Cards Array
    const cards = [
        { type: "STATUS", id: "status-card" },
        ...(notice?.alertText ? [{ type: "ALERT", id: "alert-card" }] : []),
        ...(notice?.customInfoActive ? [{ type: "CUSTOM_INFO", id: "custom-info-card" }] : [])
    ];

    // Helper to get status color
    const getStatusColor = (s: typeof status) => {
        switch (s) {
            case "OPEN": return "text-green-600";
            case "CLOSING_SOON": return "text-orange-500";
            case "CLOSED": return "text-slate-400";
        }
    };

    const getStatusBg = (s: typeof status) => {
        switch (s) {
            case "OPEN": return "bg-green-100 text-green-700";
            case "CLOSING_SOON": return "bg-orange-100 text-orange-700";
            case "CLOSED": return "bg-slate-100 text-slate-500";
        }
    };

    const getStatusText = (s: typeof status) => {
        switch (s) {
            case "OPEN": return "Otevřeno";
            case "CLOSING_SOON": return "Za chvíli zavíráme";
            case "CLOSED": return "Zavřeno";
        }
    };

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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm animate-fade-in-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Přijímáme nové pacienty
                        </div>

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

                    {/* Right Column: Embla Carousel Notice Board */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 animate-fade-in-up animation-delay-500 flex flex-col overflow-hidden">

                            {/* Floating Decoration */}
                            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-bounce-slow z-30">
                                <Clock className="w-8 h-8 text-blue-600" />
                            </div>

                            {/* Header / Controls */}
                            <div className="flex items-center justify-between border-b border-slate-100 p-6 bg-white/50">
                                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                    <Info className="text-blue-500" size={20} />
                                    Informační tabule
                                </h3>
                                <div className="flex gap-2">
                                    <button onClick={scrollPrev} className="p-1 rounded-full hover:bg-slate-100 transition-colors" aria-label="Previous">
                                        <ChevronLeft size={20} className="text-slate-500" />
                                    </button>
                                    <button onClick={scrollNext} className="p-1 rounded-full hover:bg-slate-100 transition-colors" aria-label="Next">
                                        <ChevronRight size={20} className="text-slate-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Carousel Viewport */}
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex touch-pan-y">
                                    {cards.map((card, index) => (
                                        <div className="flex-[0_0_100%] min-w-0 p-8 min-h-[400px] flex flex-col" key={card.id}>

                                            {/* STATUS CARD */}
                                            {card.type === "STATUS" && (
                                                <div className="flex flex-col h-full items-center text-center justify-center space-y-4">
                                                    <div className={cn("text-6xl font-black mb-2 tracking-tight", getStatusColor(status))}>
                                                        {todayHours || "Dnes zavřeno"}
                                                    </div>

                                                    <div className={cn("px-6 py-2 rounded-full text-lg font-bold uppercase tracking-wider inline-block mb-6 shadow-sm",
                                                        getStatusBg(status))}>
                                                        {getStatusText(status)}
                                                    </div>

                                                    {status === "CLOSED" && (
                                                        <div className="text-slate-500 text-base max-w-[280px] space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                            <p className="font-bold text-slate-700">Dnes už je zavřeno</p>
                                                            <p>Zavolejte nám prosím zítra ráno.</p>
                                                        </div>
                                                    )}
                                                    {status === "CLOSING_SOON" && (
                                                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                                            <p className="text-orange-800 text-base font-bold">
                                                                Přijímáme poslední pacienty.
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Quick Actions Footer - Inside Slide */}
                                                    <div className="grid grid-cols-2 gap-4 w-full pt-6 mt-auto">
                                                        <a href="tel:+420545162070" className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors text-lg">
                                                            <Phone size={20} /> Zavolat
                                                        </a>
                                                        <a href="mailto:ordinace@finemedica.cz" className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 transition-colors text-lg">
                                                            <Mail size={20} /> Napsat
                                                        </a>
                                                    </div>
                                                </div>
                                            )}

                                            {/* ALERT CARD */}
                                            {card.type === "ALERT" && (
                                                <div className="flex flex-col h-full justify-center space-y-6">
                                                    <div className="flex items-center gap-4 text-amber-600 mb-2">
                                                        <div className="bg-amber-100 p-3 rounded-full">
                                                            <AlertTriangle size={32} className="shrink-0" />
                                                        </div>
                                                        <h4 className="font-bold text-2xl leading-tight">{notice.alertTitle || "Upozornění"}</h4>
                                                    </div>

                                                    <div className="text-slate-800 font-medium text-xl leading-snug">
                                                        {notice.alertText}
                                                    </div>

                                                    {notice.substituteText && (
                                                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 mt-4 text-base text-amber-900 leading-relaxed whitespace-pre-line shadow-sm">
                                                            <strong className="block mb-2 text-amber-700 flex items-center gap-2 uppercase tracking-wide text-xs"><User size={14} /> Zástup</strong>
                                                            {notice.substituteText}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* CUSTOM INFO CARD */}
                                            {card.type === "CUSTOM_INFO" && (
                                                <div className="flex flex-col h-full justify-center">
                                                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-blue-600 shadow-sm">
                                                        <Info size={32} />
                                                    </div>
                                                    <h4 className="font-bold text-2xl text-slate-900 mb-4">
                                                        {notice.customInfoTitle}
                                                    </h4>
                                                    <p className="text-slate-600 text-lg leading-relaxed">
                                                        {notice.customInfoText}
                                                    </p>
                                                    <div className="mt-auto pt-8">
                                                        <Link href="#contact" className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg">
                                                            Pro více informací nás kontaktujte
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pagination Dots */}
                            <div className="flex justify-center gap-2 pb-6">
                                {scrollSnaps.map((_, index) => (
                                    <button
                                        key={index}
                                        className={cn(
                                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                            index === selectedIndex ? "bg-blue-600 w-8" : "bg-slate-300 hover:bg-slate-400"
                                        )}
                                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                        aria-label={`Go to slide ${index + 1}`}
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
