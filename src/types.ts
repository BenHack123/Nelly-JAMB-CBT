export interface Question {
  id: string;
  subject: 'English' | 'Physics' | 'Biology' | 'Chemistry';
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  dateRegistered: string;
  isAdmin?: boolean;
}

export interface ExamAttempt {
  id: string;
  userId: string;
  userEmail: string;
  score: number;
  totalQuestions: number;
  subjectBreakdown: {
    English: { correct: number; total: number };
    Physics: { correct: number; total: number };
    Biology: { correct: number; total: number };
    Chemistry: { correct: number; total: number };
  };
  answers: Record<string, string>;
  dateTaken: string;
  timeTaken: number; // seconds spent
}

export type SubjectName = 'English' | 'Physics' | 'Biology' | 'Chemistry';
