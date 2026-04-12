import type { Metadata } from "next";
import { Geist_Mono, Rozha_One } from "next/font/google";
import { UIContextProvider } from "@/context/ui";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const display = Rozha_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "ammar@web:%s",
    default: "ammar@web:~",
    absolute: "ammar@web:~",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  description: `Ammar Ahmed's personal portfolio and blog — built with Next.js using Notion as a CMS.`,
  openGraph: {
    type: "website",
    description:
      "Ammar Ahmed's personal portfolio and blog — built with Next.js using Notion as a CMS.",
    siteName: "ammarahmed.ca",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UIContextProvider defaultTheme="dark" rootSelector=":root">
      <html lang="en">
        <body
          className={`${mono.variable} ${display.variable} antialiased font-mono text-base`}
        >
          <Analytics />
          <NextTopLoader
            color="oklch(var(--fg))"
            showSpinner={false}
          />
          <Navbar />
          <main className="max-w-[72ch] mx-auto px-4 sm:px-8 pt-24 pb-16">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </UIContextProvider>
  );
}
