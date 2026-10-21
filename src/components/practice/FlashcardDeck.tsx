import React, { useState, useMemo, useEffect } from 'react';
import { RotateCw, Check, X, Shuffle, Search, Filter, BookOpen, Sparkles, ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';
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

  // Keyboard navigation for power users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '1') {
        handleGrade(1);
      } else if (e.key === '2' || e.key === '3') {
        handleGrade(3);
      } else if (e.key === '4' || e.key === '5') {
        handleGrade(5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredCards, currentCard, isFlipped]);

  const currentCardProgress = currentCard ? flashcardProgress[currentCard.id] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] dark:border-[var(--border-color)] pb-5">
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
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300 flex items-center gap-1.5 transition-colors shadow-2xs"
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
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#682626] text-[#FAF7F0] font-semibold dark:bg-[#C2A267] dark:text-[#1B1A18] shadow-xs'
                  : 'bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300 hover:bg-[var(--bg-subtle)]'
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
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] text-stone-800 dark:text-stone-200"
          />
        </div>
      </div>

      {/* Flashcard Presentation Area */}
      {filteredCards.length === 0 ? (
        <div className="p-12 text-center text-xs text-stone-400 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] dark:border-[var(--border-color)]">
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

          {/* 3D Flip Card Container */}
          <div className="perspective-1000 w-full min-h-[320px] sm:min-h-[360px]">
            <div
              onClick={() => setIsFlipped(prev => !prev)}
              className={`w-full h-full min-h-[320px] sm:min-h-[360px] preserve-3d transition-transform duration-500 cursor-pointer relative select-none ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT FACE */}
              <div className="absolute inset-0 backface-hidden p-8 sm:p-12 bg-gradient-to-br from-[#FAF7F0] to-[#F5EFE3] dark:from-[#23221F] dark:to-[#1C1B18] rounded-2xl border border-[var(--border-color)] dark:border-[#3E3A33] shadow-md hover:shadow-xl hover:border-[#8A6328]/50 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 font-serif text-[#8A6328] dark:text-[#C2A267] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mặt trước: Khái niệm / Câu hỏi</span>
                  </span>
                  <span className="text-[11px] bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] px-2 py-0.5 rounded text-stone-600 dark:text-stone-300 font-mono">
                    Bấm hoặc ấn [Space] để lật
                  </span>
                </div>

                <div className="my-auto py-6 text-center space-y-3">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 leading-relaxed">
                    {currentCard.front}
                  </h3>
                  {currentCard.formula && (
                    <Formula math={currentCard.formula} block />
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-4 border-t border-[var(--border-color)]/70 dark:border-[var(--border-color)]/70">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToSection(currentCard.sectionId);
                    }}
                    className="hover:text-[#682626] dark:hover:text-[#C2A267] transition-colors flex items-center gap-1 font-medium"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Xem mục {currentCard.sectionId} trong giáo trình</span>
                  </button>
                  <span>{currentCardProgress ? `Đã ôn ${currentCardProgress.repetitions} lần` : 'Thẻ mới'}</span>
                </div>
              </div>

              {/* BACK FACE */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 sm:p-12 bg-gradient-to-br from-[#FFFDF9] to-[#FAF5EB] dark:from-[#262420] dark:to-[#1E1D1A] rounded-2xl border-2 border-[#8A6328]/40 dark:border-[#C2A267]/50 shadow-lg flex flex-col justify-between text-left">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 font-serif text-[#682626] dark:text-[#C2A267] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mặt sau: Định nghĩa chuẩn & Giải thích</span>
                  </span>
                  <span className="text-[11px] bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] px-2 py-0.5 rounded text-stone-600 dark:text-stone-300 font-mono">
                    Bấm để lật lại
                  </span>
                </div>

                <div className="my-auto py-4 space-y-3.5 max-w-2xl">
                  <div className="font-serif text-base sm:text-lg font-bold text-[#682626] dark:text-[#C2A267] leading-relaxed whitespace-pre-line border-l-2 border-[#682626] dark:border-[#C2A267] pl-3 py-0.5">
                    {currentCard.back}
                  </div>
                  <div className="p-3 bg-[var(--bg-subtle)]/70 dark:bg-[#2C2A25] rounded-xl text-xs text-stone-700 dark:text-stone-300 leading-relaxed border border-[var(--border-color)] dark:border-[var(--border-color)]">
                    <strong className="text-stone-900 dark:text-stone-100">Luận giải chi tiết:</strong> {currentCard.explanation}
                  </div>
                  {currentCard.formula && (
                    <Formula math={currentCard.formula} block />
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-3 border-t border-[var(--border-color)]/70 dark:border-[var(--border-color)]/70">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToSection(currentCard.sectionId);
                    }}
                    className="hover:text-[#682626] dark:hover:text-[#C2A267] transition-colors flex items-center gap-1 font-medium"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Xem mục {currentCard.sectionId} trong sách</span>
                  </button>
                  <span className="text-stone-500 italic">Đánh giá độ hiểu bài bên dưới ➔</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Ratings & Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] disabled:opacity-30 hover:bg-[var(--bg-subtle)] dark:hover:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300 transition-colors shadow-2xs"
                title="Thẻ trước [Phím ←]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === filteredCards.length - 1}
                className="p-2 rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] disabled:opacity-30 hover:bg-[var(--bg-subtle)] dark:hover:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300 transition-colors shadow-2xs"
                title="Thẻ tiếp theo [Phím →]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-stone-400 hidden md:inline ml-1 font-mono">
                [Space]: Lật thẻ
              </span>
            </div>

            {/* SM-2 Quality Grading Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleGrade(1)}
                className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#8A3333]/10 hover:bg-[#8A3333]/20 text-[#8A3333] dark:text-[#E09B9B] border border-[#8A3333]/25 dark:border-[#8A3333]/40 transition-colors flex items-center justify-center gap-1.5"
                title="Chưa nhớ (Phím 1)"
              >
                <span>Chưa nhớ</span>
                <kbd className="text-[10px] bg-[#8A3333]/20 px-1 rounded font-mono">1</kbd>
              </button>
              <button
                onClick={() => handleGrade(3)}
                className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#8A6328]/10 hover:bg-[#8A6328]/20 text-[#8A6328] dark:text-[#C2A267] border border-[#8A6328]/25 dark:border-[#C2A267]/40 transition-colors flex items-center justify-center gap-1.5"
                title="Nhớ một phần (Phím 2)"
              >
                <span>Nhớ tạm</span>
                <kbd className="text-[10px] bg-[#8A6328]/20 px-1 rounded font-mono">2</kbd>
              </button>
              <button
                onClick={() => handleGrade(5)}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg bg-[#2D5A34]/15 hover:bg-[#2D5A34]/25 text-[#2D5A34] dark:text-[#88B88E] border border-[#2D5A34]/30 dark:border-[#88B88E]/40 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                title="Đã thuộc vững (Phím 3)"
              >
                <span>Đã thuộc lòng</span>
                <kbd className="text-[10px] bg-[#2D5A34]/20 dark:bg-[#88B88E]/20 px-1 rounded font-mono">3</kbd>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
