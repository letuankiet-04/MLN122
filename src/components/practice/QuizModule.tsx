import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, XCircle, Clock, RotateCcw, ArrowRight, HelpCircle, BookOpen, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../../content/quizData';
import { QuizQuestion } from '../../types/textbook';

interface QuizModuleProps {
  onAddAttempt: (attempt: {
    topic: string;
    score: number;
    total: number;
    timeSpentSeconds: number;
    incorrectQuestionIds: string[];
  }) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  onAddAttempt,
  onNavigateToSection,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | '3.1.1' | '3.1.2' | '3.1.3' | '3.2'>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | boolean | string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    if (activeFilter === 'all') return true;
    return q.sectionId === activeFilter;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSubmitted) {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, isSubmitted]);

  const handleSelectAnswer = (ans: number | boolean | string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: ans }));
  };

  const handleFinishQuiz = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    const incorrectIds: string[] = [];

    filteredQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectIds.push(q.id);
      }
    });

    onAddAttempt({
      topic: activeFilter === 'all' ? 'Tổng hợp toàn chương 3' : `Mục ${activeFilter}`,
      score: correctCount,
      total: filteredQuestions.length,
      timeSpentSeconds: elapsedSeconds,
      incorrectQuestionIds: incorrectIds,
    });

    if (correctCount / filteredQuestions.length >= 0.8) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setStartTime(Date.now());
    setElapsedSeconds(0);
  };

  const scoreCount = filteredQuestions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const accuracy = Math.round((scoreCount / filteredQuestions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E1D6] dark:border-[#383632] pb-5">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7F1D1D] dark:text-[#E2B765]">
            Đề thi & Kiểm tra trắc nghiệm
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Luyện thi trắc nghiệm học phần Kinh tế chính trị
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Bộ câu hỏi bám sát chuẩn đầu ra, có lời giải chi tiết và liên kết trực tiếp với mục sách
          </p>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] rounded-lg text-xs font-mono font-semibold text-stone-700 dark:text-stone-300">
          <Clock className="w-4 h-4 text-[#8A6328] dark:text-[#C2A267]" />
          <span>{Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { id: 'all', label: 'Tất cả câu hỏi' },
          { id: '3.1.1', label: 'Mục 3.1.1 (Nguồn gốc m)' },
          { id: '3.1.2', label: 'Mục 3.1.2 (Bản chất m)' },
          { id: '3.1.3', label: 'Mục 3.1.3 (Phương pháp sản xuất)' },
          { id: '3.2', label: 'Mục 3.2 (CMCN 4.0 & VN)' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveFilter(tab.id as any);
              handleRestart();
            }}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
              activeFilter === tab.id
                ? 'bg-[#682626] text-[#FAF7F0] font-semibold dark:bg-[#C2A267] dark:text-[#1B1A18]'
                : 'bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300 hover:bg-[var(--bg-subtle)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Screen if Submitted */}
      {isSubmitted ? (
        <div className="p-8 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] dark:border-[var(--border-color)] shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-full bg-[#967338]/10 dark:bg-[#C2A267]/15 text-[#8A6328] dark:text-[#C2A267] mb-2">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Kết quả bài thi trắc nghiệm
            </h3>
            <p className="text-xs text-stone-500">
              Bạn đã hoàn thành bài thi trong {Math.floor(elapsedSeconds / 60)} phút {elapsedSeconds % 60} giây
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700">
              <span className="text-[11px] text-stone-500 block">Số câu đúng</span>
              <span className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {scoreCount} / {filteredQuestions.length}
              </span>
            </div>
            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700">
              <span className="text-[11px] text-stone-500 block">Tỷ lệ chính xác</span>
              <span className="text-2xl font-serif font-bold text-[#7F1D1D] dark:text-[#E2B765] tabular-nums">
                {accuracy}%
              </span>
            </div>
            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700">
              <span className="text-[11px] text-stone-500 block">Đánh giá học thuật</span>
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                {accuracy >= 80 ? 'Xuất sắc (Vững vàng)' : accuracy >= 60 ? 'Đạt yêu cầu' : 'Cần đọc lại giáo trình'}
              </span>
            </div>
          </div>

          {/* Review Each Question with Rationale */}
          <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-700">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              Chi tiết giải trình và căn cứ sách giáo khoa:
            </h4>
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-serif font-bold text-stone-900 dark:text-stone-100">
                        Câu {idx + 1}: {q.question}
                      </span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                          <CheckCircle className="w-4 h-4" /> Đúng
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold shrink-0">
                          <XCircle className="w-4 h-4" /> Sai
                        </span>
                      )}
                    </div>

                    {q.calculationSteps && (
                      <div className="p-2.5 bg-white dark:bg-stone-900 rounded-md border border-stone-200 dark:border-stone-800 space-y-1">
                        <span className="font-semibold text-stone-800 dark:text-stone-200 block">Các bước tính toán:</span>
                        {q.calculationSteps.map((st, i) => (
                          <div key={i} className="text-stone-600 dark:text-stone-400 font-mono text-[11px]">{st}</div>
                        ))}
                      </div>
                    )}

                    <div className="text-stone-700 dark:text-stone-300">
                      <strong>Giải thích:</strong> {q.explanation}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onNavigateToSection(q.sectionId)}
                        className="text-[#7F1D1D] dark:text-[#E2B765] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Xem lại mục {q.sectionId} trong sách</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-lg bg-[#682626] hover:bg-[#541E1E] text-[#FAF7F0] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] dark:text-[#1B1A18] font-semibold text-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài thi</span>
            </button>
          </div>
        </div>
      ) : (
        /* Question Card */
        <div className="p-6 sm:p-8 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] dark:border-[var(--border-color)] shadow-sm space-y-6">
          {/* Question Index & Meta */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>
              Câu hỏi {currentIndex + 1} / {filteredQuestions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                {currentQ.topic}
              </span>
              <span>·</span>
              <span className="text-[11px] bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] px-2 py-0.5 rounded text-stone-600 dark:text-stone-400">
                {currentQ.difficulty}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options?.map((opt, idx) => {
              const isSelected = userAnswers[currentQ.id] === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-[#682626] dark:border-[#C2A267] bg-[#682626]/10 dark:bg-[#C2A267]/15 text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                      : 'border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)]/60 dark:bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-subtle)] dark:hover:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                    isSelected
                      ? 'border-[#682626] bg-[#682626] text-white dark:border-[#C2A267] dark:bg-[#C2A267] dark:text-[#1B1A18]'
                      : 'border-[var(--border-color)] dark:border-[var(--border-color)] text-stone-500 bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)]'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] dark:border-[var(--border-color)]">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] disabled:opacity-30 hover:bg-[var(--bg-subtle)] dark:hover:bg-[var(--bg-subtle)] text-stone-700 dark:text-stone-300"
            >
              Câu trước
            </button>

            {currentIndex < filteredQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#682626] hover:bg-[#541E1E] text-[#FAF7F0] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] dark:text-[#1B1A18] flex items-center gap-1.5 transition-colors"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#2D5A34] hover:bg-[#234729] text-[#FAF7F0] dark:bg-[#88B88E] dark:hover:bg-[#78A87E] dark:text-[#142316] shadow-xs transition-colors"
              >
                Nộp bài thi & Xem giải thích
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
