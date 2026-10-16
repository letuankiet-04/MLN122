import React, { useState } from 'react';
import { Award, Brain, Edit3, Bookmark } from 'lucide-react';
import { FlashcardDeck } from './FlashcardDeck';
import { QuizModule } from './QuizModule';
import { ActiveRecallModule } from './ActiveRecallModule';
import { GlossarySheet } from '../study/GlossarySheet';
import { FlashcardProgress } from '../../stores/useStudyStore';

interface PracticeHubProps {
  flashcardProgress: FlashcardProgress;
  onUpdateReview: (cardId: string, quality: number) => void;
  onAddQuizAttempt: (attempt: {
    topic: string;
    score: number;
    total: number;
    timeSpentSeconds: number;
    incorrectQuestionIds: string[];
  }) => void;
  onSaveActiveRecall: (itemId: string, userAnswer: string, selfRating: 'good' | 'medium' | 'poor') => void;
  activeRecallProgress: Record<string, { userAnswer: string; selfRating: 'good' | 'medium' | 'poor' }>;
  onNavigateToSection: (sectionId: string) => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  flashcardProgress,
  onUpdateReview,
  onAddQuizAttempt,
  onSaveActiveRecall,
  activeRecallProgress,
  onNavigateToSection,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'flashcards' | 'quiz' | 'recall' | 'glossary'>('flashcards');

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="flex border-b border-[#E7E1D6] dark:border-[#383632] gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveSubTab('flashcards')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeSubTab === 'flashcards'
                ? 'border-b-2 border-[#7F1D1D] dark:border-[#E2B765] text-[#7F1D1D] dark:text-[#E2B765]'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Thẻ Flashcard SM-2</span>
          </button>

          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeSubTab === 'quiz'
                ? 'border-b-2 border-[#7F1D1D] dark:border-[#E2B765] text-[#7F1D1D] dark:text-[#E2B765]'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Đề thi trắc nghiệm</span>
          </button>

          <button
            onClick={() => setActiveSubTab('recall')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeSubTab === 'recall'
                ? 'border-b-2 border-[#7F1D1D] dark:border-[#E2B765] text-[#7F1D1D] dark:text-[#E2B765]'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>&quot;Thử giải thích lại&quot;</span>
          </button>

          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeSubTab === 'glossary'
                ? 'border-b-2 border-[#7F1D1D] dark:border-[#E2B765] text-[#7F1D1D] dark:text-[#E2B765]'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bảng thuật ngữ</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Views */}
      {activeSubTab === 'flashcards' && (
        <FlashcardDeck
          flashcardProgress={flashcardProgress}
          onUpdateReview={onUpdateReview}
          onNavigateToSection={onNavigateToSection}
        />
      )}

      {activeSubTab === 'quiz' && (
        <QuizModule
          onAddAttempt={onAddQuizAttempt}
          onNavigateToSection={onNavigateToSection}
        />
      )}

      {activeSubTab === 'recall' && (
        <ActiveRecallModule
          onSaveAttempt={onSaveActiveRecall}
          onNavigateToSection={onNavigateToSection}
          savedProgress={activeRecallProgress}
        />
      )}

      {activeSubTab === 'glossary' && (
        <GlossarySheet
          onNavigateToSection={onNavigateToSection}
        />
      )}
    </div>
  );
};
