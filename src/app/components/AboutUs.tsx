"use client";

import { Shield, Activity, Clock, Heart, User, ArrowRight, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const aboutImages = [
    { src: "/images/doctor_talking.png", alt: "Lékařka hovořící s pacientem" },
    { src: "/images/building.jpg", alt: "Budova ordinace na Špitálce 6, Brno" },
    { src: "/images/medical_desk.png", alt: "Moderní diagnostické vybavení" },
    { src: "/images/waiting_room.png", alt: "Příjemné prostředí ordinace" },
];

export default function AboutUs() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    // Smooth automatic image rotation every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top-right z-0"></div>

            <div className="container relative z-10 space-y-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content Column */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
                            <User size={14} />
                            MUDr. Jana Petrušková & MUDr. Dagmar Rusková
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                            Praktický lékař pro dospělé <br />
                            <span className="text-blue-600">v Brně (FineMedica)</span>
                        </h2>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            Poskytujeme léčebně preventivní péči v oboru praktického lékařství pro dospělé, odběry biologického materiálu a aplikaci očkovacích látek v Brně.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 pt-2">
                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                    <Activity className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Diagnostika</h3>
                                    <p className="text-sm text-slate-500">Špičkové vybavení přímo v ordinaci (EKG, CRP, INR, glukometr).</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md">
                                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                    <Shield className="text-indigo-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Prevence</h3>
                                    <p className="text-sm text-slate-500">Důraz na preventivní prohlídky a včasný záchyt onemocnění.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md">
                                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                                    <Clock className="text-emerald-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Bez čekání</h3>
                                    <p className="text-sm text-slate-500">Efektivní objednávkový systém pro váš komfort.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md">
                                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                                    <Heart className="text-amber-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Empatie</h3>
                                    <p className="text-sm text-slate-500">Individuální rodinný přístup ke každému pacientovi.</p>
                                </div>
                            </div>
                        </div>

                        {/* Expandable SEO Details Button & Actions */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all border border-slate-200"
                            >
                                {isExpanded ? "Skrýt podrobný popis" : "Více o naší ordinaci"}
                                {isExpanded ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
                            </button>

                            <Link href="#contact" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 hover:underline text-sm">
                                Objednat se do ordinace <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Image Column - Single Clean Frame with Slow Cross-Fade Animation */}
                    <div className="relative lg:h-[550px] flex items-center justify-center">
                        <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-900">
                            {aboutImages.map((img, idx) => (
                                <div
                                    key={img.src}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                        idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                    }`}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                        priority={idx === 0}
                                    />
                                </div>
                            ))}

                            {/* Carousel Indicators / Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                {aboutImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            idx === currentImageIndex ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                                        }`}
                                        aria-label={`Přejít na snímek ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Background blobs behind main image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                        </div>
                    </div>
                </div>

                {/* Expanded Comprehensive Text (Visible when toggled or indexed by search engines) */}
                {isExpanded && (
                    <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-inner space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                            <CheckCircle2 size={24} className="text-blue-600 shrink-0" />
                            <h3 className="text-2xl font-bold text-slate-900">
                                Kompletní informace o lékařské péči v ordinaci FineMedica Brno
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 text-slate-700 leading-relaxed text-base">
                            <div className="space-y-4">
                                <p>
                                    Poskytujeme léčebně preventivní péči v oboru <strong>praktického lékařství pro dospělé v Brně</strong>, odběry biologického materiálu a aplikaci očkovacích látek.
                                </p>
                                <p>
                                    V naší ordinaci <strong>MUDr. Jany Petruškové</strong> a <strong>MUDr. Dagmar Ruskové</strong> poskytujeme standardní léčebně-preventivní péči. Nabízíme léčbu akutních a chronických onemocnění a pravidelné preventivní prohlídky pro dospělé.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p>
                                    Ke standardním službám pacientům patří pravidelné očkování, očkování do zahraničí, uznávání pracovní neschopnosti. Zajišťujeme odborná lékařská a předoperační vyšetření. V rámci závodní preventivní péče provádíme vstupní a výstupní prohlídky pacientů do zaměstnání.
                                </p>
                                <p>
                                    Díky modernímu vybavení provádíme odběry krve a moči, EKG vyšetření, CRP diagnostiku a měření krevního cukru (glukometr) přímo v ordinaci. V případě nutnosti navštěvujeme své pacienty v domácnosti v Brně. Naše lékařská péče zahrnuje také zdravotní poradenství a preventivní doporučení.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
