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
      <div className="border-b border-[#DFD7CA] dark:border-[#383530] pb-5">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#8A6328] dark:text-[#C2A267]">
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
      <div className="p-6 sm:p-8 bg-[#FAF7F0] dark:bg-[#23221F] rounded-2xl border border-[#DFD7CA] dark:border-[#383530] shadow-sm space-y-6">
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
            className="w-full p-4 rounded-xl border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0]/60 dark:bg-[#282723] text-stone-900 dark:text-stone-100 text-xs sm:text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-[#682626] dark:focus:ring-[#C2A267]"
          />
        </div>

        {/* Action Button: Reveal */}
        {!isRevealed ? (
          <div className="flex justify-end">
            <button
              onClick={handleReveal}
              className="px-6 py-2.5 rounded-lg bg-[#682626] hover:bg-[#541E1E] text-[#FAF7F0] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] dark:text-[#1B1A18] font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Đối chiếu với đáp án chuẩn & tiêu chí</span>
            </button>
          </div>
        ) : (
          /* Revealed Model Answer and Rubric */
          <div className="space-y-6 pt-4 border-t border-[#DFD7CA] dark:border-[#383530] animate-in fade-in duration-200">
            {/* Model Answer Box */}
            <div className="p-5 rounded-xl border border-[#682626]/25 dark:border-[#C2A267]/35 bg-[#682626]/5 dark:bg-[#C2A267]/10 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#682626] dark:text-[#C2A267] block">
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
                    className="p-3 bg-[#EFE8DD]/70 dark:bg-[#2A2824] rounded-lg border border-[#DFD7CA] dark:border-[#383530] flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300"
                  >
                    <Check className="w-4 h-4 text-[#2D5A34] dark:text-[#88B88E] shrink-0 mt-0.5" />
                    <span>{cr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Self Rating Bar */}
            <div className="p-4 bg-[#EFE8DD]/60 dark:bg-[#2A2824]/80 rounded-xl border border-[#DFD7CA] dark:border-[#383530] space-y-3">
              <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block text-center">
                Bạn tự đánh giá mức độ hiểu của mình sau khi đối chiếu:
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleRate('poor')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selfRating === 'poor'
                      ? 'bg-[#8A3333] text-white border-[#8A3333]'
                      : 'bg-[#FAF7F0] dark:bg-[#252420] border-[#DFD7CA] dark:border-[#383530] text-stone-700 dark:text-stone-300 hover:bg-[#8A3333]/10'
                  }`}
                >
                  Còn thiếu sót nhiều (Cần đọc lại)
                </button>
                <button
                  onClick={() => handleRate('medium')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selfRating === 'medium'
                      ? 'bg-[#8A6328] text-white border-[#8A6328]'
                      : 'bg-[#FAF7F0] dark:bg-[#252420] border-[#DFD7CA] dark:border-[#383530] text-stone-700 dark:text-stone-300 hover:bg-[#8A6328]/10'
                  }`}
                >
                  Hiểu được 60 - 70% ý chính
                </button>
                <button
                  onClick={() => handleRate('good')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selfRating === 'good'
                      ? 'bg-[#2D5A34] text-white border-[#2D5A34]'
                      : 'bg-[#FAF7F0] dark:bg-[#252420] border-[#DFD7CA] dark:border-[#383530] text-stone-700 dark:text-stone-300 hover:bg-[#2D5A34]/10'
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
                className="text-xs text-[#682626] dark:text-[#C2A267] hover:underline flex items-center gap-1 font-semibold"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Đọc lại mục {currentItem.sectionId} trong giáo trình</span>
              </button>

              {currentIndex < ACTIVE_RECALL_ITEMS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#682626] text-[#FAF7F0] dark:bg-[#C2A267] dark:text-[#1B1A18] flex items-center gap-1.5 transition-colors"
                >
                  <span>Câu hỏi tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs font-semibold text-[#2D5A34] dark:text-[#88B88E]">
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
