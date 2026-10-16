import React from 'react';
import { BookOpen, Sparkles, Flame, CheckCircle, Award, FileText, ArrowRight, BookMarked, Layers, Brain } from 'lucide-react';
import { CHAPTER_INFO, CHAPTER_SECTIONS } from '../../content/chaptersData';
import { INITIAL_FLASHCARDS } from '../../content/flashcardsData';
import { FlashcardProgress, QuizAttempt } from '../../stores/useStudyStore';

interface BookLibraryProps {
  currentSectionId: string;
  completedSections: string[];
  bookmarks: string[];
  notesCount: number;
  streakCount: number;
  flashcardProgress: FlashcardProgress;
  quizHistory: QuizAttempt[];
  onSelectTab: (tab: 'reader' | 'simulators' | 'practice' | 'notes' | 'dashboard') => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const BookLibrary: React.FC<BookLibraryProps> = ({
  currentSectionId,
  completedSections,
  bookmarks,
  notesCount,
  streakCount,
  flashcardProgress,
  quizHistory,
  onSelectTab,
  onNavigateToSection,
}) => {
  const currentSection = CHAPTER_SECTIONS.find(s => s.id === currentSectionId) || CHAPTER_SECTIONS[0];
  const totalSections = CHAPTER_SECTIONS.length;
  const progressPercent = Math.round((completedSections.length / totalSections) * 100);

  const totalQuestions = quizHistory.reduce((a, b) => a + b.total, 0);
  const correctQuestions = quizHistory.reduce((a, b) => a + b.score, 0);
  const quizAccuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

  const cardsReviewed = Object.keys(flashcardProgress).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Bookshelf Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78C45]/15 dark:bg-[#B78C45]/20 text-[#7F1D1D] dark:text-[#E2B765] rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sách giáo trình kỹ thuật số tương tác cao</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          MARX STUDY
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-serif italic">
          &quot;{CHAPTER_INFO.title}&quot; — Nền tảng học tập & ôn luyện chuyên sâu học phần Kinh tế chính trị Mác – Lênin
        </p>
      </div>

      {/* Featured Book Showcase Card */}
      <div className="p-6 sm:p-8 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-2xl border border-[#E7E1D6] dark:border-[#383632] shadow-sm flex flex-col md:flex-row gap-8 items-center">
        {/* Scholarly Illustrated Book Cover */}
        <div className="w-56 sm:w-64 shrink-0 aspect-3/4 rounded-xl bg-gradient-to-br from-[#7F1D1D] via-[#681818] to-[#450A0A] p-6 text-white shadow-xl border border-[#B78C45]/40 flex flex-col justify-between relative overflow-hidden group select-none">
          {/* Subtle gold ornamentation borders */}
          <div className="absolute inset-2 border border-[#B78C45]/30 rounded pointer-events-none" />
          <div className="absolute top-0 right-8 w-4 h-12 bg-[#B78C45] rounded-b shadow-md" />

          {/* Book Spine Simulation */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 border-r border-white/10" />

          <div className="pt-2 pl-2 z-10">
            <span className="text-[10px] uppercase tracking-widest text-[#E2B765] font-semibold block">
              GIÁO TRÌNH ĐẠI HỌC
            </span>
            <div className="text-xs text-stone-200 mt-1 font-serif">
              {CHAPTER_INFO.course}
            </div>
          </div>

          <div className="pl-2 my-auto z-10">
            <h3 className="font-serif font-bold text-lg leading-snug text-[#FFFDF8] tracking-wide">
              {CHAPTER_INFO.code}
            </h3>
            <p className="text-xs text-amber-200/90 font-serif italic mt-1 leading-relaxed">
              Giá trị thặng dư trong nền kinh tế thị trường
            </p>
          </div>

          <div className="pl-2 z-10 flex items-center justify-between text-[10px] text-stone-300 border-t border-[#B78C45]/30 pt-2">
            <span>HỌC THUYẾT C. MÁC</span>
            <span className="text-[#E2B765] font-mono">6 MỤC</span>
          </div>
        </div>

        {/* Book Details and Action Deck */}
        <div className="flex-1 space-y-5 text-left w-full">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>{CHAPTER_INFO.course}</span>
              <span>·</span>
              <span>Thời lượng ước tính: {CHAPTER_INFO.estimatedHours}</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {CHAPTER_INFO.code}: {CHAPTER_INFO.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {CHAPTER_INFO.overview}
            </p>
          </div>

          {/* Last Studied Section Banner */}
          <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Bài đang học dở</span>
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                {currentSection.number}. {currentSection.title}
              </span>
            </div>
            <button
              onClick={() => {
                onNavigateToSection(currentSection.id);
                onSelectTab('reader');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-[#7F1D1D] dark:text-[#E2B765] hover:bg-[#7F1D1D]/10 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <span>Tiếp tục đọc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs text-stone-500 mb-1.5">
              <span>Tiến độ hoàn thành nội dung</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                {completedSections.length}/{totalSections} bài ({progressPercent}%)
              </span>
            </div>
            <div className="h-2 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-[#7F1D1D] dark:bg-[#E2B765] transition-all duration-300"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                onNavigateToSection(currentSection.id);
                onSelectTab('reader');
              }}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#7F1D1D] hover:bg-[#681818] text-white dark:bg-[#B78C45] dark:hover:bg-[#9E7535] dark:text-stone-900 transition-colors shadow-xs flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Tiếp tục đọc sách</span>
            </button>

            <button
              onClick={() => onSelectTab('practice')}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 text-stone-800 dark:text-stone-200 transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-[#B78C45]" />
              <span>Luyện đề trắc nghiệm</span>
            </button>

            <button
              onClick={() => onSelectTab('simulators')}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 text-stone-800 dark:text-stone-200 transition-colors flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Mô phỏng tương tác</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Statistics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-2xs">
          <div className="flex items-center gap-1.5 text-amber-600 mb-1">
            <Flame className="w-4 h-4 fill-current" />
            <span className="text-xs font-semibold">Chuỗi ngày học</span>
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {streakCount} ngày
          </div>
          <span className="text-[11px] text-stone-400">Duy trì thói quen đọc</span>
        </div>

        <div className="p-4 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-2xs">
          <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-semibold">Bài đã hoàn thành</span>
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {completedSections.length} / {totalSections}
          </div>
          <span className="text-[11px] text-stone-400">Mục lý luận</span>
        </div>

        <div className="p-4 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-2xs">
          <div className="flex items-center gap-1.5 text-[#7F1D1D] dark:text-[#E2B765] mb-1">
            <Brain className="w-4 h-4" />
            <span className="text-xs font-semibold">Thẻ Flashcard đã ôn</span>
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {cardsReviewed} / {INITIAL_FLASHCARDS.length}
          </div>
          <span className="text-[11px] text-stone-400">Thuật toán SM-2</span>
        </div>

        <div className="p-4 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-2xs">
          <div className="flex items-center gap-1.5 text-sky-600 mb-1">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-semibold">Ghi chú & Đánh dấu</span>
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {notesCount} ghi chép
          </div>
          <span className="text-[11px] text-stone-400">{bookmarks.length} mục đánh dấu</span>
        </div>
      </div>

      {/* Chapter Syllabus Outline */}
      <div className="p-6 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-2xl border border-[#E7E1D6] dark:border-[#383632] shadow-2xs space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
          Chương trình học tập chi tiết (Toàn bộ 6 mục lý luận)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHAPTER_SECTIONS.map((sec) => {
            const isCompleted = completedSections.includes(sec.id);

            return (
              <div
                key={sec.id}
                onClick={() => {
                  onNavigateToSection(sec.id);
                  onSelectTab('reader');
                }}
                className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-700/80 hover:border-[#7F1D1D]/40 hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-all cursor-pointer flex items-start gap-3 group"
              >
                <span className="font-mono text-xs font-bold text-[#7F1D1D] dark:text-[#E2B765] mt-0.5">
                  {sec.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 group-hover:text-[#7F1D1D] dark:group-hover:text-[#E2B765] truncate">
                    {sec.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {sec.subtitle || sec.summary}
                  </p>
                </div>
                {isCompleted && (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
