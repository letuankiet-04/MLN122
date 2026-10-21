import React from 'react';
import { Bookmark, Sparkles, AlertCircle, CheckCircle2, Table, Lightbulb, BookOpen } from 'lucide-react';
import { Formula } from '../common/Formula';
import { AnnotatedText } from '../common/AnnotatedText';

interface LearningBlockProps {
  type: 'paragraph' | 'definition' | 'proposition' | 'explanation' | 'example' | 'table' | 'remember' | 'interactive' | 'formula';
  title?: string;
  content?: string;
  math?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  onHighlightText?: (text: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const LearningBlock: React.FC<LearningBlockProps> = ({
  type,
  title,
  content,
  math,
  tableData,
  onNavigateToSection,
}) => {
  if (type === 'paragraph') {
    return (
      <p className="my-4 leading-relaxed text-stone-800 dark:text-stone-200">
        <AnnotatedText text={content || ''} onNavigateToSection={onNavigateToSection} />
      </p>
    );
  }

  if (type === 'definition') {
    return (
      <div className="my-6 p-5 rounded-xl border border-[#682626]/25 dark:border-[#C2A267]/35 bg-[#682626]/5 dark:bg-[#C2A267]/10 shadow-xs relative">
        <div className="flex items-center gap-2 mb-2 text-[#682626] dark:text-[#C2A267]">
          <Bookmark className="w-4 h-4 fill-current" />
          <span className="text-xs uppercase tracking-wider font-bold">
            {title || 'Định nghĩa học thuật'}
          </span>
        </div>
        <p className="text-sm font-serif italic text-stone-900 dark:text-stone-100 leading-relaxed">
          &quot;<AnnotatedText text={content || ''} onNavigateToSection={onNavigateToSection} />&quot;
        </p>
      </div>
    );
  }

  if (type === 'proposition') {
    return (
      <div className="my-6 p-5 rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-subtle)]/70 dark:bg-[var(--bg-subtle)]">
        {title && (
          <h4 className="font-serif font-bold text-sm text-[#682626] dark:text-[#C2A267] mb-2">
            {title}
          </h4>
        )}
        <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
          <AnnotatedText text={content || ''} onNavigateToSection={onNavigateToSection} />
        </p>
      </div>
    );
  }

  if (type === 'explanation') {
    return (
      <div className="my-6 p-4 rounded-xl border border-[#DFD5C0] dark:border-[#3D3728] bg-[#F5EFE0]/80 dark:bg-[#2A271E]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5A451E] dark:text-[#CBB27A] mb-1.5">
          <Lightbulb className="w-4 h-4 text-[#8A6828] dark:text-[#CBB27A]" />
          <span>Giải thích bổ trợ dễ hiểu: {title}</span>
        </div>
        <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
          <AnnotatedText text={content || ''} onNavigateToSection={onNavigateToSection} />
        </div>
      </div>
    );
  }

  if (type === 'example') {
    return (
      <div className="my-6 p-5 rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide mb-2.5">
          <BookOpen className="w-4 h-4 text-[#967338] dark:text-[#C2A267]" />
          <span>{title || 'Ví dụ minh họa chi tiết'}</span>
        </div>
        <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-sans leading-relaxed whitespace-pre-line">
          <AnnotatedText text={content || ''} onNavigateToSection={onNavigateToSection} />
        </div>
      </div>
    );
  }

  if (type === 'remember') {
    return (
      <div className="my-6 p-4 rounded-xl border border-[#C8DAC6] dark:border-[#2D3F30] bg-[#EDF3EC]/70 dark:bg-[#1E2820]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#27482B] dark:text-[#88B88E] uppercase tracking-wide mb-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>{title || 'Ghi nhớ trọng tâm'}</span>
        </div>
        <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line">
          <AnnotatedText text={content || ''} onNavigateToSection={onNavigateToSection} />
        </div>
      </div>
    );
  }

  if (type === 'formula') {
    return (
      <div className="my-6 p-4 rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] text-center shadow-xs">
        {title && <span className="text-xs font-semibold text-stone-500 block mb-1">{title}</span>}
        {math && <Formula math={math} block />}
        {content && <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">{content}</p>}
      </div>
    );
  }

  if (type === 'table' && tableData) {
    return (
      <div className="my-6 rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] overflow-hidden shadow-xs">
        {title && (
          <div className="px-4 py-3 bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] border-b border-[var(--border-color)] dark:border-[var(--border-color)] font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Table className="w-4 h-4 text-[#682626] dark:text-[#C2A267]" />
            <span>{title}</span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-sidebar)] dark:bg-[#252320] text-stone-700 dark:text-stone-300 uppercase tracking-wider font-semibold border-b border-[var(--border-color)] dark:border-[var(--border-color)]">
              <tr>
                {tableData.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]/60 dark:divide-[var(--border-color)]/60 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)]">
              {tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[var(--bg-subtle)]/50 dark:hover:bg-[var(--bg-subtle)]/50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`px-4 py-3 leading-relaxed text-stone-700 dark:text-stone-300 ${cIdx === 0 ? 'font-semibold text-stone-900 dark:text-stone-100' : ''}`}>
                      <AnnotatedText text={cell} onNavigateToSection={onNavigateToSection} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};
