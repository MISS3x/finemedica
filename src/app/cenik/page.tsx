import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Check, Info } from "lucide-react";
import fs from "fs/promises";
import path from "path";

export const metadata = {
    title: "Ceník | FineMedica",
    description: "Ceník poskytovaných zdravotních služeb nehrazených z veřejného zdravotního pojištění.",
};

async function getData() {
    const filePath = path.join(process.cwd(), "src/lib/data.json");
    try {
        const fileContents = await fs.readFile(filePath, "utf8");
        return JSON.parse(fileContents);
    } catch (e) {
        return null;
    }
}

export default async function CenikPage() {
    const siteData = await getData();
    const priceListItems = siteData?.priceList || [];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="container max-w-4xl">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Ceník služeb</h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Ceník poskytovaných zdravotních služeb nehrazených z veřejného zdravotního pojištění.
                            Platný od 1. 1. 2025.
                        </p>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
                        <div className="bg-blue-600/5 border-b border-blue-100 p-6 flex items-center gap-3">
                            <Info className="text-blue-600" />
                            <span className="text-blue-900 font-medium">Ceny jsou uvedeny v Kč a jsou konečné.</span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {priceListItems.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-slate-50 transition-colors gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                            <Check size={12} />
                                        </div>
                                        <span className="text-slate-700 font-medium leading-relaxed">{item.name}</span>
                                    </div>
                                    <span className="text-xl font-bold text-slate-900 whitespace-nowrap pl-9 md:pl-0 font-mono text-blue-600">
                                        {item.price} Kč
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 text-center text-slate-400 text-sm">
                        <p>FineMedica s.r.o. | IČO: 21510512 | Ceník je platný od 1. 1. 2025</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
