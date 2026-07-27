"use client";

import { Shield, Activity, Clock, CheckCircle, Heart, User, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top-right z-0"></div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content Column */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                            <User size={14} />
                            O nás
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                            Moderní medicína <br />
                            <span className="text-blue-600">s lidskou tváří</span>
                        </h2>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            V naší ordinaci kombinujeme nejnovější diagnostické postupy s tradičním rodinným přístupem.
                            Věříme, že základem úspěšné léčby je vzájemná důvěra a otevřená komunikace.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 pt-4">
                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                    <Activity className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Diagnostika</h3>
                                    <p className="text-sm text-slate-500">Špičkové vybavení přímo v ordinaci (EKG, CRP, INR).</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md">
                                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                    <Shield className="text-indigo-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Prevence</h3>
                                    <p className="text-sm text-slate-500">Důraz na preventivní programy a včasný záchyt.</p>
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
                                    <p className="text-sm text-slate-500">Individuální přístup ke každému pacientovi.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Link href="#contact" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 hover:underline">
                                Poznejte náš tým <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Image Column - Composition of multiple images */}
                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        <div className="relative w-full max-w-[500px] aspect-[4/5]">
                            {/* Main Image */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
                                <Image
                                    src="/images/doctor_talking.png"
                                    alt="Lékař hovořící s pacientem"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Secondary Image - Floating */}
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 hidden md:block">
                                <Image
                                    src="/images/medical_desk.png"
                                    alt="Moderní vybavení"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Badge/Element */}
                            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-bounce-slow hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Award className="text-green-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-bold uppercase">Zkušenosti</div>
                                        <div className="text-lg font-bold text-slate-900">20+ Let</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background blobs behind images */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
