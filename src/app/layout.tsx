import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-geist-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://andrewmarks.net"),
  title: "Andrew Marks — UX & Product Designer",
  description:
    "Research & design for users wrangling electric sheep. Building agentic workflows & complex AI systems for humans, agents, & everything in between.",
  keywords: [
    "Andrew Marks",
    "UX Designer",
    "Product Designer",
    "AI UX",
    "Portfolio",
    "Design",
  ],
  authors: [{ name: "Andrew Marks" }],
  openGraph: {
    title: "Andrew Marks — UX & Product Designer",
    description:
      "Research & design for users wrangling electric sheep. UX for DoD, GovTech, and AI ecosystems.",
    url: "https://andrewmarks.net",
    siteName: "Andrew Marks Design",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Andrew Marks — UX & Product Designer",
    description:
      "Research & design for users wrangling electric sheep. UX for DoD, GovTech, and AI ecosystems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      {/* TODO(Andrew): Adobe Fonts kit for Neue Haas Grotesk Display Pro
          (55 Roman / 65 Medium / 75 Bold). Add inside <head> once created:
          <link rel="stylesheet" href="https://use.typekit.net/KIT_ID.css" /> */}
      <body>{children}</body>
    </html>
  );
}
