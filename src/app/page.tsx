"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, ArrowRight, BrainCircuit, Activity, LineChart, Target, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import ParticlesBackground from "@/components/ui/particles-background";

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
      borderColor: "hover:border-blue-500/50",
      shadowColor: "hover:shadow-blue-500/10",
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
      borderColor: "hover:border-emerald-500/50",
      shadowColor: "hover:shadow-emerald-500/10",
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
      borderColor: "hover:border-indigo-500/50",
      shadowColor: "hover:shadow-indigo-500/10",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-slate-50 dark:bg-slate-900/20 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Particles Background */}
        <ParticlesBackground />
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl mix-blend-multiply filter animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/40 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-emerald-500/40 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-4000"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col space-y-8 text-left"
            >
              <div className="space-y-4 max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-sm shadow-sm"
                >
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Platform Simulasi Tes Kerja #1 di Indonesia
                </motion.div>
                
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Latih Kesiapanmu,<br/>
                  <span className="text-gradient-animated block mt-2">Taklukkan Tes Kerja.</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                  Platform simulasi mandiri untuk mempersiapkan dirimu menghadapi psikotes, TPA, dan tes koran di berbagai perusahaan ternama.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 max-w-md">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">
                    <CountUp end={1000} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce />
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><FileText className="h-3 w-3" /> Bank Soal</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">
                    <CountUp end={5} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce />
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Target className="h-3 w-3" /> Modul Tes</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">
                    <CountUp end={10} suffix="k+" duration={2.5} enableScrollSpy scrollSpyOnce />
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Users className="h-3 w-3" /> Pengguna</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="rounded-full px-8 shadow-lg hover:-translate-y-1 transition-all glow-border"
                >
                  <Link href="#katalog">
                    Mulai Latihan Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Content - Floating Mockups */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex relative h-[500px] w-full items-center justify-center"
            >
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 top-1/4 right-1/4"
              >
                <Card className="w-[280px] shadow-2xl shadow-primary/20 bg-background/80 backdrop-blur-md border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/20 p-2 rounded-lg"><BrainCircuit className="h-5 w-5 text-primary" /></div>
                      <CardTitle className="text-sm font-semibold">Simulasi Gabungan</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-secondary rounded-full">
                        <div className="h-full w-3/4 bg-primary rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground font-medium">
                        <span>75/100 Terjawab</span>
                        <span className="text-emerald-500">45 Menit Sisa</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute z-10 bottom-1/4 left-1/4"
              >
                <Card className="w-[260px] shadow-2xl shadow-emerald-500/20 bg-background/80 backdrop-blur-md border-emerald-500/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-500/20 p-2 rounded-lg"><Activity className="h-5 w-5 text-emerald-500" /></div>
                      <CardTitle className="text-sm font-semibold">Tes Kraepelin</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-4">
                      <Star className="h-8 w-8 text-amber-400 mb-2 fill-amber-400" />
                      <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">Skor: 850</span>
                      <span className="text-xs text-muted-foreground mt-1">Sangat Baik</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="katalog" className="w-full py-16 md:py-24 lg:py-32 bg-background relative z-10">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground mb-4">
                <Target className="h-4 w-4" /> Katalog Modul
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pilih Modul Latihanmu</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Pilih modul tes yang ingin kamu latih hari ini. Seluruh tes dilengkapi dengan timer, skor otomatis, dan pembahasan mendalam.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {modules.map((modul) => (
              <motion.div key={modul.id} variants={itemVariants}>
                <Card className={`relative flex flex-col h-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${modul.borderColor} ${modul.shadowColor} hover:shadow-xl`}>
                  {modul.badge && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                        {modul.badge}
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${modul.color} shadow-inner`}>
                      {modul.icon}
                    </div>
                    <CardTitle className="text-xl">{modul.title}</CardTitle>
                    <CardDescription className="text-sm mt-2 line-clamp-2">
                      {modul.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6 flex-1">
                    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
                        <FileText className="h-4 w-4 text-foreground/70" />
                        <span className="font-medium text-foreground/90">{modul.questions}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
                        <Clock className="h-4 w-4 text-foreground/70" />
                        <span className="font-medium text-foreground/90">{modul.duration}</span>
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
