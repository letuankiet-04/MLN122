import React from 'react';
import { BookOpen, CheckCircle, TrendingUp, Award, Clock, Flame, Brain, ArrowRight } from 'lucide-react';
import { CHAPTER_SECTIONS } from '../../content/chaptersData';
import { INITIAL_FLASHCARDS } from '../../content/flashcardsData';
import { FlashcardProgress, QuizAttempt } from '../../stores/useStudyStore';

interface LearningDashboardProps {
  completedSections: string[];
  bookmarks: string[];
  flashcardProgress: FlashcardProgress;
  quizHistory: QuizAttempt[];
  streakCount: number;
  onNavigateToSection: (sectionId: string) => void;
  onSelectTab: (tab: 'reader' | 'simulators' | 'practice' | 'notes') => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({
  completedSections,
  bookmarks,
  flashcardProgress,
  quizHistory,
  streakCount,
  onNavigateToSection,
  onSelectTab,
}) => {
  const totalSections = CHAPTER_SECTIONS.length;
  const completedCount = completedSections.length;
  const progressPercent = Math.round((completedCount / totalSections) * 100);

  const totalCards = INITIAL_FLASHCARDS.length;
  const reviewedCardsCount = Object.keys(flashcardProgress).length;

  const totalQuizzes = quizHistory.length;
  const totalQuestionsAnswered = quizHistory.reduce((acc, q) => acc + q.total, 0);
  const totalCorrect = quizHistory.reduce((acc, q) => acc + q.score, 0);
  const averageAccuracy = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrect / totalQuestionsAnswered) * 100) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFD7CA] dark:border-[#383530] pb-5">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8A6328] dark:text-[#C2A267]">
            Bảng điều khiển tiến trình học
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Hồ sơ học tập & Phân tích năng lực
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Tổng hợp dữ liệu thực tế về tiến độ đọc sách, thẻ ghi nhớ và kết quả làm bài tập trắc nghiệm
          </p>
        </div>

        {/* Streak Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#967338]/10 dark:bg-[#C2A267]/15 rounded-lg text-xs font-semibold text-[#8A6328] dark:text-[#C2A267] self-start sm:self-center">
          <Flame className="w-4 h-4 fill-current text-amber-500" />
          <span>{streakCount} ngày học liên tục</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Reading completion */}
        <div className="p-4 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xs space-y-1">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Tiến độ giáo trình</span>
          <div className="text-2xl font-serif font-bold text-[#682626] dark:text-[#C2A267] tabular-nums">
            {progressPercent}%
          </div>
          <span className="text-[11px] text-stone-400 block">
            {completedCount} / {totalSections} mục hoàn thành
          </span>
        </div>

        {/* Metric 2: Flashcards */}
        <div className="p-4 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xs space-y-1">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Thẻ Flashcard đã ôn</span>
          <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {reviewedCardsCount} / {totalCards}
          </div>
          <span className="text-[11px] text-stone-400 block">
            {Math.round((reviewedCardsCount / totalCards) * 100)}% bộ thẻ
          </span>
        </div>

        {/* Metric 3: Quiz accuracy */}
        <div className="p-4 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xs space-y-1">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Độ chính xác trắc nghiệm</span>
          <div className="text-2xl font-serif font-bold text-[#2D5A34] dark:text-[#88B88E] tabular-nums">
            {averageAccuracy}%
          </div>
          <span className="text-[11px] text-stone-400 block">
            {totalCorrect} / {totalQuestionsAnswered} câu đúng
          </span>
        </div>

        {/* Metric 4: Quiz sessions */}
        <div className="p-4 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xs space-y-1">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Số lần làm bài kiểm tra</span>
          <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {totalQuizzes}
          </div>
          <span className="text-[11px] text-stone-400 block">Lượt thi thử</span>
        </div>
      </div>

      {/* Chapters Completion Checklist */}
      <div className="p-6 bg-[#FAF7F0] dark:bg-[#23221F] rounded-2xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#682626] dark:text-[#C2A267]" />
            <span>Mục lục tiến độ đọc sách Chương 3</span>
          </h3>
          <button
            onClick={() => onSelectTab('reader')}
            className="text-xs text-[#682626] dark:text-[#C2A267] hover:underline font-semibold"
          >
            Mở sách đọc ngay
          </button>
        </div>

        <div className="divide-y divide-[#DFD7CA]/50 dark:divide-[#383530]/50">
          {CHAPTER_SECTIONS.map((sec) => {
            const isDone = completedSections.includes(sec.id);

            return (
              <div
                key={sec.id}
                className="py-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-[#2D5A34] text-white' : 'border border-[#DFD7CA] dark:border-[#383530] text-stone-400'
                  }`}>
                    {isDone ? <CheckCircle className="w-3.5 h-3.5" /> : null}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 font-serif">
                      {sec.number}. {sec.title}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                      {sec.estimatedMinutes} phút đọc · {sec.summary.slice(0, 80)}...
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToSection(sec.id)}
                  className="px-3 py-1 rounded text-[11px] border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#252420] hover:bg-[#EFE8DD] text-stone-700 dark:text-stone-300 whitespace-nowrap shrink-0"
                >
                  {isDone ? 'Đọc lại' : 'Bắt đầu đọc'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz History Table */}
      <div className="p-6 bg-[#FAF7F0] dark:bg-[#23221F] rounded-2xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2D5A34] dark:text-[#88B88E]" />
            <span>Lịch sử kiểm tra gần đây</span>
          </h3>
          <button
            onClick={() => onSelectTab('practice')}
            className="text-xs text-[#682626] dark:text-[#C2A267] hover:underline font-semibold"
          >
            Làm bài thi mới
          </button>
        </div>

        {quizHistory.length === 0 ? (
          <div className="p-6 text-center text-xs text-stone-400">
            Chưa có lượt thi nào. Hãy thử sức với bài kiểm tra trắc nghiệm đầu tiên!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#EFE8DD] dark:bg-[#2A2824] text-stone-700 dark:text-stone-300 font-semibold border-b border-[#DFD7CA] dark:border-[#383530]">
                <tr>
                  <th className="py-2.5 px-3">Thời gian</th>
                  <th className="py-2.5 px-3">Chủ đề bài thi</th>
                  <th className="py-2.5 px-3">Điểm số</th>
                  <th className="py-2.5 px-3">Độ chính xác</th>
                  <th className="py-2.5 px-3">Thời gian làm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFD7CA]/40 dark:divide-[#383530]/40">
                {quizHistory.map((q) => {
                  const pct = Math.round((q.score / q.total) * 100);

                  return (
                    <tr key={q.id} className="hover:bg-[#EFE8DD]/40 dark:hover:bg-[#2A2824]/40">
                      <td className="py-2.5 px-3 text-stone-500 whitespace-nowrap">
                        {new Date(q.timestamp).toLocaleDateString('vi-VN')} {new Date(q.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-stone-900 dark:text-stone-100">
                        {q.topic}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-stone-900 dark:text-stone-100">
                        {q.score}/{q.total}
                      </td>
                      <td className="py-2.5 px-3 font-mono">
                        <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                          pct >= 80
                            ? 'bg-[#EDF3EC] dark:bg-[#1E2820] text-[#25462A] dark:text-[#88B88E]'
                            : pct >= 50
                            ? 'bg-[#F5EFE0] dark:bg-[#2A271E] text-[#5A451E] dark:text-[#CBB27A]'
                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                        }`}>
                          {pct}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-stone-500 font-mono">
                        {Math.floor(q.timeSpentSeconds / 60)}p {q.timeSpentSeconds % 60}s
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
