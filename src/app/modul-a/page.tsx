import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, ArrowRight, BrainCircuit, CheckCircle2 } from "lucide-react";
import modulAData from "@/data/modul-a.json";

export default function ModulAPreparation() {
  const totalWaktu = modulAData.reduce((acc, cat) => acc + cat.waktu_menit, 0);
  const totalSoal = modulAData.reduce((acc, cat) => acc + cat.soal.length, 0);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/10 p-3 rounded-xl">
          <BrainCircuit className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Simulasi Tes Magang & Kerja</h1>
          <p className="text-muted-foreground">Modul Gabungan (Flagship)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Tes</CardTitle>
            <CardDescription>Baca dengan teliti sebelum memulai simulasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Modul ini dirancang untuk mensimulasikan psikotes dan Tes Potensi Akademik (TPA) yang umum digunakan 
              pada rekrutmen perusahaan dan BUMN di Indonesia. Simulasi ini terdiri dari beberapa kategori tes 
              yang harus dikerjakan secara berurutan.
            </p>
            
            <div className="space-y-3 pt-4">
              <h4 className="font-semibold text-sm">Kategori Tes:</h4>
              <ul className="space-y-2">
                {modulAData.map((kategori, i) => (
                  <li key={kategori.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground font-medium">{kategori.nama}</strong> ({kategori.soal.length} soal, {kategori.waktu_menit} menit)
                      <br/>
                      {kategori.deskripsi}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Soal</p>
                  <p className="text-2xl font-bold">{totalSoal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Estimasi Waktu</p>
                  <p className="text-2xl font-bold">{totalWaktu} <span className="text-sm font-normal text-muted-foreground">Menit</span></p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" asChild>
                <Link href="/modul-a/tes">
                  Mulai Simulasi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-400">
            <strong>Perhatian:</strong> Pastikan Anda berada di tempat yang tenang dan koneksi internet stabil. Waktu akan terus berjalan setelah tes dimulai.
          </div>
        </div>
      </div>
    </div>
  );
}
