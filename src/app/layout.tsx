import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

// Bundled Kannada font so regional scripts render correctly on every device,
// independent of the visitor's installed system fonts.
const kannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  display: "swap",
  variable: "--font-kannada",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://kirankumar.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kirankumar K. — Content Strategist & Scriptwriter",
    template: "%s | Kirankumar K.",
  },
  description:
    "Kirankumar K. writes high-retention short-form video scripts and personal-brand content in English & Kannada — built on audience psychology, structured for retention and conversions.",
  keywords: [
    "Kirankumar",
    "scriptwriter",
    "content strategist",
    "short-form video scripts",
    "personal branding",
    "Kannada scriptwriter",
    "reel scripts",
    "brand storytelling",
  ],
  authors: [{ name: "Kirankumar K." }],
  creator: "Kirankumar K.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Kirankumar K.",
    title: "Kirankumar K. — Content Strategist & Scriptwriter",
    description:
      "High-retention short-form video scripts and personal-brand content in English & Kannada. Built on audience psychology.",
    images: [
      {
        url: "/assets/hero-portrait.png",
        width: 900,
        height: 1200,
        alt: "Kirankumar K. — Content Strategist & Scriptwriter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirankumar K. — Content Strategist & Scriptwriter",
    description:
      "High-retention short-form video scripts and personal-brand content in English & Kannada.",
    images: ["/assets/hero-portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0EA5C6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kirankumar K.",
    jobTitle: "Content Strategist & Scriptwriter",
    description:
      "Writes high-retention short-form video scripts and personal-brand content in English & Kannada.",
    email: "mailto:kirankumarkulagod727@outlook.com",
    sameAs: ["https://instagram.com/kirannotes"],
    knowsLanguage: ["English", "Kannada"],
  };

  return (
    <html lang="en" className={`${jakarta.variable} ${kannada.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
