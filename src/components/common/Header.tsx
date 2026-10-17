import React from 'react';
import { BookOpen, Search, Settings, Sparkles } from 'lucide-react';
import { ReaderSettings } from '../../types/textbook';

interface HeaderProps {
  currentTab: 'reader' | 'videos' | 'library' | 'simulators' | 'practice' | 'dashboard' | 'notes';
  onSelectTab: (tab: 'reader' | 'videos' | 'library' | 'simulators' | 'practice' | 'dashboard' | 'notes') => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  streakCount: number;
  readerSettings: ReaderSettings;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  onOpenSettings,
  streakCount,
  readerSettings,
}) => {
  const isDark = readerSettings.theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-[#1B1A18]/95 border-[#383530] text-[#DCD6CA]' 
        : readerSettings.theme === 'sepia'
        ? 'bg-[#EAE0CE]/95 border-[#D6C9B0] text-[#342A22]'
        : readerSettings.theme === 'focus'
        ? 'bg-[#F5F2EB]/95 border-[#E2DDD2] text-[#262320]'
        : 'bg-[#F2ECE1]/95 border-[#DFD7CA] text-[#2C2723]'
    }`}>
      {/* Top Bar Contract: 3 zones, gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('reader')}
          className="flex items-center gap-2.5 text-left text-lg font-serif font-bold tracking-tight text-[#682626] dark:text-[#C2A267] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
        >
          <span className="w-8 h-8 rounded bg-[#682626] text-[#FAF7F0] dark:bg-[#C2A267] dark:text-[#1B1A18] flex items-center justify-center text-sm font-sans font-bold shadow-xs">
            M
          </span>
          <span>MARX STUDY</span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('reader')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'reader'
                ? 'text-[#682626] dark:text-[#C2A267] font-semibold border-b-2 border-[#682626] dark:border-[#C2A267]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Giáo trình số
          </button>
          <button
            onClick={() => onSelectTab('videos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              currentTab === 'videos'
                ? 'text-[#682626] dark:text-[#C2A267] font-semibold border-b-2 border-[#682626] dark:border-[#C2A267]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <span>Video kiến thức</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#8A6328]/15 text-[#682626] dark:text-[#C2A267] text-[10px] font-mono">10</span>
          </button>
          <button
            onClick={() => onSelectTab('simulators')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'simulators'
                ? 'text-[#682626] dark:text-[#C2A267] font-semibold border-b-2 border-[#682626] dark:border-[#C2A267]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Mô phỏng tương tác
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'practice'
                ? 'text-[#682626] dark:text-[#C2A267] font-semibold border-b-2 border-[#682626] dark:border-[#C2A267]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Ôn luyện & Flashcard
          </button>
          <button
            onClick={() => onSelectTab('notes')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'notes'
                ? 'text-[#682626] dark:text-[#C2A267] font-semibold border-b-2 border-[#682626] dark:border-[#C2A267]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Sổ tay ghi chú
          </button>
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'dashboard'
                ? 'text-[#682626] dark:text-[#C2A267] font-semibold border-b-2 border-[#682626] dark:border-[#C2A267]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Tiến độ học tập
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick search button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 dark:text-stone-300 bg-[#EFE8DD] dark:bg-[#252420] rounded-md border border-[#DFD7CA] dark:border-[#383530] hover:bg-[#E8E0D2] dark:hover:bg-[#2D2A26] transition-colors whitespace-nowrap shrink-0"
            title="Tìm kiếm toàn bộ giáo trình (Phím /)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tìm kiếm</span>
            <kbd className="hidden lg:inline text-[10px] bg-[#E3DBD0] dark:bg-[#33302B] px-1 rounded text-stone-600 dark:text-stone-400 font-mono">/</kbd>
          </button>

          {/* Reader settings */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-[#EFE8DD] dark:hover:bg-[#252420] rounded-md transition-colors"
            title="Cài đặt chế độ đọc & Chống chói"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Streak badge */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-[#8A6328] dark:text-[#C2A267] px-2 py-1 bg-[#967338]/10 dark:bg-[#C2A267]/15 rounded-md">
            <span>{streakCount} ngày chuỗi</span>
          </div>

          {/* Continue button */}
          <button
            onClick={() => onSelectTab('reader')}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#FAF7F0] bg-[#682626] hover:bg-[#541E1E] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] dark:text-[#1B1A18] rounded-md transition-colors shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đọc sách</span>
          </button>
        </div>
      </div>
    </header>
  );
};
