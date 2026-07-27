"use client";

import { Phone, X, Clock, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

interface PhoneModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PhoneModal({ isOpen, onClose }: PhoneModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            {/* Modal Box */}
            <div
                className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border-4 border-blue-500 text-center space-y-6 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors border border-slate-200"
                    aria-label="Zavřít okno"
                >
                    <X size={24} />
                </button>

                {/* Big Phone Icon */}
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-600/20 border-2 border-green-200">
                    <Phone size={40} className="animate-bounce" />
                </div>

                {/* Header for Seniors */}
                <div className="space-y-2">
                    <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-800 tracking-wider">
                        Telefonní kontakt
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Ordinace FineMedica Brno
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                        MUDr. Jana Petrušková & MUDr. Dagmar Rusková
                    </p>
                </div>

                {/* GIANT PHONE NUMBER DISPLAY FOR SENIORS */}
                <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Telefonní číslo pro objednání
                    </p>
                    <a
                        href="tel:+420545162070"
                        className="block text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-wider bg-slate-100 py-5 px-4 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all shadow-inner"
                    >
                        +420 545 162 070
                    </a>
                </div>

                {/* Call Action Button */}
                <div className="space-y-3 pt-2">
                    <a
                        href="tel:+420545162070"
                        className="w-full py-4 sm:py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-green-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                    >
                        <Phone size={26} /> Vytočit číslo ihned
                    </a>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
                    >
                        Zavřít okno
                    </button>
                </div>

                {/* Operating Hours Note */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                    <Clock size={14} className="text-blue-600 shrink-0" />
                    <span>Volejte prosím v ordinačních hodinách (Po–Pá od 7:00).</span>
                </div>
            </div>
        </div>
    );
}
