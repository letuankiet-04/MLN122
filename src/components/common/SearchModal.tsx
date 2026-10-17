import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, BookOpen, Hash, Calculator, HelpCircle } from 'lucide-react';
import { CHAPTER_SECTIONS } from '../../content/chaptersData';
import { GLOSSARY_TERMS } from '../../content/glossaryData';
import { QUIZ_QUESTIONS } from '../../content/quizData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSelectTerm?: (termId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSection,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matchedSections: { type: 'section'; id: string; title: string; snippet: string }[] = [];
    CHAPTER_SECTIONS.forEach(sec => {
      if (sec.title.toLowerCase().includes(q) || sec.subtitle.toLowerCase().includes(q) || sec.summary.toLowerCase().includes(q)) {
        matchedSections.push({
          type: 'section',
          id: sec.id,
          title: `${sec.number} ${sec.title}`,
          snippet: sec.summary,
        });
      } else {
        // Search inside blocks
        const matchingBlock = sec.content.blocks.find(b => 
          (b.title && b.title.toLowerCase().includes(q)) || 
          (b.content && b.content.toLowerCase().includes(q))
        );
        if (matchingBlock) {
          matchedSections.push({
            type: 'section',
            id: sec.id,
            title: `${sec.number} ${sec.title} — ${matchingBlock.title || 'Nội dung'}`,
            snippet: matchingBlock.content ? matchingBlock.content.slice(0, 140) + '...' : sec.summary,
          });
        }
      }
    });

    const matchedGlossary: { type: 'glossary'; id: string; title: string; snippet: string; sectionId: string }[] = [];
    GLOSSARY_TERMS.forEach(term => {
      if (term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q) || (term.symbol && term.symbol.toLowerCase().includes(q))) {
        matchedGlossary.push({
          type: 'glossary',
          id: term.id,
          title: `Thuật ngữ: ${term.term} ${term.symbol ? `(${term.symbol})` : ''}`,
          snippet: term.definition,
          sectionId: term.relatedSectionId,
        });
      }
    });

    const matchedQuestions: { type: 'question'; id: string; title: string; snippet: string; sectionId: string }[] = [];
    QUIZ_QUESTIONS.forEach(quiz => {
      if (quiz.question.toLowerCase().includes(q) || quiz.topic.toLowerCase().includes(q)) {
        matchedQuestions.push({
          type: 'question',
          id: quiz.id,
          title: `Câu hỏi ôn tập: ${quiz.topic}`,
          snippet: quiz.question,
          sectionId: quiz.sectionId,
        });
      }
    });

    return [...matchedSections, ...matchedGlossary, ...matchedQuestions].slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#DFD7CA] dark:border-[#383530]">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm khái niệm, mục giáo trình, công thức (ví dụ: tư bản khả biến, m′, sợi bông)..."
            className="w-full bg-transparent text-sm focus:outline-hidden text-stone-900 dark:text-stone-100 placeholder:text-stone-400 font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-stone-400 hover:text-stone-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[11px] bg-[#EFE8DD] dark:bg-[#2D2B27] border border-[#DFD7CA] dark:border-[#383530] px-1.5 py-0.5 rounded text-stone-600 dark:text-stone-400 font-mono">
            ESC
          </kbd>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#DFD7CA]/50 dark:divide-[#383530]/50">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-stone-500 space-y-2">
              <p className="font-medium text-stone-700 dark:text-stone-300">Gợi ý từ khóa tìm kiếm nhanh:</p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['Sức lao động', 'Tư bản bất biến', 'Tỷ suất m′', 'Ví dụ kéo sợi bông', 'Tuyệt đối và tương đối', 'Robot và AI 4.0'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs bg-[#EFE8DD] dark:bg-[#2A2824] text-stone-700 dark:text-stone-300 rounded hover:bg-[#682626]/10 hover:text-[#682626] dark:hover:text-[#C2A267] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">
              Không tìm thấy nội dung phù hợp với &quot;{query}&quot;. Thử tìm với từ khóa chung hơn.
            </div>
          ) : (
            results.map((res, idx) => (
              <button
                key={`${res.type}-${res.id}-${idx}`}
                onClick={() => {
                  if (res.type === 'section') {
                    onNavigateToSection(res.id);
                  } else {
                    onNavigateToSection(res.sectionId);
                  }
                  onClose();
                }}
                className="w-full text-left p-3 hover:bg-[#EFE8DD]/50 dark:hover:bg-[#2A2824]/60 rounded-lg transition-colors flex items-start gap-3 group"
              >
                <div className="mt-0.5 p-1.5 rounded-md bg-[#EFE8DD] dark:bg-[#2A2824] text-[#682626] dark:text-[#C2A267] shrink-0">
                  {res.type === 'section' && <BookOpen className="w-4 h-4" />}
                  {res.type === 'glossary' && <Hash className="w-4 h-4" />}
                  {res.type === 'question' && <HelpCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-[#682626] dark:group-hover:text-[#C2A267] truncate font-serif">
                      {res.title}
                    </span>
                    <span className="text-[10px] text-stone-400 capitalize shrink-0">
                      {res.type === 'section' ? 'Mục sách' : res.type === 'glossary' ? 'Thuật ngữ' : 'Câu hỏi'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-0.5">
                    {res.snippet}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
