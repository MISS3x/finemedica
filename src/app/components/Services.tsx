"use client";

import { Stethoscope, FileText, Syringe, Activity, Car, Factory, Users, Droplet, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Service {
    icon: any;
    title: string;
    description: string;
    items?: string[];
}

const services: Service[] = [
    {
        icon: Stethoscope,
        title: "Léčebná & Ambulantní péče",
        description: "Komplexní diagnostika, ambulantní ošetření a léčba akutních i chronických onemocnění.",
        items: ["Ambulantní ošetření", "Akutní stavy", "Chronická onemocnění"]
    },
    {
        icon: Check,
        title: "Preventivní prohlídky",
        description: "Pravidelné celkové prohlídky hrazené zdravotní pojišťovnou 1x za 2 roky.",
        items: ["Laboratorní odběry", "Vyšetření EKG", "Fyzikální vyšetření"]
    },
    {
        icon: Syringe,
        title: "Očkování",
        description: "Povinná i nepovinná očkování a poradenství v oblasti cestovní medicíny.",
        items: ["Tetanus", "Chřipka", "Klíšťová encefalitida"]
    },
    {
        icon: Activity,
        title: "Závodní péče & Prohlídky",
        description: "Vstupní, periodické a výstupní prohlídky pro zaměstnance i smluvní firmy.",
        items: ["Vstupní a výstupní prohlídky", "Periodické prohlídky", "Kategorizace prací"]
    },
    {
        icon: Car,
        title: "Řidičské a zbrojní průkazy",
        description: "Posuzování zdravotní způsobilosti k řízení vozidel, zbrojní a potravinářské průkazy.",
        items: ["Řidičské průkazy", "Zbrojní průkazy", "Potravinářské průkazy"]
    },
    {
        icon: FileText,
        title: "Posudky & Žádosti (DD / LDN)",
        description: "Lékařské posudky a vypsání žádostí do domovů důchodců, ústavů soc. péče či LDN.",
        items: ["Žádosti do DD a LDN", "Posudky způsobilosti", "Pojišťovací formuláře"]
    },
    {
        icon: Factory,
        title: "Předoperační vyšetření",
        description: "Kompletní interní předoperační vyšetření včetně EKG a odběrů krve.",
        items: ["EKG vyšetření", "Laboratorní odběry", "Interní zhodnocení"]
    },
    {
        icon: Droplet,
        title: "Diabetologie & Glukometr",
        description: "Měření hladiny cukru v krvi glukoměrem, péče o diabetiky 2. typu a kontroly.",
        items: ["Měření cukru (Glukometr)", "Diabetologie 2. typu", "Pravidelné kontroly"]
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>

            <div className="container relative z-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-600 font-bold uppercase text-xs tracking-widest mb-2 block">Naše specializace</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Zdravotní služby
                    </h2>
                    <p className="text-lg text-slate-600">
                        Nabízíme široké spektrum lékařských úkonů přímo v naší ordinaci.
                        Díky modernímu vybavení minimalizujeme nutnost návštěv specializovaných pracovišť.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-100 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-slate-500 mb-4 leading-relaxed text-sm">
                                {service.description}
                            </p>

                            {service.items && (
                                <ul className="space-y-2 mt-auto pt-4 border-t border-slate-100">
                                    {service.items.map((item, i) => (
                                        <li key={i} className="flex items-center text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-block bg-white p-6 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                        <p className="text-slate-600 mb-4">
                            Hledáte jiný typ vyšetření? Kontaktujte nás pro individuální domluvu.
                        </p>
                        <a href="tel:+420545162070" className="h-12 px-7 inline-flex items-center justify-center font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md text-base">
                            Zavolat do ordinace
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
