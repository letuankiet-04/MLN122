import React, { useState, useEffect } from 'react';
import { Clock, BookMarked, CheckCircle2, ArrowLeft, ArrowRight, Highlighter, Edit3 } from 'lucide-react';
import { ChapterSection, CHAPTER_SECTIONS } from '../../content/chaptersData';
import { LearningBlock } from './LearningBlock';
import { CapitalCirculationExplorer } from '../interactive/CapitalCirculationExplorer';
import { ContradictionExplorer } from '../interactive/ContradictionExplorer';
import { LaborPowerModule } from '../interactive/LaborPowerModule';
import { SurplusValueSimulator } from '../interactive/SurplusValueSimulator';
import { ConstantVariableExplorer } from '../interactive/ConstantVariableExplorer';
import { SurplusValueCalculator } from '../interactive/SurplusValueCalculator';
import { SurplusValueMethodsSimulator } from '../interactive/SurplusValueMethodsSimulator';
import { AnnotatedText } from '../common/AnnotatedText';
import { ReaderSettings } from '../../types/textbook';

interface SectionRendererProps {
  section: ChapterSection;
  onNavigateSection: (sectionId: string) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: () => void;
  onToggleBookmark: () => void;
  onAddHighlight: (text: string, color: 'yellow' | 'green' | 'blue' | 'rose') => void;
  readerSettings: ReaderSettings;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  onNavigateSection,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onAddHighlight,
  readerSettings,
}) => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);

  const currentIndex = CHAPTER_SECTIONS.findIndex(s => s.id === section.id);
  const prevSection = currentIndex > 0 ? CHAPTER_SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < CHAPTER_SECTIONS.length - 1 ? CHAPTER_SECTIONS[currentIndex + 1] : null;

  // Listen to text selection in the document
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 3) {
      const text = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setSelectionPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    } else {
      setSelectedText('');
      setSelectionPosition(null);
    }
  };

  const handleApplyHighlight = (color: 'yellow' | 'green' | 'blue' | 'rose') => {
    if (selectedText) {
      onAddHighlight(selectedText, color);
      setSelectedText('');
      setSelectionPosition(null);
      window.getSelection()?.removeAllRanges();
    }
  };

  // Determine width class
  const widthClass = 
    readerSettings.contentWidth === 'wide' 
      ? 'max-w-4xl' 
      : readerSettings.contentWidth === 'full' 
      ? 'max-w-5xl' 
      : 'max-w-3xl';

  // Determine font size class
  const fontSizeClass =
    readerSettings.fontSize === 'sm'
      ? 'text-sm'
      : readerSettings.fontSize === 'lg'
      ? 'text-lg'
      : readerSettings.fontSize === 'xl'
      ? 'text-xl'
      : 'text-base';

  // Line height class
  const lineHeightClass =
    readerSettings.lineHeight === 'loose'
      ? 'leading-loose'
      : readerSettings.lineHeight === 'normal'
      ? 'leading-normal'
      : 'leading-relaxed';

  return (
    <article
      onMouseUp={handleMouseUp}
      className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 ${widthClass} ${
        readerSettings.fontFamily === 'serif' ? 'font-serif' : 'font-sans'
      }`}
    >
      {/* Floating Highlight Toolbar */}
      {selectionPosition && selectedText && (
        <div
          style={{
            top: `${selectionPosition.y + window.scrollY - 44}px`,
            left: `${selectionPosition.x}px`,
            transform: 'translateX(-50%)',
          }}
          className="fixed z-50 flex items-center gap-1.5 p-1 bg-stone-900 text-white rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-100"
        >
          <button
            onClick={() => handleApplyHighlight('yellow')}
            className="w-5 h-5 rounded-full bg-amber-400 hover:scale-110 transition-transform"
            title="Đánh dấu vàng"
          />
          <button
            onClick={() => handleApplyHighlight('green')}
            className="w-5 h-5 rounded-full bg-emerald-400 hover:scale-110 transition-transform"
            title="Đánh dấu xanh lá"
          />
          <button
            onClick={() => handleApplyHighlight('blue')}
            className="w-5 h-5 rounded-full bg-sky-400 hover:scale-110 transition-transform"
            title="Đánh dấu xanh dương"
          />
          <button
            onClick={() => handleApplyHighlight('rose')}
            className="w-5 h-5 rounded-full bg-rose-400 hover:scale-110 transition-transform"
            title="Đánh dấu đỏ hồng"
          />
        </div>
      )}

      {/* Section Header */}
      <header className="pb-6 border-b border-[#E7E1D6] dark:border-[#383632]">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 mb-2 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#7F1D1D] dark:text-[#E2B765] uppercase tracking-wider">
              Mục {section.number}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {section.estimatedMinutes} phút đọc
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleBookmark}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ${
                isBookmarked
                  ? 'border-[#B78C45] bg-[#B78C45]/10 text-[#B78C45] dark:text-[#E2B765]'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 fill-current" />
              <span>{isBookmarked ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
            </button>

            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ${
                isCompleted
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          {section.number}. {section.title}
        </h1>

        {section.subtitle && (
          <p className="mt-2 text-sm sm:text-base font-serif italic text-stone-600 dark:text-stone-400">
            {section.subtitle}
          </p>
        )}

        {/* Learning Objectives Box */}
        {section.objectives && section.objectives.length > 0 && (
          <div className="mt-5 p-4 rounded-xl border border-stone-200/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-800/30 font-sans text-xs">
            <span className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider block mb-2">
              Mục tiêu bài học:
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-stone-700 dark:text-stone-300 leading-relaxed">
              {section.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <div className={`py-6 space-y-6 ${fontSizeClass} ${lineHeightClass}`}>
        {/* Lead paragraph */}
        <p className="text-base sm:text-lg font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed border-l-2 border-[#7F1D1D] dark:border-[#E2B765] pl-4 py-1">
          <AnnotatedText text={section.content.lead} onNavigateToSection={onNavigateSection} />
        </p>

        {/* Dynamic Blocks */}
        {section.content.blocks.map((block, idx) => {
          if (block.type === 'interactive') {
            if (block.interactiveId === 'capital-circulation') {
              return <CapitalCirculationExplorer key={idx} />;
            }
            if (block.interactiveId === 'contradiction-explorer') {
              return <ContradictionExplorer key={idx} />;
            }
            if (block.interactiveId === 'labor-power') {
              return <LaborPowerModule key={idx} />;
            }
            if (block.interactiveId === 'cotton-simulator') {
              return <SurplusValueSimulator key={idx} />;
            }
            if (block.interactiveId === 'constant-variable') {
              return <ConstantVariableExplorer key={idx} />;
            }
            if (block.interactiveId === 'surplus-calculator') {
              return <SurplusValueCalculator key={idx} />;
            }
            if (block.interactiveId === 'methods-simulator') {
              return <SurplusValueMethodsSimulator key={idx} />;
            }
            return null;
          }

          return (
            <LearningBlock
              key={idx}
              type={block.type}
              title={block.title}
              content={block.content}
              math={block.math}
              tableData={block.tableData}
              onNavigateToSection={onNavigateSection}
            />
          );
        })}
      </div>

      {/* Footer Navigation Bar */}
      <footer className="pt-8 mt-10 border-t border-[#E7E1D6] dark:border-[#383632] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
        {prevSection ? (
          <button
            onClick={() => onNavigateSection(prevSection.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="text-left">
              <span className="text-[10px] text-stone-400 block">Bài trước</span>
              <span className="font-semibold line-clamp-1">{prevSection.number} {prevSection.title}</span>
            </div>
          </button>
        ) : <div />}

        {nextSection ? (
          <button
            onClick={() => onNavigateSection(nextSection.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#7F1D1D] hover:bg-[#681818] dark:bg-[#B78C45] dark:hover:bg-[#9E7535] text-white dark:text-stone-900 font-semibold transition-colors w-full sm:w-auto justify-end"
          >
            <div className="text-right">
              <span className="text-[10px] opacity-80 block">Bài tiếp theo</span>
              <span className="line-clamp-1">{nextSection.number} {nextSection.title}</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-lg text-center font-semibold">
            Chúc mừng! Bạn đã hoàn thành toàn bộ nội dung giáo trình Chương 3.
          </div>
        )}
      </footer>
    </article>
  );
};
