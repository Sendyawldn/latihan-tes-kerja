import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, ArrowRight, BrainCircuit, Activity, LineChart } from "lucide-react";

export default function Home() {
  const modules = [
    {
      id: "modul-a",
      title: "Simulasi Gabungan (Flagship)",
      description: "Paket lengkap tes seleksi (Matematika, Verbal, Visual, Komputer, B.Inggris).",
      questions: "100 Soal",
      duration: "60 Menit",
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
      href: "/modul-a",
      badge: "Paling Populer",
      color: "bg-blue-500/10",
    },
    {
      id: "kraepelin",
      title: "Tes Kraepelin (Tes Koran)",
      description: "Tes kecepatan dan ketelitian menjumlahkan angka dari bawah ke atas.",
      questions: "Dinamis",
      duration: "20 Menit",
      icon: <Activity className="h-6 w-6 text-emerald-500" />,
      href: "/kraepelin",
      badge: "Intensif",
      color: "bg-emerald-500/10",
    },
    {
      id: "pauli",
      title: "Tes Pauli (Tes Koran)",
      description: "Mirip Kraepelin, namun arah penjumlahan dari atas ke bawah.",
      questions: "Dinamis",
      duration: "60 Menit",
      icon: <LineChart className="h-6 w-6 text-indigo-500" />,
      href: "/pauli",
      color: "bg-indigo-500/10",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl mix-blend-multiply filter animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/40 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-emerald-500/40 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-4000"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Latihan <span className="text-primary">Tes Magang</span> & Kerja
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                Platform simulasi mandiri untuk mempersiapkan dirimu menghadapi psikotes, TPA, dan tes koran di berbagai perusahaan ternama.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="rounded-full px-8 shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all">
                <Link href="#katalog">
                  Mulai Latihan Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="katalog" className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Katalog Modul</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pilih Modul Latihanmu</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Pilih modul tes yang ingin kamu latih hari ini. Seluruh tes dilengkapi dengan timer dan skor otomatis.
              </p>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((modul) => (
              <Card key={modul.id} className="relative flex flex-col h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                {modul.badge && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      {modul.badge}
                    </div>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${modul.color}`}>
                    {modul.icon}
                  </div>
                  <CardTitle className="text-xl">{modul.title}</CardTitle>
                  <CardDescription className="text-sm mt-2 line-clamp-2">
                    {modul.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6 flex-1">
                  <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary/70" />
                      <span>{modul.questions}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary/70" />
                      <span>{modul.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 mt-auto">
                  <Button asChild className="w-full group" variant={modul.badge ? "default" : "outline"}>
                    <Link href={modul.href}>
                      Mulai Latihan
                      <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
