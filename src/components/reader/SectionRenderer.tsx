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
import { VideoLessonCard } from '../video/VideoLessonCard';
import { getVideosBySectionId, KNOWLEDGE_VIDEOS } from '../../content/knowledgeVideosData';
import { KnowledgeVideo } from '../../types/video';

interface SectionRendererProps {
  section: ChapterSection;
  onNavigateSection: (sectionId: string) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: () => void;
  onToggleBookmark: () => void;
  onAddHighlight: (text: string, color: 'yellow' | 'green' | 'blue' | 'rose') => void;
  readerSettings: ReaderSettings;
  onPlayVideo?: (video: KnowledgeVideo) => void;
  onSwitchToQuiz?: () => void;
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
  onPlayVideo,
  onSwitchToQuiz,
}) => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Track window scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVideos = getVideosBySectionId(section.id);
  const primaryVideo = sectionVideos.length > 0 ? sectionVideos[0] : KNOWLEDGE_VIDEOS[0];

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
      {/* Sticky Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#682626] via-[#967338] to-[#C2A267] shadow-xs transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Highlight Toolbar */}
      {selectionPosition && selectedText && (
        <div
          style={{
            top: `${selectionPosition.y + window.scrollY - 50}px`,
            left: `${selectionPosition.x}px`,
            transform: 'translateX(-50%)',
          }}
          className="fixed z-50 flex items-center gap-2 px-3 py-1.5 bg-stone-900/95 backdrop-blur-md text-white rounded-full border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        >
          <span className="text-[10px] text-stone-300 font-medium pr-1 border-r border-stone-700">Tô màu:</span>
          <button
            onClick={() => handleApplyHighlight('yellow')}
            className="w-5 h-5 rounded-full bg-amber-400 hover:scale-125 transition-transform shadow-xs"
            title="Đánh dấu vàng (Ý chính)"
          />
          <button
            onClick={() => handleApplyHighlight('green')}
            className="w-5 h-5 rounded-full bg-emerald-400 hover:scale-125 transition-transform shadow-xs"
            title="Đánh dấu xanh lá (Khái niệm)"
          />
          <button
            onClick={() => handleApplyHighlight('blue')}
            className="w-5 h-5 rounded-full bg-sky-400 hover:scale-125 transition-transform shadow-xs"
            title="Đánh dấu xanh dương (Luận điểm)"
          />
          <button
            onClick={() => handleApplyHighlight('rose')}
            className="w-5 h-5 rounded-full bg-rose-400 hover:scale-125 transition-transform shadow-xs"
            title="Đánh dấu đỏ hồng (Trọng tâm thi cử)"
          />
        </div>
      )}

      {/* Section Header */}
      <header className="pb-6 border-b border-[var(--border-color)] dark:border-[var(--border-color)]">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 mb-2 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#682626] dark:text-[#C2A267] uppercase tracking-wider">
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
                  ? 'border-[#967338]/40 bg-[#967338]/10 text-[#682626] dark:text-[#C2A267]'
                  : 'border-[var(--border-color)] dark:border-[var(--border-color)] text-stone-600 dark:text-stone-400 hover:bg-[var(--bg-surface)] dark:hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 fill-current" />
              <span>{isBookmarked ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
            </button>

            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ${
                isCompleted
                  ? 'border-[#2D5A34] bg-[#EDF3EC] dark:bg-[#1E2820] text-[#25462A] dark:text-[#88B88E]'
                  : 'border-[var(--border-color)] dark:border-[var(--border-color)] text-stone-600 dark:text-stone-400 hover:bg-[var(--bg-surface)] dark:hover:bg-[var(--bg-subtle)]'
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
          <div className="mt-5 p-4 rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] font-sans text-xs">
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

        {/* Learning Mode Switcher Bar */}
        <div className="mt-5 p-2 rounded-xl bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] border border-[var(--border-color)] dark:border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 font-sans text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 pl-1 hidden sm:inline">
              Cách học:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onPlayVideo && onPlayVideo(primaryVideo)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#682626] dark:bg-[#C2A267] text-[#FAF7F0] dark:text-[#1B1A18] font-semibold shadow-xs hover:opacity-90 transition-opacity"
              >
                <span>🎬 Xem video ({sectionVideos.length || 1})</span>
              </button>
              <a
                href="#theory-content"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] dark:bg-[var(--bg-page)] border border-[var(--border-color)] dark:border-[var(--border-color)] text-stone-700 dark:text-stone-300 font-medium hover:bg-white dark:hover:bg-[var(--bg-subtle)] transition-colors"
              >
                <span>📖 Đọc lý thuyết</span>
              </a>
              {onSwitchToQuiz && (
                <button
                  onClick={onSwitchToQuiz}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] dark:bg-[var(--bg-page)] border border-[var(--border-color)] dark:border-[var(--border-color)] text-stone-700 dark:text-stone-300 font-medium hover:bg-white dark:hover:bg-[var(--bg-subtle)] transition-colors"
                >
                  <span>✍️ Làm Quiz</span>
                </button>
              )}
            </div>
          </div>

          <div className="text-[11px] text-stone-500 font-medium pr-1 hidden md:block">
            Xem video 3 phút trước để nắm 80% cốt lõi
          </div>
        </div>

        {/* Featured Knowledge Video Card */}
        {primaryVideo && (
          <VideoLessonCard
            primaryVideo={primaryVideo}
            allVideosForSection={sectionVideos}
            onPlayVideo={video => onPlayVideo && onPlayVideo(video)}
          />
        )}
      </header>

      {/* Main Content Body */}
      <div id="theory-content" className={`py-6 space-y-6 ${fontSizeClass} ${lineHeightClass}`}>
        {/* Lead paragraph */}
        <p className="text-base sm:text-lg font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed border-l-2 border-[#682626] dark:border-[#C2A267] pl-4 py-1">
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
      <footer className="pt-8 mt-10 border-t border-[var(--border-color)] dark:border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
        {prevSection ? (
          <button
            onClick={() => onNavigateSection(prevSection.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] dark:hover:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300 transition-colors w-full sm:w-auto"
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#682626] hover:bg-[#541E1E] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] text-[#FAF7F0] dark:text-[#1B1A18] font-semibold transition-colors w-full sm:w-auto justify-end shadow-xs"
          >
            <div className="text-right">
              <span className="text-[10px] opacity-80 block">Bài tiếp theo</span>
              <span className="line-clamp-1">{nextSection.number} {nextSection.title}</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="p-3 bg-[#EDF3EC] dark:bg-[#1E2820] text-[#25462A] dark:text-[#88B88E] rounded-lg text-center font-semibold border border-[#C8DAC6] dark:border-[#2D3F30]">
            Chúc mừng! Bạn đã hoàn thành toàn bộ nội dung giáo trình Chương 3.
          </div>
        )}
      </footer>
    </article>
  );
};
