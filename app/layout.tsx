import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { siteConfig } from "@/data/site";
import DKLoader from "@/components/ui/DKLoader";
import NavLoader from "@/components/ui/NavLoader";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.intro,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.intro,
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  other: {
    "darkreader-lock": "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="darkreader-lock" />
        {/*
         * Blocking script: runs synchronously before any HTML is painted.
         * Immediately hides scroll so no content drifts into view during
         * the gap between SSR paint and React hydration.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.overflow='hidden';document.documentElement.setAttribute('data-initial-loading','');`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/*
         * Static pre-hydration cover — server-rendered so it exists in
         * the very first HTML byte the browser paints, BEFORE any JS runs.
         *
         * DKLoader (z-index 9999) mounts on top and runs the full branded
         * animation. When DKLoader finishes, it removes this element via
         * document.getElementById('dk-static-cover').
         *
         * NavLoader checks for this element's presence to know whether the
         * initial load is still in progress, so it never interferes.
         */}
        <div
          id="dk-static-cover"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background: "#05080a",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* Initial page load: full branded animation (D comet + K logo + text) */}
        <DKLoader />

        {/*
         * Route transitions: only the infinity-loop D comet, small & centered.
         * Hidden until the user navigates; shown on click, hidden on arrival.
         */}
        <NavLoader />

        {children}
      </body>
    </html>
  );
}