import React, { useState } from 'react';
import { FileText, Bookmark, BookOpen, Bot, Plus, Trash2, ExternalLink, Lightbulb, Sparkles } from 'lucide-react';
import { Note, Highlight } from '../../types/textbook';
import { GLOSSARY_TERMS } from '../../content/glossaryData';
import { CHAPTER_SECTIONS } from '../../content/chaptersData';
import { KnowledgeVideo } from '../../types/video';
import { getVideosBySectionId } from '../../content/knowledgeVideosData';
import { Play } from 'lucide-react';

interface StudyCompanionProps {
  currentSectionId: string;
  notes: Note[];
  highlights: Highlight[];
  onAddNote: (note: { sectionId: string; sectionTitle: string; title: string; content: string }) => void;
  onDeleteNote: (id: string) => void;
  onSelectTerm: (termId: string) => void;
  onPlayVideo?: (video: KnowledgeVideo) => void;
}

export const StudyCompanion: React.FC<StudyCompanionProps> = ({
  currentSectionId,
  notes,
  highlights,
  onAddNote,
  onDeleteNote,
  onSelectTerm,
  onPlayVideo,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'glossary' | 'tutor'>('notes');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // AI Tutor / Study Guide Pre-configured Prompts
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorResponse, setTutorResponse] = useState<string | null>(null);

  const currentSection = CHAPTER_SECTIONS.find(s => s.id === currentSectionId);
  const sectionNotes = notes.filter(n => n.sectionId === currentSectionId);
  const sectionHighlights = highlights.filter(h => h.sectionId === currentSectionId);
  const relatedTerms = GLOSSARY_TERMS.filter(t => t.relatedSectionId === currentSectionId);
  const sectionVideos = getVideosBySectionId(currentSectionId);
  const companionVideo = sectionVideos.length > 0 ? sectionVideos[0] : null;

  const handleSaveNote = () => {
    if (!newNoteContent.trim() || !currentSection) return;
    onAddNote({
      sectionId: currentSection.id,
      sectionTitle: `${currentSection.number} ${currentSection.title}`,
      title: newNoteTitle.trim() || 'Ghi chú học tập',
      content: newNoteContent.trim(),
    });
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  const handleAskTutor = (actionType: string) => {
    if (!currentSection) return;

    if (actionType === 'explain') {
      setTutorResponse(
        `[Giải thích dễ hiểu theo giáo trình - Mục ${currentSection.number}]:\n\n` +
        `Trọng tâm của phần này xoay quanh câu hỏi cốt lõi: ${currentSection.summary}\n\n` +
        `• Điểm dễ nhớ nhất: Tư bản không tự nhiên sinh ra tiền. Để có giá trị thặng dư m, nhà tư bản bắt buộc phải thuê người làm công ăn lương. Khi công nhân làm việc, họ vừa bù đắp tiền lương của mình (v) vừa làm thêm giờ không công (m) cho chủ xưởng.`
      );
    } else if (actionType === 'formula') {
      setTutorResponse(
        `[Hướng dẫn giải công thức - Mục ${currentSection.number}]:\n\n` +
        `• Tỷ suất giá trị thặng dư: m′ = (m / v) × 100% hoặc m′ = (t′ / t) × 100%.\n` +
        `• Nhớ quy tắc: m luôn là phần thặng dư dôi ra, v là tiền thuê sức lao động. Càng bóc lột nhiều thì m′ càng cao.\n` +
        `• Ví dụ mẫu: v = 15 USD, m = 15 USD => m′ = (15 / 15) × 100% = 100%.`
      );
    } else if (actionType === 'exam_tip') {
      setTutorResponse(
        `[Mẹo làm bài thi học phần - Mục ${currentSection.number}]:\n\n` +
        `1. Khi câu hỏi yêu cầu phân biệt m và lợi nhuận (p), hãy nhớ nhấn mạnh: m là bản chất bên trong do v sinh ra, còn p là hình thức biểu hiện bề ngoài bị ngộ nhận do k = c + v sinh ra.\n` +
        `2. Không bao giờ viết "máy móc tự tạo ra giá trị mới". Máy móc thuộc c, chỉ chuyển giá trị cũ!`
      );
    }
  };

  return (
    <aside className="w-full h-full flex flex-col bg-[var(--bg-sidebar)]/80 dark:bg-[var(--bg-sidebar)]/80 border-l border-[var(--border-color)] dark:border-[var(--border-color)]">
      {/* Video Quick Action Pill if video available */}
      {companionVideo && onPlayVideo && (
        <div className="p-2.5 bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] border-b border-[var(--border-color)] dark:border-[var(--border-color)] flex items-center justify-between gap-2 shrink-0">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-[#8A6328] dark:text-[#C2A267] tracking-wider block">
              🎬 Video bài học ({companionVideo.formattedDuration})
            </span>
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate block">
              {companionVideo.title}
            </span>
          </div>
          <button
            onClick={() => onPlayVideo(companionVideo)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#682626] hover:bg-[#541E1E] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] text-[#FAF7F0] dark:text-[#1B1A18] text-[11px] font-semibold transition-colors shrink-0 shadow-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Xem</span>
          </button>
        </div>
      )}

      {/* Companion Tabs Header */}
      <div className="flex border-b border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-sidebar)] dark:bg-[#201F1B]">
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2.5 px-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'notes'
              ? 'border-[#682626] dark:border-[#C2A267] text-[#682626] dark:text-[#C2A267] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)]'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Ghi chú ({sectionNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('glossary')}
          className={`flex-1 py-2.5 px-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'glossary'
              ? 'border-[#682626] dark:border-[#C2A267] text-[#682626] dark:text-[#C2A267] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)]'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Thuật ngữ ({relatedTerms.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tutor')}
          className={`flex-1 py-2.5 px-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'tutor'
              ? 'border-[#682626] dark:border-[#C2A267] text-[#682626] dark:text-[#C2A267] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)]'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Trợ lý học</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: NOTES & HIGHLIGHTS */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                Ghi chép cho bài đang học
              </span>
              <button
                onClick={() => setIsAddingNote(true)}
                className="px-2 py-1 text-[11px] font-semibold text-[#682626] dark:text-[#C2A267] hover:bg-[#682626]/10 rounded flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Thêm ghi chú</span>
              </button>
            </div>

            {/* Add Note Form */}
            {isAddingNote && (
              <div className="p-3 bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] shadow-xs space-y-2 animate-in fade-in duration-150">
                <input
                  type="text"
                  placeholder="Tiêu đề ghi chú (tùy chọn)"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full text-xs font-semibold px-2 py-1 border rounded bg-transparent border-[var(--border-color)] dark:border-[var(--border-color)]"
                />
                <textarea
                  placeholder="Nhập suy nghĩ, công thức hoặc lưu ý cần nhớ..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2 border rounded bg-transparent border-[var(--border-color)] dark:border-[var(--border-color)] leading-relaxed"
                />
                <div className="flex justify-end gap-1.5 pt-1">
                  <button
                    onClick={() => setIsAddingNote(false)}
                    className="px-2 py-1 text-[11px] text-stone-500 hover:text-stone-700"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-3 py-1 text-[11px] font-semibold bg-[#682626] text-[#FAF7F0] dark:bg-[#C2A267] dark:text-[#1B1A18] rounded"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            )}

            {/* Note List */}
            {sectionNotes.length === 0 && !isAddingNote ? (
              <div className="p-4 text-center text-xs text-stone-400">
                Chưa có ghi chú nào cho mục này. Nhấn &quot;Thêm ghi chú&quot; để lưu lại kiến thức quan trọng!
              </div>
            ) : (
              sectionNotes.map((n) => (
                <div
                  key={n.id}
                  className="p-3 bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] shadow-2xs space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                      {n.title}
                    </span>
                    <button
                      onClick={() => onDeleteNote(n.id)}
                      className="p-1 text-stone-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                      title="Xóa ghi chú"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
                    {n.content}
                  </p>
                  <span className="text-[10px] text-stone-400 block pt-1">
                    {new Date(n.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              ))
            )}

            {/* Highlights section */}
            {sectionHighlights.length > 0 && (
              <div className="pt-3 border-t border-[var(--border-color)] dark:border-[var(--border-color)] space-y-2">
                <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 block">
                  Đoạn trích đã đánh dấu:
                </span>
                {sectionHighlights.map((hl) => (
                  <div
                    key={hl.id}
                    className="p-2.5 rounded-lg border border-[#DFD5C0] dark:border-[#3D3728] bg-[#F5EFE0]/80 dark:bg-[#2A271E] text-xs italic text-stone-800 dark:text-stone-200"
                  >
                    &ldquo;{hl.text}&rdquo;
                    {hl.note && <div className="text-[10px] text-[#5A451E] dark:text-[#CBB27A] font-sans mt-1">Ghi chú: {hl.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GLOSSARY TERMS */}
        {activeTab === 'glossary' && (
          <div className="space-y-3">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 block">
              Thuật ngữ kinh tế trong mục này
            </span>
            {relatedTerms.length === 0 ? (
              <div className="p-4 text-center text-xs text-stone-400">
                Không có thuật ngữ chuyên biệt gắn trực tiếp với mục này.
              </div>
            ) : (
              relatedTerms.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onSelectTerm(t.id)}
                  className="p-3 bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] hover:border-[#682626]/50 dark:hover:border-[#C2A267]/50 transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                      {t.term} {t.symbol && `(${t.symbol})`}
                    </span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 line-clamp-2">
                    {t.definition}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: SMART STUDY ASSISTANT */}
        {activeTab === 'tutor' && (
          <div className="space-y-3">
            <div className="p-2.5 bg-[#967338]/10 dark:bg-[#C2A267]/15 rounded-lg border border-[#967338]/20 dark:border-[#C2A267]/30 text-[11px] text-stone-700 dark:text-stone-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#8A6328] dark:text-[#C2A267] shrink-0 mt-0.5" />
              <div>
                <strong>Trợ lý học thuật Mác – Lênin (Offline-grounded):</strong> Cung cấp hướng dẫn, giải mã công thức và gợi ý ôn thi bám sát 100% nội dung giáo trình.
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-stone-500 block">Hành động gợi ý:</span>
              <button
                onClick={() => handleAskTutor('explain')}
                className="w-full text-left p-2 rounded-md bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] border border-[var(--border-color)] dark:border-[var(--border-color)] hover:bg-[var(--bg-subtle)] text-xs text-stone-800 dark:text-stone-200 transition-colors"
              >
                💡 Giải thích dễ hiểu phần này
              </button>
              <button
                onClick={() => handleAskTutor('formula')}
                className="w-full text-left p-2 rounded-md bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] border border-[var(--border-color)] dark:border-[var(--border-color)] hover:bg-[var(--bg-subtle)] text-xs text-stone-800 dark:text-stone-200 transition-colors"
              >
                📐 Hướng dẫn công thức & bài toán
              </button>
              <button
                onClick={() => handleAskTutor('exam_tip')}
                className="w-full text-left p-2 rounded-md bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] border border-[var(--border-color)] dark:border-[var(--border-color)] hover:bg-[var(--bg-subtle)] text-xs text-stone-800 dark:text-stone-200 transition-colors"
              >
                🎯 Trọng tâm câu hỏi thi học phần
              </button>
            </div>

            {tutorResponse && (
              <div className="mt-3 p-3 bg-[var(--bg-surface)] dark:bg-[var(--bg-subtle)] rounded-lg border border-[#682626]/20 dark:border-[#C2A267]/30 text-xs text-stone-800 dark:text-stone-200 whitespace-pre-line leading-relaxed shadow-xs animate-in fade-in duration-150">
                {tutorResponse}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
