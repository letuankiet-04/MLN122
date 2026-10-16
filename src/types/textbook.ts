export type ReaderTheme = 'paper' | 'sepia' | 'dark' | 'focus';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type ContentWidth = 'normal' | 'wide' | 'full';

export interface ReaderSettings {
  theme: ReaderTheme;
  fontSize: FontSize;
  lineHeight: 'normal' | 'relaxed' | 'loose';
  contentWidth: ContentWidth;
  fontFamily: 'serif' | 'sans';
}

export interface LearningObjective {
  id: string;
  text: string;
}

export interface TextbookSection {
  id: string; // e.g. '3.1.1'
  title: string;
  subtitle?: string;
  chapterId: string;
  estimatedMinutes: number;
  objectives: string[];
  contentHtml?: string; // Rich content paragraphs
  subsections?: TextbookSubsection[];
}

export interface TextbookSubsection {
  id: string;
  title: string;
  content: string;
  category?: 'theory' | 'example' | 'application' | 'summary';
}

export interface Highlight {
  id: string;
  sectionId: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'rose';
  note?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  sectionId: string;
  sectionTitle: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  englishTerm?: string;
  symbol?: string;
  definition: string;
  explanation: string;
  formula?: string;
  relatedSectionId: string;
  category: 'core' | 'capital' | 'methods' | 'circulation' | 'modern';
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  explanation: string;
  formula?: string;
  category: 'Khái niệm' | 'Công thức' | 'Phân biệt phạm trù' | 'Điều kiện' | 'Bản chất' | 'Ví dụ tính toán' | 'Phương pháp sản xuất' | 'Liên hệ thực tiễn';
  sectionId: string;
  // SM-2 Spaced Repetition fields
  repetitions: number;
  interval: number; // in days
  easeFactor: number;
  dueDate: string; // ISO date
  lastReviewed?: string;
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'calculation' | 'short-answer';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  topic: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  sectionId: string;
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  rubric?: string[]; // For short-answer self-assessment
  calculationSteps?: string[];
}

export interface ActiveRecallItem {
  id: string;
  question: string;
  context: string;
  sectionId: string;
  modelAnswer: string;
  criteria: string[];
}

export interface StudySession {
  date: string;
  minutes: number;
  sectionsRead: string[];
  quizzesTaken: number;
  correctAnswers: number;
}
