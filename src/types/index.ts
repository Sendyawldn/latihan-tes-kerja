export interface Question {
  id: string;
  pertanyaan: string;
  pilihan: string[];
  jawaban_benar: string;
  pembahasan: string;
}

export interface QuestionCategory {
  id: string;
  nama: string;
  deskripsi: string;
  waktu_menit: number;
  soal: Question[];
}

export interface TestResult {
  kategoriId: string;
  benar: number;
  salah: number;
  kosong: number;
  total: number;
  skor: number;
  detailJawaban: Record<string, string>; // questionId -> selectedAnswer
}
