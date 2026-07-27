"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Služby", href: "/#services" },
        { name: "Ceník", href: "/cenik" },
        { name: "Ordinační hodiny", href: "/#hours" },
        { name: "Kontakt", href: "/#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <img src="/logo.svg" alt="FineMedica Logo" className="w-9 h-9 shrink-0 group-hover:scale-105 transition-transform" />
                    <span className="text-2xl tracking-tighter font-semibold text-slate-900">
                        Fine<span className="text-blue-600">Medica</span>
                    </span>
                </Link>

                {/* Desktop Menu - Centered & Right */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6 bg-slate-100/50 px-6 py-2 rounded-full border border-slate-200/50 backdrop-blur-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="tel:+420545162070"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 hidden lg:block"
                        >
                            +420 545 162 070
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                            Objednat se
                            <ArrowRight size={14} className="opacity-70" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-slate-600 font-medium px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-slate-100 my-2" />
                    <Link
                        href="#contact"
                        className="w-full text-center px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Objednat se
                    </Link>
                </div>
            )}
        </nav>
    );
}
