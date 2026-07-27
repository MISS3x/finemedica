import Image from "next/image";

const insuranceCompanies = [
    { name: "VZP", src: "/images/insurance/vzp.webp", code: "111" },
    { name: "VoZP", src: "/images/insurance/vozp.webp", code: "201" },
    { name: "ZP MV ČR", src: "/images/insurance/zpmv.webp", code: "211" },
    { name: "OZP", src: "/images/insurance/ozp.webp", code: "207" },
    { name: "ČPZP", src: "/images/insurance/cpzp.webp", code: "205" },
    { name: "RBP", src: "/images/insurance/rbp.webp", code: "213" },
];

export default function Insurance() {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Smluvní pojišťovny
                    </h2>
                    <p className="text-lg text-slate-500">
                        Spolupracujeme se všemi významnými zdravotními pojišťovnami v ČR
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center max-w-6xl mx-auto">
                    {insuranceCompanies.map((company) => (
                        <div
                            key={company.name}
                            className="group flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105"
                        >
                            <div className="relative w-32 h-20 md:w-40 md:h-24 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
                                <Image
                                    src={company.src}
                                    alt={company.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
