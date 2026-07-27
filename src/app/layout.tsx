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

/* Judge-panel pass (research 005): pitch-first descriptions (the
   electric-sheep line now trails instead of leading search results and
   link previews), canonical URL, summary_large_image card (the og:image
   itself is src/app/opengraph-image.png), keywords dropped (ignored by
   every major engine since 2009). */
export const metadata: Metadata = {
  metadataBase: new URL("https://andrewmarks.net"),
  title: "Andrew Marks — UX & Product Designer",
  description:
    "Product design for AI systems — enterprise DoD platforms, clinical copilots, and agentic workflows. Research & design for users wrangling electric sheep.",
  authors: [{ name: "Andrew Marks" }],
  alternates: { canonical: "./" },
  openGraph: {
    title: "Andrew Marks — UX & Product Designer",
    description:
      "Product design for AI systems — enterprise DoD platforms, clinical copilots, and agentic workflows. Research & design for users wrangling electric sheep.",
    url: "https://andrewmarks.net",
    siteName: "Andrew Marks Design",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Marks — UX & Product Designer",
    description:
      "Product design for AI systems — enterprise DoD platforms, clinical copilots, and agentic workflows. Research & design for users wrangling electric sheep.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the boot-film head script stamps data-film
    // on <html> before hydration (by design); React must not warn or patch.
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      {/* TODO(Andrew): Adobe Fonts kit for Neue Haas Grotesk Display Pro
          (55 Roman / 65 Medium / 75 Bold). Add inside <head> once created:
          <link rel="stylesheet" href="https://use.typekit.net/KIT_ID.css" /> */}
      <head>
        {/* Boot-film gate — must run BEFORE first paint. Stamps
            <html data-film> only for: home page, first visit this session
            (or ?film override for review), motion-ok, desktop. No stamp =>
            nothing is ever hidden (no-JS, crawlers, repeat visits,
            reduced-motion, mobile all render the finished page instantly).
            suppressHydrationWarning: browser extensions inject their own
            scripts into <head> pre-hydration and React would flag the
            collision (seen live with a location-spoofer extension). */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "try{if(location.pathname==='/'&&(location.search.indexOf('film')>-1||!sessionStorage.getItem('am-film-seen'))&&matchMedia('(prefers-reduced-motion: no-preference)').matches&&innerWidth>=1024){document.documentElement.setAttribute('data-film','')}}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
