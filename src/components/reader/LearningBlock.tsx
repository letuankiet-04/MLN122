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
      <div className="my-6 p-5 rounded-xl border border-[#7F1D1D]/30 dark:border-[#E2B765]/40 bg-[#7F1D1D]/5 dark:bg-[#E2B765]/10 shadow-xs relative">
        <div className="flex items-center gap-2 mb-2 text-[#7F1D1D] dark:text-[#E2B765]">
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
      <div className="my-6 p-5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/80 dark:bg-stone-800/40">
        {title && (
          <h4 className="font-serif font-bold text-sm text-[#7F1D1D] dark:text-[#E2B765] mb-2">
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
      <div className="my-6 p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 dark:text-amber-400 mb-1.5">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
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
      <div className="my-6 p-5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide mb-2.5">
          <BookOpen className="w-4 h-4 text-[#B78C45]" />
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
      <div className="my-6 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-wide mb-1.5">
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
      <div className="my-6 p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-center">
        {title && <span className="text-xs font-semibold text-stone-500 block mb-1">{title}</span>}
        {math && <Formula math={math} block />}
        {content && <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">{content}</p>}
      </div>
    );
  }

  if (type === 'table' && tableData) {
    return (
      <div className="my-6 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-xs">
        {title && (
          <div className="px-4 py-3 bg-stone-100/80 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Table className="w-4 h-4 text-[#7F1D1D] dark:text-[#E2B765]" />
            <span>{title}</span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 uppercase tracking-wider font-semibold border-b border-stone-200 dark:border-stone-700">
              <tr>
                {tableData.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40 transition-colors">
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
