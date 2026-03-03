import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Andrew Marks - Design Portfolio",
  description: "Interactive design portfolio of Andrew Marks, featuring UI/UX design and development work.",
  keywords: ["Andrew Marks", "Portfolio", "Design", "UI/UX", "Web Development", "Frontend"],
  authors: [{ name: "Andrew Marks" }],
  openGraph: {
    title: "Andrew Marks - Design Portfolio",
    description: "Interactive design portfolio showcasing UI/UX and web development work.",
    url: "https://andrewmarks.net",
    siteName: "Andrew Marks Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Marks - Design Portfolio",
    description: "Interactive design portfolio showcasing UI/UX and web development work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
