"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Clock, CheckCircle2, Phone, Mail, Calendar, User, ShieldAlert, ChevronLeft, ChevronRight, RotateCw, AlertCircle } from "lucide-react";
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
    const [phoneModalConfig, setPhoneModalConfig] = useState<{
        number?: string;
        title?: string;
        subtitle?: string;
    } | null>(null);

    // Interactive Notice Board - 3D Card Flip State
    const [cardIndex, setCardIndex] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const [frontCardIndex, setFrontCardIndex] = useState(0);
    const [backCardIndex, setBackCardIndex] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const vacations = notice?.vacations || [];
    const substituteText = notice?.substituteText;
    const hasSubstitute = Boolean(substituteText);
    const hasCustom = Boolean(notice?.customInfoActive && notice?.customInfoText);

    // List of cards for notice board
    const availableCards = [
        { type: "vacations", title: "Plánované termíny dovolených 2026", icon: Calendar },
        ...(hasSubstitute ? [{ type: "substitute", title: "Zástup v době dovolené", icon: User }] : []),
        ...(hasCustom ? [{ type: "custom", title: notice?.customInfoTitle || "Důležité oznámení", icon: AlertCircle }] : []),
    ];

    const totalCards = availableCards.length;

    // Flip card to specific index
    const flipToCard = (targetIndex: number) => {
        if (targetIndex === cardIndex || totalCards <= 1) return;
        const newRot = rotationY + 180;
        const targetIsEven = Math.floor(newRot / 180) % 2 === 0;

        if (targetIsEven) {
            setFrontCardIndex(targetIndex);
        } else {
            setBackCardIndex(targetIndex);
        }
        setCardIndex(targetIndex);
        setRotationY(newRot);
    };

    // Auto-flip every 10 seconds
    useEffect(() => {
        if (isHovered || totalCards <= 1) return;

        const interval = setInterval(() => {
            setCardIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % totalCards;
                const newRot = rotationY + 180;
                const targetIsEven = Math.floor(newRot / 180) % 2 === 0;

                if (targetIsEven) {
                    setFrontCardIndex(nextIndex);
                } else {
                    setBackCardIndex(nextIndex);
                }
                setRotationY(newRot);
                return nextIndex;
            });
        }, 10000); // 10s flip

        return () => clearInterval(interval);
    }, [isHovered, totalCards, rotationY]);

    // Calculate current operating status & today's index
    useEffect(() => {
        const now = new Date();
        const day = now.getDay();
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

    const renderCardFace = (cardData: any, idx: number) => {
        if (!cardData) return null;
        const IconComponent = cardData.icon;

        return (
            <>
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-orange-200/80 pb-2.5 shrink-0">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-orange-950">
                        <IconComponent size={18} className="text-orange-600 shrink-0" />
                        <span className="truncate">{cardData.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold text-orange-900 bg-orange-200/60 px-2 py-0.5 rounded-md">
                            {idx + 1} / {totalCards}
                        </span>
                        <div className="flex items-center gap-1">
                            {availableCards.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        flipToCard(dotIdx);
                                    }}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300 cursor-pointer",
                                        dotIdx === cardIndex ? "bg-orange-600 w-5" : "bg-orange-300 hover:bg-orange-400 w-2"
                                    )}
                                    aria-label={`Zobrazit kartu ${dotIdx + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                flipToCard((cardIndex + 1) % totalCards);
                            }}
                            className="p-1 rounded-lg hover:bg-orange-200/60 text-orange-800 transition-colors cursor-pointer ml-0.5"
                            title="Otočit kartu (auto 10s)"
                            aria-label="Otočit kartu"
                        >
                            <RotateCw size={14} className="transition-transform hover:rotate-180 duration-500" />
                        </button>
                    </div>
                </div>

                {/* Card Body */}
                {cardData.type === "vacations" && (
                    <div className="space-y-2 flex-1 flex flex-col justify-center my-auto">
                        {vacations.map((vac: any, vIdx: number) => {
                            const hasNote = Boolean(vac.note);
                            const badgeText = hasNote ? vac.note : formatDateRange(vac);
                            const titleText = hasNote ? vac.title : (vac.title || "Dovolená");

                            return (
                                <div
                                    key={vIdx}
                                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-orange-200/80 shadow-2xs gap-2"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <ShieldAlert size={16} className="text-orange-600 shrink-0" />
                                        <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                                            {titleText}
                                        </span>
                                    </div>
                                    <span className="shrink-0 px-2.5 py-1 rounded-lg bg-orange-500 text-white font-mono font-extrabold text-[11px] sm:text-xs shadow-xs tracking-wide">
                                        {badgeText}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {cardData.type === "substitute" && substituteText && (
                    <div className="flex-1 flex flex-col justify-center text-sm sm:text-base font-bold text-orange-950 leading-relaxed border-l-4 border-orange-500 pl-4 py-1 space-y-2.5">
                        <div className="space-y-1">
                            <p className="text-xl sm:text-2xl font-black text-orange-950">MUDr. Eva Klusáčková</p>
                            <p className="text-xs sm:text-sm font-semibold text-orange-900">
                                Institut komplexní péče, spol. s r.o. • Franzova 43, 614 00 Brno - Maloměřice
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPhoneModalConfig({
                                        number: "+420 732 892 607",
                                        title: "Zástup v době dovolené",
                                        subtitle: "MUDr. Eva Klusáčková • Institut komplexní péče",
                                    });
                                    setIsPhoneModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-600/30 transition-all hover:scale-105 cursor-pointer"
                            >
                                <Phone size={15} /> Firemní telefon: +420 732 892 607
                            </button>
                        </div>
                    </div>
                )}

                {cardData.type === "custom" && (
                    <div className="flex-1 flex flex-col justify-center text-orange-950 space-y-2 border-l-4 border-amber-500 pl-4 py-1">
                        <h4 className="text-lg font-black text-orange-950">{notice?.customInfoTitle}</h4>
                        <p className="text-sm font-medium text-orange-900 leading-relaxed">{notice?.customInfoText}</p>
                    </div>
                )}
            </>
        );
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
                {/* items-start prevents vertical resizing when left card toggles content */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left Column: Text, CTA & 3D Flip Card Interactive Notice Board */}
                    <div className="lg:col-span-6 text-center lg:text-left space-y-6">
                        <div className="space-y-6">
                            {/* Top Claim / Header under Menu */}
                            <div className="space-y-4">
                                <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50/90 border border-blue-100 text-blue-900 font-extrabold text-sm sm:text-base shadow-2xs animate-fade-in-up">
                                    <User size={18} className="text-blue-600 shrink-0" />
                                    <span>MUDr. Jana Petrušková a MUDr. Dagmar Rusková</span>
                                    <span className="hidden sm:inline text-blue-300">•</span>
                                    <span className="text-blue-700 font-bold">Praktický lékař pro dospělé v Brně</span>
                                </div>

                                {notice?.acceptingNewPatients && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        Přijímáme nové pacienty
                                    </div>
                                )}

                                {/* Main Heading / Claim */}
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-600 block mb-1">
                                        MUDr. Jana Petrušková a MUDr. Dagmar Rusková
                                    </span>
                                    Praktický lékař <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
                                        pro dospělé v Brně
                                    </span>
                                </h1>

                                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Poskytujeme kompletní léčebně preventivní péči v oboru praktického lékařství pro dospělé v Brně.
                                    Spojujeme odbornost s lidským přístupem pro celou rodinu.
                                </p>
                            </div>

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
                                    className="h-12 px-7 inline-flex items-center justify-center text-base font-bold text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-blue-500/30 hover:scale-[1.02] focus:outline-none cursor-pointer gap-2"
                                >
                                    Objednat se
                                    <ArrowRight size={18} />
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
                                    className="h-12 px-7 inline-flex items-center justify-center text-base font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 focus:outline-none cursor-pointer gap-2"
                                >
                                    <PlayCircle size={18} />
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

                        {/* Interactive Notice Board - 3D Card Flip (10s auto-flip + click) */}
                        <div
                            className="w-full relative [perspective:1000px] h-[270px] select-none cursor-pointer group"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => flipToCard((cardIndex + 1) % totalCards)}
                        >
                            <div
                                className="w-full h-full relative transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
                                style={{
                                    transform: `rotateY(${rotationY}deg)`,
                                }}
                            >
                                {/* FRONT FACE */}
                                <div
                                    className="absolute inset-0 w-full h-full p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-50/95 via-amber-50/90 to-orange-50/95 border border-orange-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                    }}
                                >
                                    {renderCardFace(availableCards[frontCardIndex], frontCardIndex)}
                                </div>

                                {/* BACK FACE */}
                                <div
                                    className="absolute inset-0 w-full h-full p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-50/95 via-amber-50/90 to-orange-50/95 border border-orange-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    {renderCardFace(availableCards[backCardIndex], backCardIndex)}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Dedicated Exclusively to Ordinační hodiny (Fixed Size) */}
                    <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-slate-800 space-y-5 relative overflow-hidden">
                        
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
                                "px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shrink-0 border",
                                status === "OPEN" && "bg-green-500/20 text-green-300 border-green-500/30",
                                status === "CLOSING_SOON" && "bg-orange-500/20 text-orange-300 border-orange-500/30",
                                (status === "AFTER_HOURS" || status === "CLOSED") && "bg-slate-800 text-slate-400 border-slate-700"
                            )}>
                                {status === "OPEN" && "• Aktuálně otevřeno"}
                                {status === "CLOSING_SOON" && "• Zavíráme za 30 min."}
                                {(status === "AFTER_HOURS" || status === "CLOSED") && "• Dnes již zavřeno"}
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
                                onClick={() => {
                                    setPhoneModalConfig(null);
                                    setIsPhoneModalOpen(true);
                                }}
                                className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors text-sm shadow-md shadow-blue-600/30 cursor-pointer"
                            >
                                <Phone size={16} /> Zavolat
                            </button>
                            <a href="mailto:ordinace@finemedica.cz" className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition-colors text-sm border border-slate-700">
                                <Mail size={16} /> Napsat
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* Senior-Friendly Phone Modal */}
            <PhoneModal
                isOpen={isPhoneModalOpen}
                onClose={() => {
                    setIsPhoneModalOpen(false);
                    setPhoneModalConfig(null);
                }}
                phoneNumber={phoneModalConfig?.number}
                title={phoneModalConfig?.title}
                subtitle={phoneModalConfig?.subtitle}
            />
        </section>
    );
}
