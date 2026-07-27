"use client";

import { useState } from "react";
import { Send, CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { sendEmailAction } from "../actions/sendEmail";

export default function Contact() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormState("submitting");
        setErrorMessage(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: (formData.get("name") as string) || "",
            email: (formData.get("email") as string) || "",
            phone: (formData.get("phone") as string) || "",
            message: (formData.get("message") as string) || "",
        };

        const result = await sendEmailAction(data);

        if (result.success) {
            setFormState("success");
            e.currentTarget.reset();
        } else {
            console.error(result.error);
            setFormState("error");
            setErrorMessage(typeof result.error === "string" ? result.error : "Chyba při odesílání zprávy. Zkuste to prosím později.");
        }
    }

    return (
        <section id="contact" className="py-24 bg-slate-50">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Kontaktujte nás</h2>
                            <p className="text-lg text-slate-500 max-w-md">
                                Máte dotaz nebo se chcete objednat? Jsme tu pro vás. Využijte telefonní kontakt nebo náš formulář.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                { icon: <Phone size={24} />, title: "Telefon", value: "+420 545 162 070", desc: "Po–Pá v ordinačních hodinách", href: "tel:+420545162070" },
                                { icon: <Mail size={24} />, title: "Email", value: "ordinace@finemedica.cz", desc: "odpovídáme do 24 hodin", href: "mailto:ordinace@finemedica.cz" },
                                { icon: <MapPin size={24} />, title: "Adresa", value: "Špitálka 253/6", desc: "602 00 Brno-Zábrdovice", href: "#" },
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    className="flex items-start gap-4 p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                                        <div className="text-lg font-medium text-slate-700 mt-1">{item.value}</div>
                                        <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200 border border-slate-100">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-900">Napište nám zprávu</h3>
                            <p className="text-slate-500">Vyplňte formulář a my se vám ozveme zpět.</p>
                        </div>

                        {formState === "success" ? (
                            <div className="text-center py-12 animate-in fade-in zoom-in">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-2">Odesláno úspěšně!</h4>
                                <p className="text-slate-600 mb-8">Děkujeme za vaši zprávu. Budeme vás kontaktovat co nejdříve.</p>
                                <button
                                    onClick={() => setFormState("idle")}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Poslat další zprávu
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {formState === "error" && errorMessage && (
                                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                                        ⚠️ {errorMessage}
                                    </div>
                                )}
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-slate-700">Jméno a příjmení</label>
                                        <input
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Jan Novák"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Telefon</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            required
                                            placeholder="+420 777 000 000"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="jan@email.cz"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-slate-700">Vaše zpráva</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        placeholder="Popište, co potřebujete..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formState === "submitting"}
                                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {formState === "submitting" ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Odesílám...
                                        </>
                                    ) : (
                                        <>
                                            Odeslat zprávu
                                            <Send size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
