import { useState, useEffect } from 'react';
import { Highlight, Note, ReaderSettings } from '../types/textbook';

const STORAGE_KEYS = {
  CURRENT_SECTION: 'marx_study_current_section',
  COMPLETED_SECTIONS: 'marx_study_completed_sections',
  BOOKMARKS: 'marx_study_bookmarks',
  HIGHLIGHTS: 'marx_study_highlights',
  NOTES: 'marx_study_notes',
  READER_SETTINGS: 'marx_study_reader_settings',
  FLASHCARD_PROGRESS: 'marx_study_flashcard_progress',
  QUIZ_HISTORY: 'marx_study_quiz_history',
  ACTIVE_RECALL_PROGRESS: 'marx_study_active_recall',
  LAST_ACTIVE_DATE: 'marx_study_last_active_date',
  STREAK_COUNT: 'marx_study_streak_count',
};

const defaultSettings: ReaderSettings = {
  theme: 'paper',
  fontSize: 'md',
  lineHeight: 'relaxed',
  contentWidth: 'normal',
  fontFamily: 'serif',
  eyeCareMode: true,
};

export interface FlashcardProgress {
  [cardId: string]: {
    repetitions: number;
    interval: number;
    easeFactor: number;
    dueDate: string;
    lastQuality?: number;
    lastReviewed?: string;
  };
}

export interface QuizAttempt {
  id: string;
  timestamp: string;
  topic: string;
  score: number;
  total: number;
  timeSpentSeconds: number;
  incorrectQuestionIds: string[];
}

export interface ActiveRecallAttempt {
  itemId: string;
  userAnswer: string;
  selfRating: 'good' | 'medium' | 'poor';
  date: string;
}

export function useStudyState() {
  const [currentSectionId, setCurrentSectionId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_SECTION) || '3.1.1';
  });

  const [completedSections, setCompletedSections] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_SECTIONS);
      return saved ? JSON.parse(saved) : ['3.1'];
    } catch {
      return ['3.1'];
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : ['3.1.1'];
    } catch {
      return ['3.1.1'];
    }
  });

  const [highlights, setHighlights] = useState<Highlight[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'hl-demo-1',
          sectionId: '3.1.1',
          text: 'Giá trị thặng dư là bộ phận giá trị mới dôi ra ngoài giá trị sức lao động do người lao động làm thuê tạo ra và bị nhà tư bản chiếm đoạt không bồi hoàn.',
          color: 'yellow',
          note: 'Định nghĩa cốt lõi cần thuộc lòng khi thi',
          createdAt: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      return saved ? JSON.parse(saved) : [
        {
          id: 'note-1',
          sectionId: '3.1.1',
          sectionTitle: '3.1.1. Nguồn gốc của giá trị thặng dư',
          title: 'Điểm mấu chốt: Sự chuyển hóa của tiền thành tư bản',
          content: 'Tiền chỉ là tư bản khi nó mang lại giá trị thặng dư bằng cách mua một hàng hóa đặc biệt là sức lao động. Phân biệt rõ H-T-H (mục đích giá trị sử dụng) và T-H-T\' (mục đích là giá trị và giá trị thặng dư).',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.READER_SETTINGS);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [flashcardProgress, setFlashcardProgress] = useState<FlashcardProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FLASHCARD_PROGRESS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'quiz-init-1',
          timestamp: new Date(Date.now() - 3600 * 24 * 1000).toISOString(),
          topic: 'Nguồn gốc giá trị thặng dư',
          score: 4,
          total: 5,
          timeSpentSeconds: 145,
          incorrectQuestionIds: ['q-calc-1'],
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeRecallProgress, setActiveRecallProgress] = useState<Record<string, ActiveRecallAttempt>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_RECALL_PROGRESS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [streakCount, setStreakCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK_COUNT);
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_SECTION, currentSectionId);
  }, [currentSectionId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_SECTIONS, JSON.stringify(completedSections));
  }, [completedSections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.READER_SETTINGS, JSON.stringify(readerSettings));
  }, [readerSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FLASHCARD_PROGRESS, JSON.stringify(flashcardProgress));
  }, [flashcardProgress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(quizHistory));
  }, [quizHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_RECALL_PROGRESS, JSON.stringify(activeRecallProgress));
  }, [activeRecallProgress]);

  // Streak verification on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);
    if (!lastDate) {
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
    } else if (lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate === yesterday) {
        setStreakCount(prev => {
          const next = prev + 1;
          localStorage.setItem(STORAGE_KEYS.STREAK_COUNT, next.toString());
          return next;
        });
      }
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
    }
  }, []);

  const toggleSectionCompletion = (sectionId: string) => {
    setCompletedSections(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  const toggleBookmark = (sectionId: string) => {
    setBookmarks(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  const addHighlight = (highlight: Omit<Highlight, 'id' | 'createdAt'>) => {
    const newHighlight: Highlight = {
      ...highlight,
      id: `hl-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
    };
    setHighlights(prev => [newHighlight, ...prev]);
    return newHighlight;
  };

  const removeHighlight = (id: string) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // SM-2 Review update algorithm
  const updateCardReview = (cardId: string, quality: number) => {
    // quality: 0 (blackout) to 5 (perfect)
    setFlashcardProgress(prev => {
      const current = prev[cardId] || {
        repetitions: 0,
        interval: 1,
        easeFactor: 2.5,
        dueDate: new Date().toISOString(),
      };

      let { repetitions, interval, easeFactor } = current;

      if (quality >= 3) {
        if (repetitions === 0) {
          interval = 1;
        } else if (repetitions === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
      } else {
        repetitions = 0;
        interval = 1;
      }

      easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      if (easeFactor < 1.3) easeFactor = 1.3;

      const nextDue = new Date(Date.now() + interval * 86400000).toISOString();

      return {
        ...prev,
        [cardId]: {
          repetitions,
          interval,
          easeFactor,
          dueDate: nextDue,
          lastQuality: quality,
          lastReviewed: new Date().toISOString(),
        },
      };
    });
  };

  const addQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'timestamp'>) => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: `qa-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setQuizHistory(prev => [newAttempt, ...prev]);
  };

  const saveActiveRecallAttempt = (itemId: string, userAnswer: string, selfRating: 'good' | 'medium' | 'poor') => {
    setActiveRecallProgress(prev => ({
      ...prev,
      [itemId]: {
        itemId,
        userAnswer,
        selfRating,
        date: new Date().toISOString(),
      },
    }));
  };

  return {
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
  };
}
