import type { Metadata } from "next";
import {
  DM_Mono,
  DM_Sans,
  DM_Serif_Text,
  DM_Serif_Display,
} from "next/font/google";
import { ThemeProvider } from "@/context/theme";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "500",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
  weight: "400",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ammar Ahmed",
    default: "Ammar Ahmed",
    absolute: "Home | Ammar Ahmed",
  },
  icons: {
    icon: "/favicon-dark/favicon.ico",
    apple: "/favicon-dark/apple-touch-icon.png",
  },
  description: `Ammar Ahmed's personal portfolio and blog website created with Next.js, React, TypeScript, and tailwindCSS using Notion as a CMS.`,
  openGraph: {
    type: "website",
    description:
      "Ammar Ahmed's personal portfolio and blog website created with Next.js using Notion as a CMS.",
    siteName: "ammarahmed.ca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="dark" rootSelector=":root">
      <html lang="en">
        <body
          className={`${dmMono.variable} ${dmSans.variable} ${dmSerifText.variable} ${dmSerifDisplay.variable} antialiased font-sans text-base`}>
          <NextTopLoader color="hsl(var(--foreground))" />
          <Navbar />
          <main className="mt-[15vh] max-w-4xl mx-auto px-3">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
