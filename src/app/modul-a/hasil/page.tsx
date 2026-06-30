"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionCategory, TestResult } from "@/types";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle } from "lucide-react";

export default function ModulAResult() {
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const savedCategories = localStorage.getItem("modul_a_categories");
    const savedAnswers = localStorage.getItem("modul_a_answers");

    if (savedCategories && savedAnswers) {
      const parsedCategories: QuestionCategory[] = JSON.parse(savedCategories);
      const parsedAnswers: Record<string, string> = JSON.parse(savedAnswers);
      
      setCategories(parsedCategories);
      setAnswers(parsedAnswers);

      // Calculate results
      const calcResults = parsedCategories.map(cat => {
        let benar = 0;
        let salah = 0;
        let kosong = 0;

        cat.soal.forEach(q => {
          const userAns = parsedAnswers[q.id];
          if (!userAns) kosong++;
          else if (userAns === q.jawaban_benar) benar++;
          else salah++;
        });

        const total = cat.soal.length;
        // Simple scoring: (benar / total) * 100 for each category
        const skor = Math.round((benar / total) * 100);

        return {
          kategoriId: cat.id,
          benar,
          salah,
          kosong,
          total,
          skor,
          detailJawaban: {} 
        } as TestResult;
      });

      setResults(calcResults);
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center max-w-md">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Data Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-6">Anda belum menyelesaikan simulasi atau data sesi telah kadaluarsa.</p>
        <Button asChild>
          <Link href="/modul-a">Kembali ke Modul A</Link>
        </Button>
      </div>
    );
  }

  const totalSoal = results.reduce((acc, r) => acc + r.total, 0);
  const totalBenar = results.reduce((acc, r) => acc + r.benar, 0);
  const totalSkor = Math.round((totalBenar / totalSoal) * 100);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Hasil Simulasi</h1>
        <p className="text-muted-foreground">Modul Gabungan (Flagship)</p>
        
        <div className="mt-8 inline-flex flex-col items-center justify-center bg-primary/10 rounded-full w-40 h-40 border-8 border-primary/20">
          <span className="text-sm font-medium text-primary mb-1">Skor Total</span>
          <span className="text-5xl font-black text-primary">{totalSkor}</span>
        </div>
      </div>

      {/* Ringkasan Per Kategori */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {results.map((res) => {
          const cat = categories.find(c => c.id === res.kategoriId);
          return (
            <Card key={res.kategoriId} className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{cat?.nama}</CardTitle>
                <CardDescription>Skor: {res.skor}/100</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="mr-1 h-4 w-4" /> Benar: {res.benar}
                  </span>
                  <span className="flex items-center text-destructive">
                    <XCircle className="mr-1 h-4 w-4" /> Salah: {res.salah}
                  </span>
                  <span className="flex items-center text-muted-foreground">
                    <AlertTriangle className="mr-1 h-4 w-4" /> Kosong: {res.kosong}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pembahasan */}
      <h3 className="text-2xl font-bold mb-6">Kunci & Pembahasan</h3>
      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <h4 className="text-lg font-semibold bg-secondary px-4 py-2 rounded-lg">{cat.nama}</h4>
            {cat.soal.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.jawaban_benar;
              
              return (
                <div key={q.id} className="border rounded-xl p-4 md:p-6 bg-card">
                  <div className="flex gap-4">
                    <div className="font-bold text-lg text-muted-foreground">{idx + 1}.</div>
                    <div className="flex-1 space-y-3">
                      <p className="font-medium text-foreground">{q.pertanyaan}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {q.pilihan.map(pil => (
                          <div 
                            key={pil}
                            className={`p-2 rounded border text-sm flex items-center justify-between ${
                              pil === q.jawaban_benar 
                                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-400 font-medium" 
                                : pil === userAns 
                                  ? "bg-destructive/10 border-destructive/50 text-destructive font-medium"
                                  : "border-border text-muted-foreground"
                            }`}
                          >
                            {pil}
                            {pil === q.jawaban_benar && <CheckCircle2 className="h-4 w-4" />}
                            {pil === userAns && pil !== q.jawaban_benar && <XCircle className="h-4 w-4" />}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                        <p className="text-sm font-semibold mb-1">Pembahasan:</p>
                        <p className="text-sm text-muted-foreground">{q.pembahasan}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/modul-a">
            <RotateCcw className="mr-2 h-4 w-4" />
            Ulangi Simulasi
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/">
            Katalog Modul Lainnya
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
