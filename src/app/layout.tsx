import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Fraunces({
  variable: "--ff-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const body = Inter_Tight({
  variable: "--ff-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.philippebeaudoin.com"),
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
    url: "https://www.philippebeaudoin.com",
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
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.philippebeaudoin.com/#philippe",
      name: "Philippe Beaudoin",
      jobTitle: "Conférencier et formateur",
      url: "https://www.philippebeaudoin.com",
      image: "https://www.philippebeaudoin.com/images/hero/philippe-portrait.jpg",
      telephone: "+1-819-349-8334",
      address: { "@type": "PostalAddress", addressLocality: "Sherbrooke", addressRegion: "QC", addressCountry: "CA" },
      sameAs: ["https://www.linkedin.com/in/philippe-beaudoin-2721991b/"],
      knowsAbout: ["Personnalités", "Générations au travail", "Leadership", "Communication", "Intelligence émotionnelle", "Art du pitch"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.philippebeaudoin.com/#service",
      name: "Philippe Beaudoin — Conférences et formations",
      url: "https://www.philippebeaudoin.com",
      image: "https://www.philippebeaudoin.com/images/hero/philippe-conference.jpg",
      telephone: "+1-819-349-8334",
      founder: { "@id": "https://www.philippebeaudoin.com/#philippe" },
      areaServed: [{ "@type": "AdministrativeArea", name: "Québec" }, { "@type": "Country", name: "Canada" }],
      address: { "@type": "PostalAddress", addressLocality: "Sherbrooke", addressRegion: "QC", addressCountry: "CA" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
