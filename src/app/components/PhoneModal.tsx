"use client";

import { Phone, X } from "lucide-react";
import { useState, useEffect } from "react";

interface PhoneModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    phoneNumber?: string;
    title?: string;
    subtitle?: string;
}

function getDynamicCallStatus(): { timeInstruction: string; isOpenNow: boolean } {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentMinutes = hours * 60 + minutes;

    const schedule: Record<number, { openMin: number; closeMin: number; openStr: string; closeStr: string; dayName: string }> = {
        1: { openMin: 7 * 60, closeMin: 13 * 60, openStr: "7:00", closeStr: "13:00", dayName: "v pondělí" },
        2: { openMin: 11 * 60, closeMin: 18 * 60, openStr: "11:00", closeStr: "18:00", dayName: "v úterý" },
        3: { openMin: 7 * 60, closeMin: 13 * 60, openStr: "7:00", closeStr: "13:00", dayName: "ve středu" },
        4: { openMin: 7 * 60, closeMin: 13 * 60, openStr: "7:00", closeStr: "13:00", dayName: "ve čtvrtek" },
        5: { openMin: 7 * 60, closeMin: 12 * 60, openStr: "7:00", closeStr: "12:00", dayName: "v pátek" },
    };

    const todaySchedule = schedule[day];

    if (todaySchedule) {
        if (currentMinutes >= todaySchedule.openMin && currentMinutes < todaySchedule.closeMin) {
            return {
                timeInstruction: `Dnes volejte do ${todaySchedule.closeStr}`,
                isOpenNow: true,
            };
        }
        if (currentMinutes < todaySchedule.openMin) {
            return {
                timeInstruction: `Dnes volejte od ${todaySchedule.openStr} do ${todaySchedule.closeStr}`,
                isOpenNow: false,
            };
        }
    }

    if (day >= 1 && day <= 4 && currentMinutes >= schedule[day].closeMin) {
        const nextDay = (day + 1) as keyof typeof schedule;
        const nextSchedule = schedule[nextDay];
        return {
            timeInstruction: `Volejte zítra od ${nextSchedule.openStr} do ${nextSchedule.closeStr}`,
            isOpenNow: false,
        };
    }

    return {
        timeInstruction: `Volejte v pondělí od 7:00 do 13:00`,
        isOpenNow: false,
    };
}

export default function PhoneModal({
    isOpen: externalIsOpen,
    onClose: externalOnClose,
    phoneNumber,
    title,
    subtitle,
}: PhoneModalProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [activePhone, setActivePhone] = useState<string | null>(null);
    const [activeTitle, setActiveTitle] = useState<string | null>(null);
    const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);

    const isVisible = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

    const handleClose = () => {
        if (externalOnClose) {
            externalOnClose();
        }
        setInternalIsOpen(false);
    };

    // Global listener for ANY phone link clicked anywhere on the website
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a[href^='tel:']");
            if (target) {
                if ((target as HTMLElement).getAttribute("data-modal-call") === "true") {
                    return;
                }
                e.preventDefault();
                const href = target.getAttribute("href") || "";
                const rawNum = href.replace("tel:", "").trim();
                if (rawNum.includes("732892607")) {
                    setActivePhone("+420 732 892 607");
                    setActiveTitle("Zástup v době dovolené");
                    setActiveSubtitle("MUDr. Eva Klusáčková • Institut komplexní péče");
                } else {
                    setActivePhone(null);
                    setActiveTitle(null);
                    setActiveSubtitle(null);
                }
                setInternalIsOpen(true);
            }
        };

        const handleCustomEvent = () => setInternalIsOpen(true);

        document.addEventListener("click", handleGlobalClick, true);
        window.addEventListener("open-phone-modal", handleCustomEvent);

        return () => {
            document.removeEventListener("click", handleGlobalClick, true);
            window.removeEventListener("open-phone-modal", handleCustomEvent);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        if (isVisible) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const { timeInstruction } = getDynamicCallStatus();
    const displayPhone = phoneNumber || activePhone || "+420 545 162 070";
    const displayTitle = title || activeTitle || "Objednejte se telefonicky";
    const displaySubtitle = subtitle || activeSubtitle || timeInstruction;
    const telHref = `tel:${displayPhone.replace(/\s+/g, "")}`;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={handleClose}
        >
            {/* Dark Sleek Modal Box matching user screenshot - ALWAYS 1 LINE FOR PHONE NUMBER */}
            <div
                className="relative w-full max-w-lg sm:max-w-xl bg-[#1c2230] rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-slate-700/80 text-white space-y-5 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors border border-slate-700"
                    aria-label="Zavřít okno"
                >
                    <X size={20} />
                </button>

                {/* Header Row matching user's screenshot */}
                <div className="flex items-start gap-4 pr-10">
                    {/* Left Round Blue Phone Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/40 mt-0.5">
                        <Phone size={26} />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                            {displayTitle}
                        </h3>

                        <p className="text-slate-300 font-semibold text-base sm:text-lg">
                            {displaySubtitle}
                        </p>
                    </div>
                </div>

                {/* GIANT LIGHT BLUE PHONE NUMBER */}
                <div className="pt-1">
                    <a
                        href={telHref}
                        data-modal-call="true"
                        className="block text-2xl sm:text-4xl md:text-5xl font-black text-[#75aaff] hover:text-white font-mono tracking-normal sm:tracking-wider whitespace-nowrap transition-colors"
                    >
                        {displayPhone}
                    </a>
                </div>

                {/* Mobile Call Button */}
                <div className="pt-2 border-t border-slate-800">
                    <a
                        href={telHref}
                        data-modal-call="true"
                        className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                        <Phone size={22} /> Vytočit číslo
                    </a>
                </div>
            </div>
        </div>
    );
}
