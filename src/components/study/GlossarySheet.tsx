import React, { useState, useMemo } from 'react';
import { Search, BookMarked, Hash, ExternalLink, Filter } from 'lucide-react';
import { GLOSSARY_TERMS } from '../../content/glossaryData';
import { Formula } from '../common/Formula';

interface GlossarySheetProps {
  onNavigateToSection: (sectionId: string) => void;
  selectedTermId?: string | null;
}

export const GlossarySheet: React.FC<GlossarySheetProps> = ({
  onNavigateToSection,
  selectedTermId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(t => {
      const matchCat = selectedCategory === 'all' || t.category === selectedCategory;
      const matchQ = !searchQuery.trim() ||
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.symbol && t.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQ;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-[var(--border-color)] dark:border-[var(--border-color)] pb-5">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#8A6328] dark:text-[#C2A267]">
          Từ điển phạm trù học thuyết
        </span>
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Bảng thuật ngữ Kinh tế chính trị Mác – Lênin
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
          Tra cứu nhanh định nghĩa chuẩn tắc, ký hiệu quy ước và công thức toán học liên quan
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'core', label: 'Cốt lõi' },
            { id: 'capital', label: 'Tư bản (c & v)' },
            { id: 'methods', label: 'Phương pháp & Tỷ suất' },
            { id: 'circulation', label: 'Lưu thông & Chu chuyển' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                selectedCategory === tab.id
                  ? 'bg-[#682626] text-[#FAF7F0] font-semibold dark:bg-[#C2A267] dark:text-[#1B1A18]'
                  : 'bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300 hover:bg-[var(--bg-subtle)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tra cứu thuật ngữ (m, c, v, p)..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] text-stone-800 dark:text-stone-200"
          />
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map(t => (
          <div
            key={t.id}
            className={`p-5 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border transition-all space-y-2 flex flex-col justify-between ${
              selectedTermId === t.id
                ? 'border-[#682626] dark:border-[#C2A267] ring-2 ring-[#682626]/20 shadow-md'
                : 'border-[var(--border-color)] dark:border-[var(--border-color)] shadow-2xs hover:border-[#682626]/40 dark:hover:border-[#C2A267]/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                  {t.term} {t.symbol && <span className="text-[#682626] dark:text-[#C2A267] font-serif font-normal">({t.symbol})</span>}
                </h4>
                {t.englishTerm && (
                  <span className="text-[10px] text-stone-400 italic font-serif">
                    {t.englishTerm}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                {t.definition}
              </p>

              {t.explanation && (
                <p className="text-[11px] text-stone-500 leading-relaxed mt-2 pt-2 border-t border-[var(--border-color)]/70 dark:border-[var(--border-color)]/70">
                  {t.explanation}
                </p>
              )}

              {t.formula && (
                <div className="my-2">
                  <Formula math={t.formula} block />
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onNavigateToSection(t.relatedSectionId)}
                className="text-[11px] text-[#682626] dark:text-[#C2A267] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Xem mục {t.relatedSectionId} trong sách</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
