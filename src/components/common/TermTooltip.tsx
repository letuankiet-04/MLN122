import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, ExternalLink, X, Info } from 'lucide-react';
import { GlossaryTerm } from '../../types/textbook';
import { Formula } from './Formula';

interface TermTooltipProps {
  term: GlossaryTerm;
  children: React.ReactNode;
  onNavigateToSection?: (sectionId: string) => void;
}

export const TermTooltip: React.FC<TermTooltipProps> = ({
  term,
  children,
  onNavigateToSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; placeAbove: boolean }>({
    top: 0,
    left: 0,
    placeAbove: true,
  });

  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 320; // approximate width
    const tooltipHeight = 220; // approximate height

    // Center horizontally relative to trigger, bounded inside viewport
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    if (left < 16) left = 16;
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth - 16;
    }

    // Check if space above is sufficient
    const placeAbove = rect.top >= tooltipHeight + 20;
    const top = placeAbove
      ? rect.top - 8
      : rect.bottom + 8;

    setCoords({ top, left, placeAbove });
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    calculatePosition();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250); // 250ms grace period to allow moving cursor into tooltip
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleTooltipMouseLeave = () => {
    setIsOpen(false);
  };

  const handleClickTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    calculatePosition();
    setIsOpen(prev => !prev);
  };

  // Close on outside click or scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrClick = (e: MouseEvent | Event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScrollOrClick, true);
    document.addEventListener('click', handleScrollOrClick as any);

    return () => {
      window.removeEventListener('scroll', handleScrollOrClick, true);
      document.removeEventListener('click', handleScrollOrClick as any);
    };
  }, [isOpen]);

  const categoryLabels: Record<string, string> = {
    core: 'Khái niệm cốt lõi',
    capital: 'Phạm trù tư bản',
    methods: 'Phương pháp & Tỷ suất',
    circulation: 'Lưu thông & Chu chuyển',
    modern: 'Thời đại mới',
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClickTrigger}
        className="inline border-b-2 border-dotted border-[#B78C45]/80 hover:border-[#7F1D1D] dark:border-[#E2B765]/80 dark:hover:border-[#E2B765] cursor-help text-stone-900 dark:text-stone-100 font-medium hover:text-[#7F1D1D] dark:hover:text-[#E2B765] transition-colors rounded-xs px-0.5 bg-[#B78C45]/5 hover:bg-[#B78C45]/15 dark:bg-[#E2B765]/10 dark:hover:bg-[#E2B765]/20"
        title="Nhấp hoặc rê chuột để xem định nghĩa nhanh"
      >
        {children}
      </span>

      {isOpen && (
        <div
          ref={tooltipRef}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            transform: coords.placeAbove ? 'translateY(-100%)' : 'none',
          }}
          className="fixed z-50 w-80 max-w-[calc(100vw-32px)] p-4 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#7F1D1D]/30 dark:border-[#E2B765]/40 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-left font-sans text-xs space-y-2.5 backdrop-blur-xs select-text"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-stone-200/80 dark:border-stone-700/80 pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#7F1D1D] dark:text-[#E2B765] fill-current" />
                <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                  {term.term} {term.symbol && <span className="text-[#7F1D1D] dark:text-[#E2B765] font-serif">({term.symbol})</span>}
                </span>
              </div>
              {term.englishTerm && (
                <span className="text-[10px] text-stone-400 italic block mt-0.5">
                  {term.englishTerm} · {categoryLabels[term.category] || 'Thuật ngữ'}
                </span>
              )}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-md"
              title="Đóng tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Academic Definition */}
          <p className="font-serif text-xs text-stone-800 dark:text-stone-200 leading-relaxed italic bg-stone-50 dark:bg-stone-800/50 p-2 rounded-lg border border-stone-200/60 dark:border-stone-700/60">
            &quot;{term.definition}&quot;
          </p>

          {/* Additional concise explanation */}
          {term.explanation && (
            <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
              {term.explanation}
            </p>
          )}

          {/* Mathematical Formula if present */}
          {term.formula && (
            <div className="py-1">
              <Formula math={term.formula} block className="my-1 py-1.5 text-xs" />
            </div>
          )}

          {/* Direct link to related section */}
          {onNavigateToSection && term.relatedSectionId && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
              <span className="text-[10px] text-stone-400">
                Mục {term.relatedSectionId} trong sách
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToSection(term.relatedSectionId);
                }}
                className="text-[11px] font-semibold text-[#7F1D1D] dark:text-[#E2B765] hover:underline flex items-center gap-1"
              >
                <span>Xem mục chi tiết</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
