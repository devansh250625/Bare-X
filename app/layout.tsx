import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://barex.skin";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bare-X | AI Personalized Skincare Platform",
    template: "%s | Bare-X"
  },
  description:
    "Bare-X is an AI-powered skincare platform that analyzes skin concerns, generates a skin score, and recommends a personalized skincare routine with premium product prototypes.",
  keywords: [
    "AI skincare",
    "personalized skincare routine",
    "skin analysis quiz",
    "skincare for men",
    "skincare for women",
    "skin score",
    "Bare-X"
  ],
  applicationName: "Bare-X",
  authors: [{ name: "Bare-X" }],
  creator: "Bare-X",
  publisher: "Bare-X",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Bare-X | Stop Guessing Your Skincare",
    description:
      "Analyze your skin, get a personalized score, and unlock a premium routine built around your skin profile.",
    url: siteUrl,
    siteName: "Bare-X",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Bare-X | AI Personalized Skincare Platform",
    description:
      "Bare-X analyzes your skin and builds a personalized skincare routine in 30 seconds."
  },
  category: "beauty"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <AppProviders />
        {children}
      </body>
    </html>
  );
}
