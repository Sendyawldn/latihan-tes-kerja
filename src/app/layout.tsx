import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TesKerja.id - Latihan Simulasi Tes Magang & Kerja",
  description: "Platform latihan mandiri untuk persiapan menghadapi tes seleksi kerja seperti psikotes, TPA, Kraepelin, dan Pauli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fontSans.variable} ${fontMono.variable} h-full antialiased suppressHydrationWarning`}>
      <body className="min-h-full flex flex-col relative bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
