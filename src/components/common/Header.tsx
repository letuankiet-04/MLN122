import React from 'react';
import { BookOpen, Search, Settings, Sun, Moon, Flame, Eye } from 'lucide-react';
import { ReaderSettings, ReaderTheme } from '../../types/textbook';

interface HeaderProps {
  currentTab: 'reader' | 'videos' | 'library' | 'simulators' | 'practice' | 'dashboard' | 'notes';
  onSelectTab: (tab: 'reader' | 'videos' | 'library' | 'simulators' | 'practice' | 'dashboard' | 'notes') => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  streakCount: number;
  readerSettings: ReaderSettings;
  onToggleTheme?: (nextTheme: ReaderTheme) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  onOpenSettings,
  streakCount,
  readerSettings,
  onToggleTheme,
}) => {
  const isDark = readerSettings.theme === 'dark';

  const cycleTheme = () => {
    if (!onToggleTheme) return;
    const themes: ReaderTheme[] = ['paper', 'dark', 'sepia', 'focus'];
    const currentIdx = themes.indexOf(readerSettings.theme);
    const next = themes[(currentIdx + 1) % themes.length];
    onToggleTheme(next);
  };

  const themeLabelMap: Record<ReaderTheme, string> = {
    paper: 'Giấy ngà',
    dark: 'Nền tối',
    sepia: 'Ấm áp',
    focus: 'Tập trung',
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-surface)]/95 text-[var(--text-primary)] backdrop-blur-md shadow-[0_2px_16px_rgba(52,39,28,0.04)] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with Crest */}
        <button
          onClick={() => onSelectTab('library')}
          className="flex items-center gap-3 text-left group hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#682626] dark:bg-[#C2A267] flex items-center justify-center text-[#FAF7F0] dark:text-[#191817] shadow-sm group-hover:shadow-md transition-shadow">
            <div className="w-full h-full rounded-[10px] flex items-center justify-center">
              <BookOpen className="w-5 h-5" strokeWidth={1.8} />
            </div>
          </div>
          <div>
            <div className="text-base font-serif font-extrabold tracking-tight text-[#682626] dark:text-[#C2A267] flex items-center gap-1.5 leading-none">
              <span>MARX STUDY</span>
            </div>
            <span className="hidden sm:block text-[10px] text-stone-500 dark:text-stone-400 font-sans tracking-wider mt-0.5">
              MLN122 · GIÁO TRÌNH TƯƠNG TÁC
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links with Sleek Pill Design */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold" aria-label="Điều hướng chính">
          {[
            { id: 'library', label: 'Thư viện' },
            { id: 'reader', label: 'Giáo trình số' },
            { id: 'videos', label: 'Video kiến thức', badge: '10' },
            { id: 'simulators', label: 'Mô phỏng' },
            { id: 'practice', label: 'Ôn luyện & Flashcard' },
            { id: 'notes', label: 'Sổ tay' },
            { id: 'dashboard', label: 'Tiến độ' },
          ].map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id as any)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#682626] text-[#FAF7F0] shadow-xs dark:bg-[#C2A267] dark:text-[#1B1A18] font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black font-bold'
                      : 'bg-[#8A6328]/15 text-[#682626] dark:text-[#C2A267]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Theme Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick search button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs text-stone-700 dark:text-stone-300 bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-color)] hover:brightness-95 transition-colors whitespace-nowrap shadow-2xs"
            title="Tìm kiếm toàn bộ giáo trình (Phím /)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tìm kiếm</span>
            <kbd className="hidden lg:inline text-[10px] bg-[#E3DBD0] dark:bg-[var(--border-color)] px-1 rounded text-stone-600 dark:text-stone-400 font-mono">/</kbd>
          </button>

          {/* Quick Theme Switcher Button */}
          {onToggleTheme && (
            <button
              onClick={cycleTheme}
              className="p-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-[var(--bg-subtle)] dark:hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-color)] dark:hover:border-[var(--border-color)] transition-all flex items-center gap-1 text-xs"
              title={`Đổi nền đọc sách: Hiện tại là ${themeLabelMap[readerSettings.theme]} (Bấm để đổi)`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : readerSettings.theme === 'sepia' ? (
                <Eye className="w-4 h-4 text-amber-600" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700 hover:-rotate-12 transition-transform" />
              )}
            </button>
          )}

          {/* Reader detailed settings */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-[var(--bg-subtle)] dark:hover:bg-[var(--bg-subtle)] rounded-lg transition-colors"
            title="Cài đặt phông chữ, cỡ chữ & Chế độ đọc"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Streak badge */}
          <div className="hidden 2xl:flex items-center gap-1.5 text-xs font-semibold text-[#8A6328] dark:text-[#C2A267] px-2.5 py-1 bg-[#967338]/10 dark:bg-[#C2A267]/15 rounded-lg border border-[#967338]/20 dark:border-[#C2A267]/20">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{streakCount} ngày</span>
          </div>

          {/* Continue reading primary button */}
          <button
            onClick={() => onSelectTab('reader')}
            className="hidden 2xl:flex px-3 py-2 text-xs font-semibold text-[#FAF7F0] bg-[#682626] hover:bg-[#541E1E] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] dark:text-[#1B1A18] rounded-lg transition-all shadow-xs hover:shadow whitespace-nowrap shrink-0 items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đọc sách</span>
          </button>
        </div>
      </div>
    </header>
  );
};
