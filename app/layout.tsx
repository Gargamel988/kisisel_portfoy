import "./globals.css";
import MainNavbar from "../components/layout";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const interFont = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ömer Aydın | Full Stack Developer",
  description:
    "Ömer Aydın'ın portfolio sitesi. Full Stack Developer, Mobile Developer, Web Developer.",
  keywords: [
    "Ömer Aydın",
    "Full Stack Developer",
    "Mobile Developer",
    "Web Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
  ],
  authors: [{ name: "Ömer Aydın", url: "https://www.omeraydin.com" }],
  creator: "Ömer Aydın",
  publisher: "Ömer Aydın",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "Ömer Aydın | Full Stack Developer",
    description:
      "Ömer Aydın'ın portfolio sitesi. Full Stack Developer, Mobile Developer, Web Developer.",
    siteName: "Ömer Aydın",
    images: [
      {
        url: "/profil.png",
        width: 1200,
        height: 630,
        alt: "Ömer Aydın | Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ömer Aydın | Full Stack Developer",
    description:
      "Ömer Aydın'ın portfolio sitesi. Full Stack Developer, Mobile Developer, Web Developer.",
    images: ["/profil.png"],
    creator: "@omerAIdev",
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
    name: "Ömer Aydın",
    description:
      "Ömer Aydın'ın portfolio sitesi. Full Stack Developer, Mobile Developer, Web Developer.",
    url: "https://www.omeraydin.com",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
    },
    creator: {
      "@type": "Person",
      name: "Ömer Aydın",
    },
    inLanguage: "tr-TR",
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ömer Aydın",
    url: "https://www.omeraydin.com",
    logo: "https://www.omeraydin.com/profil.png",
    sameAs: ["https://x.com/omerAIdev"],
  };
  return (
    <html lang="tr" className="dark">
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
        <MainNavbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
