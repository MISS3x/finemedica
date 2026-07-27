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
  title: "MUDr. Jana Petrušková & MUDr. Dagmar Rusková | Praktický lékař pro dospělé v Brně",
  description: "Ordinace praktického lékaře pro dospělé v Brně – MUDr. Jana Petrušková a MUDr. Dagmar Rusková. Kompletní péče, EKG, preventivní a závodní prohlídky, očkování. Špitálka 6, Brno.",
  keywords: [
    "MUDr. Jana Petrušková",
    "MUDr. Dagmar Rusková",
    "Praktický lékař pro dospělé v Brně",
    "praktický lékař Brno",
    "praktik Brno Zábrdovice",
    "obvodní lékař Brno",
    "ordinace Špitálka Brno",
    "závodní péče Brno",
    "vyšetření EKG Brno",
    "preventivní prohlídky Brno",
    "očkování Brno",
    "FineMedica"
  ],
  authors: [{ name: "FineMedica s.r.o. - MUDr. Jana Petrušková, MUDr. Dagmar Rusková" }],
  creator: "FineMedica",
  openGraph: {
    title: "MUDr. Jana Petrušková & MUDr. Dagmar Rusková | Praktický lékař pro dospělé v Brně",
    description: "Moderní ordinace praktického lékaře pro dospělé v Brně. MUDr. Jana Petrušková & MUDr. Dagmar Rusková. Špitálka 253/6, Brno.",
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
  "name": "FineMedica s.r.o. - Praktický lékař pro dospělé v Brně",
  "alternateName": "MUDr. Jana Petrušková a MUDr. Dagmar Rusková",
  "url": "https://www.finemedica.cz",
  "logo": "https://www.finemedica.cz/logo.svg",
  "telephone": "+420545162070",
  "email": "ordinace@finemedica.cz",
  "medicalSpecialty": "PrimaryCare",
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
  "physician": [
    {
      "@type": "IndividualPhysician",
      "name": "MUDr. Jana Petrušková",
      "jobTitle": "Praktický lékař pro dospělé"
    },
    {
      "@type": "IndividualPhysician",
      "name": "MUDr. Dagmar Rusková",
      "jobTitle": "Praktický lékař pro dospělé"
    }
  ],
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
