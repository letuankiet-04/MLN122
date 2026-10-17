import React from 'react';
import { BookMarked, Check, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CHAPTER_SECTIONS, CHAPTER_INFO } from '../../content/chaptersData';

interface TableOfContentsProps {
  currentSectionId: string;
  onSelectSection: (sectionId: string) => void;
  completedSections: string[];
  bookmarks: string[];
  onToggleComplete: (sectionId: string) => void;
  onToggleBookmark: (sectionId: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  currentSectionId,
  onSelectSection,
  completedSections,
  bookmarks,
  onToggleComplete,
  onToggleBookmark,
}) => {
  const totalSections = CHAPTER_SECTIONS.length;
  const completedCount = completedSections.length;
  const progressPercent = Math.round((completedCount / totalSections) * 100);

  return (
    <aside className="w-full h-full flex flex-col bg-[#EFE9DF]/80 dark:bg-[#1F1E1B]/80 border-r border-[#DFD7CA] dark:border-[#383530]">
      {/* Book & Chapter Header */}
      <div className="p-4 border-b border-[#DFD7CA] dark:border-[#383530]">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8A6328] dark:text-[#C2A267]">
          {CHAPTER_INFO.course}
        </div>
        <h2 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mt-0.5 line-clamp-1">
          {CHAPTER_INFO.code}: {CHAPTER_INFO.title}
        </h2>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-stone-500 mb-1">
            <span>Tiến độ chương</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
              {completedCount}/{totalSections} bài ({progressPercent}%)
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#DFD7CA] dark:bg-[#33302B] rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-[#682626] dark:bg-[#C2A267] transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Section List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {CHAPTER_SECTIONS.map((sec) => {
          const isActive = currentSectionId === sec.id;
          const isCompleted = completedSections.includes(sec.id);
          const isBookmarked = bookmarks.includes(sec.id);

          return (
            <div
              key={sec.id}
              className={`group flex items-start justify-between p-2.5 rounded-lg text-xs transition-all ${
                isActive
                  ? 'bg-[#FAF7F0] dark:bg-[#282723] text-stone-900 dark:text-stone-100 font-semibold shadow-xs border border-[#DFD7CA] dark:border-[#383530]'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-[#FAF7F0]/60 dark:hover:bg-[#252420]/60'
              }`}
            >
              <button
                onClick={() => onSelectSection(sec.id)}
                className="flex-1 text-left pr-2 flex items-start gap-2"
              >
                <span className={`font-mono text-[11px] mt-0.5 ${isActive ? 'text-[#682626] dark:text-[#C2A267] font-bold' : 'text-stone-400 dark:text-stone-500'}`}>
                  {sec.number}
                </span>
                <div className="min-w-0">
                  <div className={`line-clamp-2 font-serif text-xs ${isActive ? 'text-[#682626] dark:text-[#C2A267] font-bold' : ''}`}>
                    {sec.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-500 dark:text-stone-400 font-sans">
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {sec.estimatedMinutes} phút
                    </span>
                    {sec.hasInteractiveModule && (
                      <span className="text-[#8A6328] dark:text-[#C2A267] font-medium">
                        · Có mô phỏng
                      </span>
                    )}
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-1 shrink-0 pt-0.5">
                {/* Bookmark Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(sec.id);
                  }}
                  className={`p-1 rounded transition-colors ${
                    isBookmarked
                      ? 'text-[#8A6328] dark:text-[#C2A267]'
                      : 'text-stone-300 dark:text-stone-600 hover:text-stone-500'
                  }`}
                  title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu bài học'}
                >
                  <BookMarked className="w-3.5 h-3.5 fill-current" />
                </button>

                {/* Completion Checkmark */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(sec.id);
                  }}
                  className={`p-1 rounded transition-colors ${
                    isCompleted
                      ? 'text-[#2D5A34] dark:text-[#88B88E]'
                      : 'text-stone-300 dark:text-stone-600 hover:text-stone-500'
                  }`}
                  title={isCompleted ? 'Đã hoàn thành (Bấm để hủy)' : 'Đánh dấu đã đọc xong'}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
