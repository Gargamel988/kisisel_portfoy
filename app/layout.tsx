import "./globals.css";
import MainNavbar from "../components/layout";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const interFont = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Hatay yazılım ",
  description:
    "Hatay yazılım - Profesyonel web ve mobil uygulama geliştirme hizmetleri. Modern teknolojilerle SEO optimizasyonu, responsive tasarım ve performans odaklı çözümler sunuyoruz.",
  keywords: [
    "Hatay yazılım",
    "web geliştirme Hatay",
    "mobil uygulama geliştirme Hatay",
    "SEO optimizasyonu Hatay",
    "yazılım şirketi Hatay",
    "web tasarım Hatay",
    "responsive web tasarım",
    "e-ticaret geliştirme",
    "web uygulama geliştirme",
    "mobil uygulama geliştirme",
    "SEO hizmetleri",
    "web sitesi geliştirme",
    "yazılım çözümleri",
    "dijital dönüşüm",
    "modern web teknolojileri",
  ],

  alternates: {
    canonical: "https://hatayyazilim.com/",
  },
  metadataBase: new URL("https://hatayyazilim.com/"),
  authors: [{ name: "Hatay yazılım", url: "https://hatayyazilim.com/" }],
  creator: "Hatay yazılım",
  publisher: "Hatay yazılım",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "Hatay yazılım - Profesyonel web ve mobil uygulama geliştirme hizmetleri",
    description:
      "Hatay yazılım - Profesyonel web ve mobil uygulama geliştirme hizmetleri. Modern teknolojilerle SEO optimizasyonu, responsive tasarım ve performans odaklı çözümler sunuyoruz.",
    siteName: "Hatay yazılım",
    images: [
      {
        url: "/profil.png",
        width: 1200,
        height: 630,
        alt: "Hatay yazılım - Profesyonel web ve mobil uygulama geliştirme hizmetleri",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hatay yazılım - Profesyonel web ve mobil uygulama geliştirme hizmetleri",
    description:
      "Hatay yazılım - Profesyonel web ve mobil uygulama geliştirme hizmetleri. Modern teknolojilerle SEO optimizasyonu, responsive tasarım ve performans odaklı çözümler sunuyoruz.",
    images: ["/profil.png"],
    creator: "@hatayyazilim",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hatay yazılım",
    description:
      "Hatay yazılım - Profesyonel web ve mobil uygulama geliştirme hizmetleri. Modern teknolojilerle SEO optimizasyonu, responsive tasarım ve performans odaklı çözümler sunuyoruz.",
    url: "https://hatayyazilim.com/",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
    },
    creator: {
      "@type": "Person",
      name: "Hatay yazılım",
    },
    inLanguage: "tr-TR",
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hatay yazılım",
    url: "https://hatayyazilim.com/",
    logo: "https://hatayyazilim.com/profil.png",
    sameAs: ["https://x.com/hatayyazilim"],
  };
  return (
    <html lang="tr" className="dark" >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      
      <body className={interFont.className}>
        {children}
        <MainNavbar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
