"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ChevronRight, AlertCircle } from "lucide-react";
import modulAData from "@/data/modul-a.json";
import { QuestionCategory, Question } from "@/types";

// Utility to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function ModulATest() {
  const router = useRouter();
  
  // States
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize and shuffle questions
  useEffect(() => {
    const shuffledCategories = modulAData.map(cat => ({
      ...cat,
      soal: shuffleArray(cat.soal)
    }));
    setCategories(shuffledCategories);
    setTimeLeft(shuffledCategories[0]?.waktu_menit * 60 || 0);
    setIsLoaded(true);
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isLoaded || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextCategory();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoaded, timeLeft, currentCategoryIndex]);

  const handleNextCategory = useCallback(() => {
    if (currentCategoryIndex < categories.length - 1) {
      const nextIdx = currentCategoryIndex + 1;
      setCurrentCategoryIndex(nextIdx);
      setCurrentQuestionIndex(0);
      setTimeLeft(categories[nextIdx].waktu_menit * 60);
    } else {
      finishTest();
    }
  }, [currentCategoryIndex, categories]);

  const finishTest = useCallback(() => {
    // Save results to localStorage or state management
    localStorage.setItem("modul_a_answers", JSON.stringify(answers));
    localStorage.setItem("modul_a_categories", JSON.stringify(categories));
    router.push("/modul-a/hasil");
  }, [answers, categories, router]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentCategoryIndex === -1) return;
    
    const category = categories[currentCategoryIndex];
    if (currentQuestionIndex < category.soal.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleNextCategory();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!isLoaded || categories.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = currentCategory.soal[currentQuestionIndex];
  const isLastQuestionInTest = 
    currentCategoryIndex === categories.length - 1 && 
    currentQuestionIndex === currentCategory.soal.length - 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">{currentCategory.nama}</h2>
          <p className="text-sm text-muted-foreground">
            Soal {currentQuestionIndex + 1} dari {currentCategory.soal.length}
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-semibold ${timeLeft < 60 ? 'bg-destructive/10 text-destructive animate-pulse' : 'bg-primary/10 text-primary'}`}>
          <Clock className="h-5 w-5" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-300" 
          style={{ width: `${((currentQuestionIndex + 1) / currentCategory.soal.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <Card className="mb-6 border-border/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed font-medium">
            {currentQuestion.pertanyaan}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.pilihan.map((pilihan, idx) => {
            const isSelected = answers[currentQuestion.id] === pilihan;
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion.id, pilihan)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected 
                    ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm" 
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                    isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={isSelected ? "font-medium text-foreground" : "text-foreground/90"}>
                    {pilihan}
                  </span>
                </div>
              </button>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <AlertCircle className="h-4 w-4" /> 
            Waktu akan otomatis pindah jika habis
          </p>
          <Button 
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestion.id]}
            className="min-w-[120px]"
          >
            {isLastQuestionInTest ? "Selesai Tes" : "Selanjutnya"}
            {!isLastQuestionInTest && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Category Progress indicator */}
      <div className="flex gap-2 mt-8 overflow-x-auto pb-2">
        {categories.map((cat, idx) => (
          <div 
            key={cat.id} 
            className={`flex-shrink-0 h-1 rounded-full flex-1 ${
              idx < currentCategoryIndex ? "bg-primary" : 
              idx === currentCategoryIndex ? "bg-primary/50" : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
