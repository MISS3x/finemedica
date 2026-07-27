import Navbar from "./components/Navbar";
import HeroClient from "./components/HeroClient";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Insurance from "./components/Insurance";
import Hours from "./components/Hours";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import fs from "fs/promises";
import path from "path";

async function getData() {
  const filePath = path.join(process.cwd(), "public/data.json");
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (e) {
    // Fallback or try src/lib/data.json if public fails
    try {
      const fallbackPath = path.join(process.cwd(), "src/lib/data.json");
      const fallbackContents = await fs.readFile(fallbackPath, "utf8");
      return JSON.parse(fallbackContents);
    } catch (e2) {
      return null;
    }
  }
}

export default async function Home() {
  const siteData = await getData();
  const notice = siteData?.noticeBoard || { show: false };

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <HeroClient notice={notice} />
        <AboutUs />
        <Services />
        <Insurance />
        <Hours />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
