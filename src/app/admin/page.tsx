"use client";

import { useState, useEffect } from "react";
import { updateNoticeBoard, updatePriceList, getSiteData } from "../actions";
import { Lock, Save, Plus, Trash2, Edit2, Check, X } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"notice" | "pricelist">("notice");

    const [noticeData, setNoticeData] = useState<any>({
        show: false,
        title: "",
        alertTitle: "",
        alertText: "",
        substituteText: "",
        customInfoActive: false,
        customInfoTitle: "",
        customInfoText: "",
        vacations: [],
    });

    const [priceList, setPriceList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        async function load() {
            const data = await getSiteData();
            if (data) {
                // Ensure vacations array exists
                const loadedNotice = { ...data.noticeBoard, vacations: data.noticeBoard.vacations || [] };
                setNoticeData(loadedNotice);
                setPriceList(data.priceList);
            }
            setLoading(false);
        }
        load();
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "48444844") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Nesprávný PIN kód");
        }
    };

    const handleSaveNotice = async () => {
        await updateNoticeBoard(noticeData);
        alert("Uloženo!");
    };

    const handleSavePriceList = async () => {
        await updatePriceList(priceList);
        alert("Ceník uložen!");
    };

    const addPriceItem = () => {
        setPriceList([...priceList, { name: "Nová položka", price: "0" }]);
    };

    const removePriceItem = (index: number) => {
        const newList = [...priceList];
        newList.splice(index, 1);
        setPriceList(newList);
    };

    const updatePriceItem = (index: number, field: "name" | "price", value: string) => {
        const newList = [...priceList];
        newList[index][field] = value;
        setPriceList(newList);
    };

    const addVacation = () => {
        if (noticeData.vacations.length >= 3) return;
        setNoticeData({
            ...noticeData,
            vacations: [...noticeData.vacations, { title: "Dovolená", startDate: "", endDate: "" }]
        });
    };

    const removeVacation = (index: number) => {
        const newVacations = [...noticeData.vacations];
        newVacations.splice(index, 1);
        setNoticeData({ ...noticeData, vacations: newVacations });
    };

    const updateVacation = (index: number, field: string, value: string) => {
        const newVacations = [...noticeData.vacations];
        newVacations[index][field] = value;
        setNoticeData({ ...noticeData, vacations: newVacations });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <Lock size={32} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-6 text-slate-900">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Zadejte PIN kód"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center text-xl tracking-widest"
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                        >
                            Přihlásit se
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) return <div className="p-8 text-center">Načítám data...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <span className="font-bold text-xl">FineMedica Admin</span>
                    <button onClick={() => setIsAuthenticated(false)} className="text-sm opacity-70 hover:opacity-100">
                        Odhlásit
                    </button>
                </div>
            </nav>

            <div className="container mx-auto mt-8 px-4">
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab("notice")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === "notice" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        Nástěnka (Dovolená)
                    </button>
                    <button
                        onClick={() => setActiveTab("pricelist")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === "pricelist" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        Ceník Služeb
                    </button>
                </div>

                {activeTab === "notice" && (
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6 max-w-2xl">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Editace Nástěnky</h2>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-800">1. Plánování Dovolené (Max 3)</h3>
                                <button
                                    onClick={addVacation}
                                    disabled={noticeData.vacations.length >= 3}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    <Plus size={16} /> Přidat
                                </button>
                            </div>

                            <div className="space-y-3">
                                {noticeData.vacations.length === 0 && (
                                    <p className="text-sm text-slate-500 italic">Žádná naplánovaná dovolená.</p>
                                )}
                                {noticeData.vacations.map((vac: any, i: number) => (
                                    <div key={i} className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-slate-700 text-sm">Dovolená #{i + 1}</span>
                                            <button onClick={() => removeVacation(i)} className="text-red-400 hover:text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Název</label>
                                            <input
                                                value={vac.title}
                                                onChange={(e) => updateVacation(i, "title", e.target.value)}
                                                className="w-full px-2 py-1 border rounded text-sm"
                                                placeholder="Např. Zimní dovolená"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-500 mb-1">Od</label>
                                                <input
                                                    type="date"
                                                    value={vac.startDate}
                                                    onChange={(e) => updateVacation(i, "startDate", e.target.value)}
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-500 mb-1">Do</label>
                                                <input
                                                    type="date"
                                                    value={vac.endDate}
                                                    onChange={(e) => updateVacation(i, "endDate", e.target.value)}
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                            <h3 className="font-bold text-lg text-slate-800">2. Informace o zástupu</h3>
                            <p className="text-sm text-slate-500">Tyto informace se zobrazují vždy dole na nástěnce.</p>
                            <div>
                                <label className="block text-sm font-medium mb-1">Text o zástupu</label>
                                <textarea
                                    value={noticeData.substituteText}
                                    onChange={(e) => setNoticeData({ ...noticeData, substituteText: e.target.value })}
                                    rows={5}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                            <h3 className="font-bold text-lg text-slate-800">3. Obecné nastavení</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hlavní nadpis nástěnky</label>
                                <input
                                    value={noticeData.title}
                                    onChange={(e) => setNoticeData({ ...noticeData, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Status (malý text v hlavičce)</label>
                                <input
                                    value={noticeData.operatingStatus}
                                    onChange={(e) => setNoticeData({ ...noticeData, operatingStatus: e.target.value })}
                                    placeholder="např. Ordinace v provozu"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                            <h3 className="font-bold text-lg text-slate-800">4. Vlastní informace (Rotující karta)</h3>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="custom_info_active"
                                    checked={noticeData.customInfoActive}
                                    onChange={(e) => setNoticeData({ ...noticeData, customInfoActive: e.target.checked })}
                                    className="w-5 h-5 accent-blue-600"
                                />
                                <label htmlFor="custom_info_active" className="font-medium text-slate-700">Zapnout vlastní informační kartu</label>
                            </div>

                            {noticeData.customInfoActive && (
                                <div className="pl-8 space-y-3 animate-in fade-in slide-in-from-top-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Nadpis karty</label>
                                        <input
                                            value={noticeData.customInfoTitle}
                                            onChange={(e) => setNoticeData({ ...noticeData, customInfoTitle: e.target.value })}
                                            placeholder="např. Očkování proti chřipce"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Text karty</label>
                                        <textarea
                                            value={noticeData.customInfoText}
                                            onChange={(e) => setNoticeData({ ...noticeData, customInfoText: e.target.value })}
                                            placeholder="např. Od září očkujeme..."
                                            rows={3}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSaveNotice}
                            className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2 w-full justify-center shadow-md"
                        >
                            <Save size={20} />
                            Uložit nastavení nástěnky
                        </button>
                    </div>
                )}

                {activeTab === "pricelist" && (
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-slate-900">Editace Ceníku</h2>
                            <button
                                onClick={addPriceItem}
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors flex items-center gap-2"
                            >
                                <Plus size={18} />
                                Přidat položku
                            </button>
                        </div>

                        <div className="space-y-4">
                            {priceList.map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 items-start md:items-center group">
                                    <div className="flex-grow w-full">
                                        <input
                                            value={item.name}
                                            onChange={(e) => updatePriceItem(index, "name", e.target.value)}
                                            placeholder="Název služby"
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="w-full md:w-32 flex items-center gap-2">
                                        <input
                                            value={item.price}
                                            onChange={(e) => updatePriceItem(index, "price", e.target.value)}
                                            placeholder="Cena"
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right font-mono"
                                        />
                                        <span className="text-slate-500">Kč</span>
                                    </div>
                                    <button
                                        onClick={() => removePriceItem(index)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Odstranit"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="sticky bottom-4 flex justify-end pt-4 bg-white/90 backdrop-blur-sm border-t border-slate-100">
                            <button
                                onClick={handleSavePriceList}
                                className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg"
                            >
                                <Save size={20} />
                                Uložit kompletní ceník
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
