"use client";

import { Phone, X, Clock, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface PhoneModalProps {
    isOpen?: boolean;
    onClose?: () => void;
}

function getDynamicCallStatus(): { statusBadge: string; timeInstruction: string; isOpenNow: boolean } {
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
                statusBadge: "• ORDINACE OTEVŘENA",
                timeInstruction: `Dnes volejte do ${todaySchedule.closeStr}`,
                isOpenNow: true,
            };
        }
        // Early morning BEFORE opening
        if (currentMinutes < todaySchedule.openMin) {
            return {
                statusBadge: "• ZATÍM ZAVŘENO",
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
            statusBadge: "• DNES JIŽ ZAVŘENO",
            timeInstruction: `Volejte zítra od ${nextSchedule.openStr} do ${nextSchedule.closeStr}`,
            isOpenNow: false,
        };
    }

    // Friday after 12:00 or Weekend (Sat/Sun) -> Next is Monday
    return {
        statusBadge: "• VÍKEND / ZAVŘENO",
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
                // If it's the direct trigger inside the modal, allow default call action or handle cleanly
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

    const { statusBadge, timeInstruction, isOpenNow } = getDynamicCallStatus();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            {/* Modal Box */}
            <div
                className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border-4 border-blue-500 text-center space-y-6 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors border border-slate-200"
                    aria-label="Zavřít okno"
                >
                    <X size={24} />
                </button>

                {/* Big Phone Icon */}
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-600/20 border-2 border-green-200">
                    <Phone size={40} className="animate-bounce" />
                </div>

                {/* Header & Senior Title */}
                <div className="space-y-2">
                    <span className={`text-xs uppercase font-extrabold px-3.5 py-1 rounded-full tracking-wider border ${
                        isOpenNow 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : "bg-orange-100 text-orange-800 border-orange-200"
                    }`}>
                        {statusBadge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Objednejte se telefonicky
                    </h3>
                    <p className="text-base font-bold text-blue-600">
                        MUDr. Jana Petrušková & MUDr. Dagmar Rusková
                    </p>
                </div>

                {/* DYNAMIC TIME INSTRUCTION (e.g. "Dnes volejte do 13:00" or "Volejte zítra od 11:00 do 18:00") */}
                <div className="bg-blue-50/80 border-2 border-blue-200 p-4 rounded-2xl space-y-1">
                    <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                        Ordinační doba pro telefonáty
                    </p>
                    <p className="text-xl sm:text-2xl font-black text-blue-950">
                        {timeInstruction}
                    </p>
                </div>

                {/* GIANT PHONE NUMBER DISPLAY FOR SENIORS */}
                <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Telefonní číslo do ordinace
                    </p>
                    <a
                        href="tel:+420545162070"
                        data-modal-call="true"
                        className="block text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-wider bg-slate-100 py-5 px-4 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all shadow-inner"
                    >
                        +420 545 162 070
                    </a>
                </div>

                {/* Call Action Button */}
                <div className="space-y-3 pt-2">
                    <a
                        href="tel:+420545162070"
                        data-modal-call="true"
                        className="w-full py-4 sm:py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-green-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                    >
                        <Phone size={26} /> Vytočit číslo na telefonu
                    </a>

                    <button
                        onClick={handleClose}
                        className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
                    >
                        Zavřít okno
                    </button>
                </div>

                {/* Address Note */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                    <Clock size={14} className="text-blue-600 shrink-0" />
                    <span>Špitálka 253/6, Brno-Zábrdovice</span>
                </div>
            </div>
        </div>
    );
}
