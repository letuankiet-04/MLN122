import React from 'react';
import { BookOpen, Search, Settings, Sparkles } from 'lucide-react';
import { ReaderSettings } from '../../types/textbook';

interface HeaderProps {
  currentTab: 'reader' | 'library' | 'simulators' | 'practice' | 'dashboard' | 'notes';
  onSelectTab: (tab: 'reader' | 'library' | 'simulators' | 'practice' | 'dashboard' | 'notes') => void;
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
        ? 'bg-[#1D1C19] border-[#33312E] text-[#F5F1E8]' 
        : readerSettings.theme === 'sepia'
        ? 'bg-[#F7EFE1] border-[#E5DAC3] text-[#3D3028]'
        : 'bg-[#FFFDF8] border-[#E7E1D6] text-[#292524]'
    }`}>
      {/* Top Bar Contract: 3 zones, gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('reader')}
          className="flex items-center gap-2.5 text-left text-lg font-serif font-bold tracking-tight text-[#7F1D1D] dark:text-[#E2B765] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
        >
          <span className="w-8 h-8 rounded bg-[#7F1D1D] text-[#F6F2E9] dark:bg-[#B78C45] dark:text-[#171717] flex items-center justify-center text-sm font-sans font-bold shadow-xs">
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
                ? 'text-[#7F1D1D] dark:text-[#E2B765] font-semibold border-b-2 border-[#7F1D1D] dark:border-[#E2B765]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Giáo trình số
          </button>
          <button
            onClick={() => onSelectTab('simulators')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'simulators'
                ? 'text-[#7F1D1D] dark:text-[#E2B765] font-semibold border-b-2 border-[#7F1D1D] dark:border-[#E2B765]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Mô phỏng tương tác
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'practice'
                ? 'text-[#7F1D1D] dark:text-[#E2B765] font-semibold border-b-2 border-[#7F1D1D] dark:border-[#E2B765]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Ôn luyện & Flashcard
          </button>
          <button
            onClick={() => onSelectTab('notes')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'notes'
                ? 'text-[#7F1D1D] dark:text-[#E2B765] font-semibold border-b-2 border-[#7F1D1D] dark:border-[#E2B765]'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Sổ tay ghi chú
          </button>
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'dashboard'
                ? 'text-[#7F1D1D] dark:text-[#E2B765] font-semibold border-b-2 border-[#7F1D1D] dark:border-[#E2B765]'
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-100/80 dark:bg-stone-800/80 rounded-md border border-stone-200/80 dark:border-stone-700 hover:bg-stone-200/70 dark:hover:bg-stone-700/70 transition-colors whitespace-nowrap shrink-0"
            title="Tìm kiếm toàn bộ giáo trình (Phím /)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tìm kiếm</span>
            <kbd className="hidden lg:inline text-[10px] bg-stone-200 dark:bg-stone-700 px-1 rounded text-stone-500 dark:text-stone-400 font-mono">/</kbd>
          </button>

          {/* Reader settings */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors"
            title="Cài đặt chế độ đọc"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Streak badge */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-[#B78C45] dark:text-[#E2B765] px-2 py-1 bg-[#B78C45]/10 rounded-md">
            <span>{streakCount} ngày chuỗi</span>
          </div>

          {/* Continue button */}
          <button
            onClick={() => onSelectTab('reader')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#7F1D1D] hover:bg-[#681818] dark:bg-[#B78C45] dark:hover:bg-[#9E7535] dark:text-[#171717] rounded-md transition-colors shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đọc sách</span>
          </button>
        </div>
      </div>
    </header>
  );
};
