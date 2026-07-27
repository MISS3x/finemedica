import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FineMedica | Praktický lékař Brno-Zábrdovice (ul. Špitálka)",
  description: "Ordinace praktického lékaře v Brně na ul. Špitálka 6. Nabízíme kompletní diagnostickou a léčebnou péči, EKG, preventivní prohlídky, očkování i závodní péči.",
  keywords: [
    "praktický lékař Brno",
    "praktik Brno Zábrdovice",
    "ordinace Špitálka",
    "závodní péče Brno",
    "vyšetření EKG Brno",
    "preventivní prohlídky Brno",
    "očkování Brno"
  ],
  authors: [{ name: "FineMedica s.r.o." }],
  creator: "FineMedica",
  openGraph: {
    title: "FineMedica | Praktický lékař Brno-Zábrdovice",
    description: "Moderní ordinace praktického lékaře v Brně na ul. Špitálka. Léčebná a preventivní péče, EKG, závodní péče.",
    url: "https://www.finemedica.cz",
    siteName: "FineMedica",
    locale: "cs_CZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "FineMedica s.r.o.",
  "url": "https://www.finemedica.cz",
  "logo": "https://www.finemedica.cz/logo.png",
  "telephone": "+420545162070",
  "email": "ordinace@finemedica.cz",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Špitálka 253/6",
    "addressLocality": "Brno-Zábrdovice",
    "postalCode": "602 00",
    "addressCountry": "CZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.19318,
    "longitude": 16.62061
  },
  "medicalSpecialty": "PrimaryCare",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Wednesday", "Thursday"],
      "opens": "07:00",
      "closes": "13:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Tuesday",
      "opens": "11:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "07:00",
      "closes": "12:00"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
