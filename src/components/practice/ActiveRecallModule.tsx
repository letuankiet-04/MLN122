import React, { useState } from 'react';
import { Edit3, CheckCircle2, ChevronRight, Eye, RefreshCw, BookOpen, Sparkles, Check } from 'lucide-react';
import { ACTIVE_RECALL_ITEMS } from '../../content/activeRecallData';

interface ActiveRecallModuleProps {
  onSaveAttempt: (itemId: string, userAnswer: string, selfRating: 'good' | 'medium' | 'poor') => void;
  onNavigateToSection: (sectionId: string) => void;
  savedProgress: Record<string, { userAnswer: string; selfRating: 'good' | 'medium' | 'poor' }>;
}

export const ActiveRecallModule: React.FC<ActiveRecallModuleProps> = ({
  onSaveAttempt,
  onNavigateToSection,
  savedProgress,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [selfRating, setSelfRating] = useState<'good' | 'medium' | 'poor' | null>(null);

  const currentItem = ACTIVE_RECALL_ITEMS[currentIndex];
  const previousAttempt = savedProgress[currentItem.id];

  const handleReveal = () => {
    if (!userInput.trim() && !previousAttempt) {
      alert('Vui lòng gõ vài câu giải thích theo cách hiểu của bạn trước khi xem đáp án chuẩn!');
      return;
    }
    setIsRevealed(true);
  };

  const handleRate = (rating: 'good' | 'medium' | 'poor') => {
    setSelfRating(rating);
    onSaveAttempt(currentItem.id, userInput || previousAttempt?.userAnswer || '', rating);
  };

  const handleNext = () => {
    if (currentIndex < ACTIVE_RECALL_ITEMS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setIsRevealed(false);
      setSelfRating(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-[#E7E1D6] dark:border-[#383632] pb-5">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#7F1D1D] dark:text-[#E2B765]">
          Phương pháp học chủ động (Active Recall)
        </span>
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
          &quot;Thử giải thích lại&quot; — Tự diễn đạt bản chất lý luận
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
          Học sâu bằng cách tự viết câu trả lời theo ngôn ngữ của bạn trước khi đối chiếu với chuẩn mực học thuyết Mác
        </p>
      </div>

      {/* Item Card */}
      <div className="p-6 sm:p-8 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-2xl border border-[#E7E1D6] dark:border-[#383632] shadow-sm space-y-6">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Câu hỏi {currentIndex + 1} / {ACTIVE_RECALL_ITEMS.length}</span>
          <span className="text-stone-700 dark:text-stone-300 font-semibold">{currentItem.context}</span>
        </div>

        {/* Question */}
        <div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-snug">
            {currentItem.question}
          </h3>
        </div>

        {/* User Input Area */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
            Cách bạn giải thích vấn đề này như thế nào? (Gõ vào ô bên dưới):
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isRevealed}
            placeholder="Hãy tự trình bày lập luận theo suy nghĩ của bạn: bắt đầu từ đâu, cơ chế ra sao, kết luận thế nào..."
            rows={5}
            className="w-full p-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-[#7F1D1D]"
          />
        </div>

        {/* Action Button: Reveal */}
        {!isRevealed ? (
          <div className="flex justify-end">
            <button
              onClick={handleReveal}
              className="px-6 py-2.5 rounded-lg bg-[#7F1D1D] hover:bg-[#681818] text-white dark:bg-[#B78C45] dark:text-stone-900 font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Đối chiếu với đáp án chuẩn & tiêu chí</span>
            </button>
          </div>
        ) : (
          /* Revealed Model Answer and Rubric */
          <div className="space-y-6 pt-4 border-t border-stone-200 dark:border-stone-700 animate-in fade-in duration-200">
            {/* Model Answer Box */}
            <div className="p-5 rounded-xl border border-[#7F1D1D]/30 dark:border-[#E2B765]/30 bg-[#7F1D1D]/5 dark:bg-[#E2B765]/10 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#7F1D1D] dark:text-[#E2B765] block">
                Đáp án chuẩn xác theo học thuyết C. Mác:
              </span>
              <p className="font-serif text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-relaxed whitespace-pre-line">
                {currentItem.modelAnswer}
              </p>
            </div>

            {/* Rubric Criteria */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block">
                Tiêu chí chấm điểm tự đánh giá (Rubric):
              </span>
              <div className="space-y-1.5">
                {currentItem.criteria.map((cr, i) => (
                  <div
                    key={i}
                    className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-lg border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{cr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Self Rating Bar */}
            <div className="p-4 bg-stone-100/70 dark:bg-stone-800/50 rounded-xl space-y-3">
              <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block text-center">
                Bạn tự đánh giá mức độ hiểu của mình sau khi đối chiếu:
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleRate('poor')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selfRating === 'poor'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-rose-50'
                  }`}
                >
                  Còn thiếu sót nhiều (Cần đọc lại)
                </button>
                <button
                  onClick={() => handleRate('medium')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selfRating === 'medium'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-amber-50'
                  }`}
                >
                  Hiểu được 60 - 70% ý chính
                </button>
                <button
                  onClick={() => handleRate('good')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selfRating === 'good'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-emerald-50'
                  }`}
                >
                  Hiểu rất vững và đầy đủ
                </button>
              </div>
            </div>

            {/* Section Link & Next button */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onNavigateToSection(currentItem.sectionId)}
                className="text-xs text-[#7F1D1D] dark:text-[#E2B765] hover:underline flex items-center gap-1 font-semibold"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Đọc lại mục {currentItem.sectionId} trong giáo trình</span>
              </button>

              {currentIndex < ACTIVE_RECALL_ITEMS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 flex items-center gap-1.5"
                >
                  <span>Câu hỏi tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Đã hoàn thành toàn bộ 5 câu thử giải thích lại!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
