import Link from "next/link"
import { BrainCircuit } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BrainCircuit className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">TesKerja<span className="text-primary">.id</span></span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary hover:underline underline-offset-4">
            Katalog Modul
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline underline-offset-4">
            Riwayat
          </Link>
        </nav>
      </div>
    </header>
  )
}
