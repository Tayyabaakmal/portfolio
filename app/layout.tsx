import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { profile } from "@/data/profile";
import SmoothScroll from "@/components/SmoothScroll";
import Curtain from "@/components/Curtain";
import Nav from "@/components/Nav";
import ChatLauncher from "@/components/ChatLauncher";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const displayFont = localFont({
  src: "../public/fonts/bricolage-semibold.woff",
  weight: "600",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});
const bodyFont = localFont({
  src: [
    {
      path: "../public/fonts/instrument-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/instrument-semibold.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
const themeScript = `(function(){try{var saved=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=saved==='dark'||saved==='light'?saved:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}})()`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.siteDescription,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.siteDescription,
    type: "website",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#3A2BFF" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: siteUrl,
    sameAs: [
      profile.contact.github,
      profile.contact.linkedin,
      profile.contact.behance,
    ],
  };
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <FloatingWhatsApp />
        <ChatLauncher />
        <main id="main">{children}</main>
        <Curtain />
        <Analytics />
      </body>
    </html>
  );
}
