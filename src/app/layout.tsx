import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/theme";
import Navbar from "@/components/ui/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ammar Ahmed",
    default: "Ammar Ahmed",
    absolute: "Home | Ammar Ahmed",
  },
  description: `Ammar Ahmed's personal portfolio and blog website created with Next.js using Notion as a CMS.`,
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <main className="mt-[15vh]">{children}</main>
        </body>
      </html>
    </ThemeProvider>
  );
}
