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
  title: "MUDr. Jana Petrušková & MUDr. Dagmar Rusková | Praktický lékař pro dospělé v Brně (FineMedica)",
  description: "Poskytujeme léčebně preventivní péči v oboru praktického lékařství pro dospělé v Brně. Registrace na tel: +420 545 162 070 nebo ordinace@finemedica.cz. Zavolejte nebo napište a my Vám řekneme, zda máme aktuálně volná místa.",
  keywords: [
    "praktický lékař pro dospělé v Brně",
    "nejlepší praktický lékař Brno",
    "praktik Brno střed",
    "potřebuji praktického lékaře Brno střed",
    "volná místa praktický lékař Brno",
    "MUDr. Jana Petrušková",
    "MUDr. Dagmar Rusková",
    "ordinace Špitálka Brno",
    "obvodní lékař Brno",
    "závodní péče Brno",
    "vyšetření EKG Brno",
    "CRP vyšetření Brno",
    "očkování Brno",
    "FineMedica"
  ],
  authors: [{ name: "FineMedica s.r.o. - MUDr. Jana Petrušková, MUDr. Dagmar Rusková" }],
  creator: "FineMedica",
  openGraph: {
    title: "MUDr. Jana Petrušková & MUDr. Dagmar Rusková | Praktický lékař pro dospělé v Brně",
    description: "Poskytujeme léčebně preventivní péči v oboru praktického lékařství pro dospělé v Brně. Registrace na tel: +420 545 162 070 nebo ordinace@finemedica.cz.",
    url: "https://www.finemedica.cz",
    siteName: "FineMedica - Praktický lékař Brno",
    locale: "cs_CZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "FineMedica s.r.o. - Praktický lékař pro dospělé v Brně",
    "alternateName": ["MUDr. Jana Petrušková", "MUDr. Dagmar Rusková", "Praktik Brno střed", "Praktický lékař Brno-Zábrdovice"],
    "description": "Poskytujeme léčebně preventivní péči v oboru praktického lékařství pro dospělé v Brně, odběry biologického materiálu a aplikaci očkovacích látek. Registrace na tel: +420 545 162 070 nebo ordinace@finemedica.cz. Zavolejte nebo napište a my Vám řekneme, zda máme aktuálně volná místa.",
    "url": "https://www.finemedica.cz",
    "logo": "https://www.finemedica.cz/logo.svg",
    "telephone": "+420545162070",
    "email": "ordinace@finemedica.cz",
    "medicalSpecialty": "PrimaryCare",
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Brno"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Brno-střed"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Brno-Zábrdovice"
      }
    ],
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
        "jobTitle": "Praktický lékař pro dospělé v Brně"
      },
      {
        "@type": "IndividualPhysician",
        "name": "MUDr. Dagmar Rusková",
        "jobTitle": "Praktický lékař pro dospělé v Brně"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Potřebuji praktického lékaře v Brně (Brno-střed). Jak se mohu zaregistrovat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Registrace na tel: +420 545 162 070, případně na ordinace@finemedica.cz. Zavolejte nebo napište a my Vám řekneme, zda máme aktuálně volná místa."
        }
      },
      {
        "@type": "Question",
        "name": "Přijímá ordinace FineMedica Brno nové pacienty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Registrace na tel: +420 545 162 070, případně na ordinace@finemedica.cz. Zavolejte nebo napište a my Vám řekneme, zda máme aktuálně volná místa."
        }
      }
    ]
  }
];

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
