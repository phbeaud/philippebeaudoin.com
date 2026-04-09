import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://philippebeaudoin.com"),
  title: {
    default: "Philippe Beaudoin — Conférencier en personnalités, générations, leadership et communication",
    template: "%s | Philippe Beaudoin",
  },
  description:
    "Conférences et formations en entreprise sur les personnalités, les générations, le leadership, la communication et l'intelligence émotionnelle. Plus de 1000 interventions.",
  keywords: [
    "conférencier",
    "formateur",
    "personnalités",
    "intelligence émotionnelle",
    "leadership",
    "générations",
    "personnalités",
    "MBTI",
    "communication",
    "pitch",
    "formation en entreprise",
    "Québec",
    "Sherbrooke",
  ],
  authors: [{ name: "Philippe Beaudoin" }],
  openGraph: {
    title: "Philippe Beaudoin — Conférencier en personnalités, générations, leadership et communication",
    description:
      "J'aide les organisations à mieux comprendre les humains pour mieux travailler ensemble. Personnalités, générations, leadership et communication.",
    url: "https://philippebeaudoin.com",
    siteName: "Philippe Beaudoin",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/images/hero/philippe-conference.jpg",
        width: 1920,
        height: 1080,
        alt: "Philippe Beaudoin en conférence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Philippe Beaudoin — Conférencier en personnalités, générations, leadership et communication",
    description:
      "Conférences et formations sur les personnalités, les générations, le leadership et la communication.",
    images: ["/images/hero/philippe-conference.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
