"use client";

import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "border-b bg-background/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary group-hover:scale-110 transition-transform">
            <BrainCircuit className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">TesKerja<span className="text-primary">.id</span></span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Katalog Modul
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Riwayat
          </Link>
        </nav>
      </div>
    </header>
  );
}
