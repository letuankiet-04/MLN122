import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Layers, 
  Award, 
  FileText, 
  TrendingUp, 
  PanelLeftClose, 
  PanelLeft, 
  PanelRightClose, 
  PanelRight, 
  Home, 
  Settings, 
  Search 
} from 'lucide-react';
import { useStudyState } from './stores/useStudyStore';
import { CHAPTER_SECTIONS } from './content/chaptersData';
import { Header } from './components/common/Header';
import { SearchModal } from './components/common/SearchModal';
import { TableOfContents } from './components/reader/TableOfContents';
import { StudyCompanion } from './components/reader/StudyCompanion';
import { SectionRenderer } from './components/reader/SectionRenderer';
import { ReaderSettingsModal } from './components/reader/ReaderSettingsModal';
import { BookLibrary } from './components/library/BookLibrary';
import { SimulatorsHub } from './components/interactive/SimulatorsHub';
import { PracticeHub } from './components/practice/PracticeHub';
import { NotesManager } from './components/study/NotesManager';
import { LearningDashboard } from './components/dashboard/LearningDashboard';

export default function App() {
  const {
    currentSectionId,
    setCurrentSectionId,
    completedSections,
    toggleSectionCompletion,
    bookmarks,
    toggleBookmark,
    highlights,
    addHighlight,
    removeHighlight,
    notes,
    addNote,
    updateNote,
    deleteNote,
    readerSettings,
    setReaderSettings,
    flashcardProgress,
    updateCardReview,
    quizHistory,
    addQuizAttempt,
    activeRecallProgress,
    saveActiveRecallAttempt,
    streakCount,
  } = useStudyState();

  const [currentTab, setCurrentTab] = useState<
    'reader' | 'library' | 'simulators' | 'practice' | 'dashboard' | 'notes'
  >('reader');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  // Apply dark mode class to html element
  useEffect(() => {
    if (readerSettings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [readerSettings.theme]);

  // Global hotkeys (e.g. '/' for search, 'b' for bookmark)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'b' || e.key === 'B') {
        toggleBookmark(currentSectionId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionId, toggleBookmark]);

  const activeSection = CHAPTER_SECTIONS.find(s => s.id === currentSectionId) || CHAPTER_SECTIONS[0];

  const handleNavigateToSection = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setCurrentTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeBgClass =
    readerSettings.theme === 'dark'
      ? 'bg-[#171717] text-[#F5F1E8]'
      : readerSettings.theme === 'sepia'
      ? 'bg-[#F4ECD8] text-[#3D3028]'
      : readerSettings.theme === 'focus'
      ? 'bg-[#FAF8F5] text-[#1F1F1F]'
      : 'bg-[#F6F2E9] text-[#292524]';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${themeBgClass}`}>
      {/* Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        streakCount={streakCount}
        readerSettings={readerSettings}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col">
        {/* VIEW 1: BOOKSHELF LIBRARY */}
        {currentTab === 'library' && (
          <BookLibrary
            currentSectionId={currentSectionId}
            completedSections={completedSections}
            bookmarks={bookmarks}
            notesCount={notes.length}
            streakCount={streakCount}
            flashcardProgress={flashcardProgress}
            quizHistory={quizHistory}
            onSelectTab={setCurrentTab}
            onNavigateToSection={handleNavigateToSection}
          />
        )}

        {/* VIEW 2: INTERACTIVE DIGITAL BOOK READER (Signature 3-Column Layout) */}
        {currentTab === 'reader' && (
          <div className="flex-1 flex overflow-hidden relative">
            {/* Left Sidebar: Collapsible Table of Contents */}
            <div
              className={`transition-all duration-300 shrink-0 ${
                isLeftSidebarOpen ? 'w-72 sm:w-80' : 'w-0'
              } overflow-hidden hidden md:block`}
            >
              <div className="w-72 sm:w-80 h-[calc(100vh-3.75rem)] sticky top-15">
                <TableOfContents
                  currentSectionId={currentSectionId}
                  onSelectSection={handleNavigateToSection}
                  completedSections={completedSections}
                  bookmarks={bookmarks}
                  onToggleComplete={toggleSectionCompletion}
                  onToggleBookmark={toggleBookmark}
                />
              </div>
            </div>

            {/* Left Sidebar Toggle Button */}
            <div className="hidden md:block sticky top-20 z-20 h-0">
              <button
                onClick={() => setIsLeftSidebarOpen(prev => !prev)}
                className={`p-1.5 rounded-r-md border border-l-0 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 shadow-xs transition-colors`}
                title={isLeftSidebarOpen ? 'Thu gọn mục lục' : 'Mở rộng mục lục'}
              >
                {isLeftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Center: Textbook Content Reader */}
            <div className="flex-1 overflow-y-auto min-h-[calc(100vh-3.75rem)]">
              {/* Mobile Table of Contents Quick Drawer Selector */}
              <div className="md:hidden px-4 py-3 bg-stone-100/70 dark:bg-stone-800/70 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-stone-400 block text-[10px]">Đang đọc</span>
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 truncate max-w-[220px]">
                    {activeSection.number}. {activeSection.title}
                  </span>
                </div>
                <select
                  value={currentSectionId}
                  onChange={(e) => handleNavigateToSection(e.target.value)}
                  className="text-xs p-1.5 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                >
                  {CHAPTER_SECTIONS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.number}. {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reader Document */}
              <SectionRenderer
                section={activeSection}
                onNavigateSection={handleNavigateToSection}
                isCompleted={completedSections.includes(activeSection.id)}
                isBookmarked={bookmarks.includes(activeSection.id)}
                onToggleComplete={() => toggleSectionCompletion(activeSection.id)}
                onToggleBookmark={() => toggleBookmark(activeSection.id)}
                onAddHighlight={(text, color) => addHighlight({
                  sectionId: activeSection.id,
                  text,
                  color,
                })}
                readerSettings={readerSettings}
              />
            </div>

            {/* Right Sidebar Toggle Button */}
            <div className="hidden lg:block sticky top-20 z-20 h-0">
              <button
                onClick={() => setIsRightSidebarOpen(prev => !prev)}
                className={`p-1.5 rounded-l-md border border-r-0 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 shadow-xs transition-colors`}
                title={isRightSidebarOpen ? 'Thu gọn sổ tay bên phải' : 'Mở sổ tay bên phải'}
              >
                {isRightSidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Right Sidebar: Study Companion */}
            <div
              className={`transition-all duration-300 shrink-0 ${
                isRightSidebarOpen ? 'w-80' : 'w-0'
              } overflow-hidden hidden lg:block`}
            >
              <div className="w-80 h-[calc(100vh-3.75rem)] sticky top-15">
                <StudyCompanion
                  currentSectionId={currentSectionId}
                  notes={notes}
                  highlights={highlights}
                  onAddNote={addNote}
                  onDeleteNote={deleteNote}
                  onSelectTerm={(termId) => {
                    setCurrentTab('practice');
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SIMULATORS & INTERACTIVE EXPERIMENTS */}
        {currentTab === 'simulators' && (
          <SimulatorsHub onNavigateToSection={handleNavigateToSection} />
        )}

        {/* VIEW 4: PRACTICE & EXAM PREPARATION */}
        {currentTab === 'practice' && (
          <PracticeHub
            flashcardProgress={flashcardProgress}
            onUpdateReview={updateCardReview}
            onAddQuizAttempt={addQuizAttempt}
            onSaveActiveRecall={saveActiveRecallAttempt}
            activeRecallProgress={activeRecallProgress}
            onNavigateToSection={handleNavigateToSection}
          />
        )}

        {/* VIEW 5: PERSONAL STUDY NOTEBOOK */}
        {currentTab === 'notes' && (
          <NotesManager
            notes={notes}
            highlights={highlights}
            onAddNote={addNote}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
            onDeleteHighlight={removeHighlight}
            onNavigateToSection={handleNavigateToSection}
          />
        )}

        {/* VIEW 6: LEARNING DASHBOARD */}
        {currentTab === 'dashboard' && (
          <LearningDashboard
            completedSections={completedSections}
            bookmarks={bookmarks}
            flashcardProgress={flashcardProgress}
            quizHistory={quizHistory}
            streakCount={streakCount}
            onNavigateToSection={handleNavigateToSection}
            onSelectTab={setCurrentTab}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (≤ 15% mobile viewport) */}
      <nav className="md:hidden sticky bottom-0 z-40 bg-[#FFFDF8] dark:bg-[#1D1C19] border-t border-[#E7E1D6] dark:border-[#383632] px-2 py-1.5 flex items-center justify-around text-[10px]">
        <button
          onClick={() => setCurrentTab('library')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentTab === 'library' ? 'text-[#7F1D1D] dark:text-[#E2B765] font-bold' : 'text-stone-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Kệ sách</span>
        </button>
        <button
          onClick={() => setCurrentTab('reader')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentTab === 'reader' ? 'text-[#7F1D1D] dark:text-[#E2B765] font-bold' : 'text-stone-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Đọc sách</span>
        </button>
        <button
          onClick={() => setCurrentTab('simulators')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentTab === 'simulators' ? 'text-[#7F1D1D] dark:text-[#E2B765] font-bold' : 'text-stone-500'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mô phỏng</span>
        </button>
        <button
          onClick={() => setCurrentTab('practice')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentTab === 'practice' ? 'text-[#7F1D1D] dark:text-[#E2B765] font-bold' : 'text-stone-500'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Ôn luyện</span>
        </button>
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentTab === 'dashboard' ? 'text-[#7F1D1D] dark:text-[#E2B765] font-bold' : 'text-stone-500'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Tiến độ</span>
        </button>
      </nav>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToSection={handleNavigateToSection}
      />

      <ReaderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={readerSettings}
        onUpdateSettings={(newSettings) => setReaderSettings(prev => ({ ...prev, ...newSettings }))}
      />
    </div>
  );
}
