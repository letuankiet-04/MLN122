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
        className="inline border-b border-stone-400/70 hover:border-[#682626] dark:border-stone-500/70 dark:hover:border-[#C2A267] cursor-help text-stone-900 dark:text-stone-100 font-medium hover:text-[#682626] dark:hover:text-[#C2A267] transition-all rounded-xs px-0.5 hover:bg-stone-200/50 dark:hover:bg-stone-700/40"
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
          className="fixed z-50 w-80 max-w-[calc(100vw-32px)] p-4 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] shadow-xl animate-in fade-in zoom-in-95 duration-150 text-left font-sans text-xs space-y-2.5 backdrop-blur-xs select-text"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-[var(--border-color)] dark:border-[var(--border-color)] pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#682626] dark:text-[#C2A267] fill-current" />
                <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                  {term.term} {term.symbol && <span className="text-[#682626] dark:text-[#C2A267] font-serif">({term.symbol})</span>}
                </span>
              </div>
              {term.englishTerm && (
                <span className="text-[10px] text-stone-500 dark:text-stone-400 italic block mt-0.5">
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
          <p className="font-serif text-xs text-stone-800 dark:text-stone-200 leading-relaxed italic bg-[var(--bg-subtle)]/70 dark:bg-[var(--bg-subtle)] p-2.5 rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)]">
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
            <div className="pt-2 border-t border-[var(--border-color)] dark:border-[var(--border-color)] flex justify-between items-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400">
                Mục {term.relatedSectionId} trong sách
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToSection(term.relatedSectionId);
                }}
                className="text-[11px] font-semibold text-[#682626] dark:text-[#C2A267] hover:underline flex items-center gap-1"
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
