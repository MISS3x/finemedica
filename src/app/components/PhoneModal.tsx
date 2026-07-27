"use client";

import { Phone, X } from "lucide-react";
import { useState, useEffect } from "react";

interface PhoneModalProps {
    isOpen?: boolean;
    onClose?: () => void;
}

function getDynamicCallStatus(): { timeInstruction: string; isOpenNow: boolean } {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon ...
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
        // Currently OPEN
        if (currentMinutes >= todaySchedule.openMin && currentMinutes < todaySchedule.closeMin) {
            return {
                timeInstruction: `Dnes volejte do ${todaySchedule.closeStr}`,
                isOpenNow: true,
            };
        }
        // Early morning BEFORE opening
        if (currentMinutes < todaySchedule.openMin) {
            return {
                timeInstruction: `Dnes volejte od ${todaySchedule.openStr} do ${todaySchedule.closeStr}`,
                isOpenNow: false,
            };
        }
    }

    // After closing hours on workday -> Next workday
    if (day >= 1 && day <= 4 && currentMinutes >= schedule[day].closeMin) {
        const nextDay = (day + 1) as keyof typeof schedule;
        const nextSchedule = schedule[nextDay];
        return {
            timeInstruction: `Volejte zítra od ${nextSchedule.openStr} do ${nextSchedule.closeStr}`,
            isOpenNow: false,
        };
    }

    // Friday after 12:00 or Weekend (Sat/Sun) -> Next is Monday
    return {
        timeInstruction: `Volejte v pondělí od 7:00 do 13:00`,
        isOpenNow: false,
    };
}

export default function PhoneModal({ isOpen: externalIsOpen, onClose: externalOnClose }: PhoneModalProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

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
                // If it's the direct trigger inside the modal, allow default call action
                if ((target as HTMLElement).getAttribute("data-modal-call") === "true") {
                    return;
                }
                e.preventDefault();
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

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={handleClose}
        >
            {/* Dark Sleek Modal Box 1:1 matching user screenshot */}
            <div
                className="relative w-full max-w-xl bg-[#1c2230] rounded-[2rem] p-6 sm:p-10 shadow-2xl border border-slate-700/80 text-white space-y-6 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors border border-slate-700"
                    aria-label="Zavřít okno"
                >
                    <X size={20} />
                </button>

                {/* Content Row matching user's screenshot 1:1 */}
                <div className="flex items-start gap-5">
                    {/* Left Round Blue Phone Icon */}
                    <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/40 mt-1">
                        <Phone size={28} />
                    </div>

                    {/* Text & Phone Details */}
                    <div className="space-y-2 flex-1 pr-6">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Objednejte se telefonicky
                        </h3>

                        {/* VELKÁ INSTRUKCE HODIN */}
                        <p className="text-slate-300 font-semibold text-lg sm:text-xl">
                            {timeInstruction}
                        </p>

                        {/* GIANT LIGHT BLUE PHONE NUMBER */}
                        <a
                            href="tel:+420545162070"
                            data-modal-call="true"
                            className="inline-block pt-3 text-3xl sm:text-5xl font-black text-[#75aaff] hover:text-white font-mono tracking-wider transition-colors"
                        >
                            +420 545 162 070
                        </a>
                    </div>
                </div>

                {/* Mobile Call Button */}
                <div className="pt-2 border-t border-slate-800">
                    <a
                        href="tel:+420545162070"
                        data-modal-call="true"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                        <Phone size={22} /> Vytočit číslo
                    </a>
                </div>
            </div>
        </div>
    );
}
