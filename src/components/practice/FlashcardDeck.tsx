import React, { useState, useMemo } from 'react';
import { RotateCw, Check, X, Shuffle, Search, Filter, BookOpen, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIAL_FLASHCARDS } from '../../content/flashcardsData';
import { FlashcardProgress } from '../../stores/useStudyStore';
import { Formula } from '../common/Formula';

interface FlashcardDeckProps {
  flashcardProgress: FlashcardProgress;
  onUpdateReview: (cardId: string, quality: number) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  flashcardProgress,
  onUpdateReview,
  onNavigateToSection,
}) => {
  const [cards, setCards] = useState(INITIAL_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const set = new Set(INITIAL_FLASHCARDS.map(c => c.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchCat = selectedCategory === 'all' || card.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        card.front.toLowerCase().includes(searchQuery.toLowerCase()) || 
        card.back.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [cards, selectedCategory, searchQuery]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleGrade = (quality: number) => {
    if (!currentCard) return;
    onUpdateReview(currentCard.id, quality);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFlipped(false);
    }
  };

  const currentCardProgress = currentCard ? flashcardProgress[currentCard.id] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFD7CA] dark:border-[#383530] pb-5">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8A6328] dark:text-[#C2A267]">
            Ôn tập ngắt quãng (SM-2 Spaced Repetition)
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Thẻ ghi nhớ Flashcards — Lý luận Giá trị thặng dư
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Ghi nhớ định nghĩa, công thức và luận điểm cốt lõi thông qua thuật toán lặp lại thông minh
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#252420] hover:bg-[#EFE8DD] text-stone-700 dark:text-stone-300 flex items-center gap-1.5 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Trộn thẻ</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#682626] text-[#FAF7F0] font-semibold dark:bg-[#C2A267] dark:text-[#1B1A18]'
                  : 'bg-[#EFE8DD] dark:bg-[#2A2824] text-stone-700 dark:text-stone-300 hover:bg-[#E8E0D2]'
              }`}
            >
              {cat === 'all' ? 'Tất cả thẻ' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
            placeholder="Tìm kiếm nội dung thẻ..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#23221F] text-stone-800 dark:text-stone-200"
          />
        </div>
      </div>

      {/* Flashcard Presentation Area */}
      {filteredCards.length === 0 ? (
        <div className="p-12 text-center text-xs text-stone-400 bg-[#FAF7F0] dark:bg-[#23221F] rounded-2xl border border-[#DFD7CA] dark:border-[#383530]">
          Không tìm thấy thẻ ghi nhớ phù hợp với điều kiện lọc.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>
              Thẻ {currentIndex + 1} / {filteredCards.length}
            </span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              Phân loại: {currentCard.category}
            </span>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(prev => !prev)}
            className="cursor-pointer min-h-[300px] sm:min-h-[340px] p-8 sm:p-12 bg-[#FAF7F0] dark:bg-[#23221F] rounded-2xl border border-[#DFD7CA] dark:border-[#383530] shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group select-none"
          >
            {/* Top row */}
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1 font-serif text-[#8A6328] dark:text-[#C2A267]">
                <Sparkles className="w-3.5 h-3.5" />
                {isFlipped ? 'Mặt sau: Giải thích & Đáp án' : 'Mặt trước: Câu hỏi / Khái niệm'}
              </span>
              <span className="text-[11px] bg-[#EFE8DD] dark:bg-[#2A2824] px-2 py-0.5 rounded text-stone-600 dark:text-stone-400">
                Nhấp để lật thẻ
              </span>
            </div>

            {/* Card Content */}
            <div className="my-auto py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-lg sm:text-2xl text-stone-900 dark:text-stone-100 leading-relaxed">
                    {currentCard.front}
                  </h3>
                  {currentCard.formula && (
                    <Formula math={currentCard.formula} block />
                  )}
                </div>
              ) : (
                <div className="space-y-4 text-left max-w-xl mx-auto">
                  <div className="font-serif text-base sm:text-lg font-semibold text-[#682626] dark:text-[#C2A267] leading-relaxed whitespace-pre-line">
                    {currentCard.back}
                  </div>
                  <div className="pt-3 border-t border-[#DFD7CA] dark:border-[#383530] text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    <strong>Giải thích chi tiết:</strong> {currentCard.explanation}
                  </div>
                  {currentCard.formula && (
                    <Formula math={currentCard.formula} block />
                  )}
                </div>
              )}
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-4 border-t border-[#DFD7CA]/70 dark:border-[#383530]/70">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToSection(currentCard.sectionId);
                }}
                className="hover:text-[#682626] dark:hover:text-[#C2A267] transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" />
                <span>Xem mục {currentCard.sectionId} trong giáo trình</span>
              </button>

              <div>
                {currentCardProgress ? (
                  <span>Đã ôn {currentCardProgress.repetitions} lần</span>
                ) : (
                  <span>Thẻ mới</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Ratings & Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-lg border border-[#DFD7CA] dark:border-[#383530] disabled:opacity-30 hover:bg-[#EFE8DD] dark:hover:bg-[#2A2824] text-stone-700 dark:text-stone-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === filteredCards.length - 1}
                className="p-2 rounded-lg border border-[#DFD7CA] dark:border-[#383530] disabled:opacity-30 hover:bg-[#EFE8DD] dark:hover:bg-[#2A2824] text-stone-700 dark:text-stone-300 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* SM-2 Quality Grading Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleGrade(1)}
                className="flex-1 sm:flex-none px-3 py-2 text-xs font-semibold rounded-lg bg-[#8A3333]/10 hover:bg-[#8A3333]/20 text-[#8A3333] dark:text-[#E09B9B] border border-[#8A3333]/25 dark:border-[#8A3333]/40 transition-colors"
                title="Chưa nhớ (Ôn lại sớm)"
              >
                Chưa nhớ
              </button>
              <button
                onClick={() => handleGrade(3)}
                className="flex-1 sm:flex-none px-3 py-2 text-xs font-semibold rounded-lg bg-[#8A6328]/10 hover:bg-[#8A6328]/20 text-[#8A6328] dark:text-[#C2A267] border border-[#8A6328]/25 dark:border-[#C2A267]/40 transition-colors"
                title="Nhớ một phần"
              >
                Nhớ tạm
              </button>
              <button
                onClick={() => handleGrade(5)}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg bg-[#2D5A34]/10 hover:bg-[#2D5A34]/20 text-[#2D5A34] dark:text-[#88B88E] border border-[#2D5A34]/25 dark:border-[#88B88E]/40 transition-colors"
                title="Đã thuộc vững (Tăng khoảng cách ôn)"
              >
                Đã thuộc lòng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
