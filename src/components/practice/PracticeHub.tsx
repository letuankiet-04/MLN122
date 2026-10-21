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
        <div className="p-1.5 rounded-2xl bg-[var(--bg-surface)]/80 dark:bg-[var(--bg-page)]/80 backdrop-blur-md border border-[var(--border-color)] dark:border-[var(--border-color)] shadow-sm flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveSubTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
              activeSubTab === 'flashcards'
                ? 'bg-[#682626] text-amber-50 shadow-md shadow-[#682626]/20 ring-1 ring-[#8A6328]/40 dark:bg-[#C2A267] dark:text-[#1B1A18] dark:shadow-[#C2A267]/20 font-bold scale-[1.02]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-[var(--bg-subtle)]/70 dark:hover:bg-[var(--bg-subtle)]'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Thẻ Flashcard SM-2</span>
          </button>

          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
              activeSubTab === 'quiz'
                ? 'bg-[#682626] text-amber-50 shadow-md shadow-[#682626]/20 ring-1 ring-[#8A6328]/40 dark:bg-[#C2A267] dark:text-[#1B1A18] dark:shadow-[#C2A267]/20 font-bold scale-[1.02]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-[var(--bg-subtle)]/70 dark:hover:bg-[var(--bg-subtle)]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Đề thi trắc nghiệm</span>
          </button>

          <button
            onClick={() => setActiveSubTab('recall')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
              activeSubTab === 'recall'
                ? 'bg-[#682626] text-amber-50 shadow-md shadow-[#682626]/20 ring-1 ring-[#8A6328]/40 dark:bg-[#C2A267] dark:text-[#1B1A18] dark:shadow-[#C2A267]/20 font-bold scale-[1.02]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-[var(--bg-subtle)]/70 dark:hover:bg-[var(--bg-subtle)]'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>&quot;Thử giải thích lại&quot;</span>
          </button>

          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
              activeSubTab === 'glossary'
                ? 'bg-[#682626] text-amber-50 shadow-md shadow-[#682626]/20 ring-1 ring-[#8A6328]/40 dark:bg-[#C2A267] dark:text-[#1B1A18] dark:shadow-[#C2A267]/20 font-bold scale-[1.02]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-[var(--bg-subtle)]/70 dark:hover:bg-[var(--bg-subtle)]'
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
