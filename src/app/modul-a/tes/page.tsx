"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clock, BrainCircuit, Zap, Target, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import modulAData from "@/data/modul-a.json";
import { QuestionCategory } from "@/types";

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

  const finishTest = useCallback(() => {
    // Save results to localStorage or state management
    localStorage.setItem("modul_a_answers", JSON.stringify(answers));
    localStorage.setItem("modul_a_categories", JSON.stringify(categories));
    router.push("/modul-a/hasil");
  }, [answers, categories, router]);

  const handleNextCategory = useCallback(() => {
    if (currentCategoryIndex < categories.length - 1) {
      const nextIdx = currentCategoryIndex + 1;
      setCurrentCategoryIndex(nextIdx);
      setCurrentQuestionIndex(0);
      setTimeLeft(categories[nextIdx].waktu_menit * 60);
    } else {
      finishTest();
    }
  }, [currentCategoryIndex, categories, finishTest]);

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
  }, [isLoaded, timeLeft, handleNextCategory]);

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-xl bg-primary/20 p-4"
        >
          <BrainCircuit className="h-10 w-10 text-primary" />
        </motion.div>
      </div>
    );
  }

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = currentCategory.soal[currentQuestionIndex];
  const isLastQuestionInTest = 
    currentCategoryIndex === categories.length - 1 && 
    currentQuestionIndex === currentCategory.soal.length - 1;

  const progressPercentage = ((currentQuestionIndex + 1) / currentCategory.soal.length) * 100;
  const isTimeLow = timeLeft < 60;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center py-6 px-4">
      {/* Background ambient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl mix-blend-screen filter animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl mix-blend-screen filter animate-blob" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col h-full">
        {/* Header HUD */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full mb-8 bg-card/40 backdrop-blur-xl border border-border/50 p-4 rounded-3xl premium-shadow">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-fuchsia-500">
                {currentCategory.nama}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Level {currentCategoryIndex + 1}</span>
                <span className="opacity-50">•</span>
                <span>Tantangan {currentQuestionIndex + 1}/{currentCategory.soal.length}</span>
              </div>
            </div>
          </div>

          <motion.div 
            animate={isTimeLow ? { scale: [1, 1.05, 1], color: ["#ef4444", "#f87171", "#ef4444"] } : {}}
            transition={{ duration: 0.5, repeat: isTimeLow ? Infinity : 0 }}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-mono text-2xl font-black border-2 shadow-lg ${
              isTimeLow 
                ? 'bg-destructive/10 border-destructive/50 text-destructive' 
                : 'bg-background border-primary/20 text-foreground'
            }`}
          >
            <Clock className={`h-6 w-6 ${isTimeLow ? 'animate-pulse' : 'text-primary'}`} />
            {formatTime(timeLeft)}
          </motion.div>
        </div>

        {/* HP Bar / Progress Bar */}
        <div className="w-full mb-10 px-2">
          <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2 px-1 uppercase tracking-wider">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-secondary h-3 rounded-full overflow-hidden border border-border/50 p-[2px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary via-indigo-500 to-fuchsia-500 h-full rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ animation: "pulse-glow 2s infinite" }}></div>
            </motion.div>
          </div>
        </div>

        {/* Main Play Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex-1 flex flex-col items-center w-full"
          >
            {/* Question Text */}
            <div className="w-full text-center mb-10 px-4 md:px-12">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-foreground drop-shadow-sm">
                {currentQuestion.pertanyaan}
              </h3>
            </div>

            {/* Answer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {currentQuestion.pilihan.map((pilihan, idx) => {
                const isSelected = answers[currentQuestion.id] === pilihan;
                const letter = String.fromCharCode(65 + idx);
                
                return (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    key={idx}
                    onClick={() => handleAnswer(currentQuestion.id, pilihan)}
                    className={`relative overflow-hidden flex items-center p-5 rounded-2xl border-2 transition-all duration-300 text-left min-h-[90px] ${
                      isSelected 
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(99,102,241,0.3)] z-10" 
                        : "border-border/50 bg-card/60 hover:border-primary/50 hover:bg-secondary/40 backdrop-blur-sm"
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="selected-outline"
                        className="absolute inset-0 border-2 border-primary rounded-2xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <div className={`flex shrink-0 items-center justify-center w-12 h-12 rounded-xl text-lg font-black mr-4 transition-colors ${
                      isSelected 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {letter}
                    </div>
                    
                    <span className={`text-lg md:text-xl font-medium ${isSelected ? "text-primary dark:text-primary-foreground" : "text-foreground"}`}>
                      {pilihan}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Action Area */}
            <motion.div 
              className="mt-12 w-full flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion.id]}
                size="lg"
                className={`rounded-full px-8 py-6 text-lg font-bold shadow-xl transition-all ${
                  answers[currentQuestion.id] 
                    ? "hover:scale-105 glow-border" 
                    : "opacity-50 grayscale"
                }`}
              >
                {isLastQuestionInTest ? "Selesaikan Misi" : "Kunci Jawaban"}
                {!isLastQuestionInTest && <Zap className="ml-2 h-5 w-5" />}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
