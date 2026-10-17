import React, { useState, useMemo } from 'react';
import { FileText, Download, Trash2, Edit2, Search, ExternalLink, Bookmark, Check, Plus } from 'lucide-react';
import { Note, Highlight } from '../../types/textbook';
import { CHAPTER_SECTIONS } from '../../content/chaptersData';

interface NotesManagerProps {
  notes: Note[];
  highlights: Highlight[];
  onAddNote: (note: { sectionId: string; sectionTitle: string; title: string; content: string }) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
  onDeleteHighlight: (id: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const NotesManager: React.FC<NotesManagerProps> = ({
  notes,
  highlights,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onDeleteHighlight,
  onNavigateToSection,
}) => {
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      const matchSec = selectedSectionFilter === 'all' || n.sectionId === selectedSectionFilter;
      const matchQ = !searchQuery.trim() ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSec && matchQ;
    });
  }, [notes, selectedSectionFilter, searchQuery]);

  const filteredHighlights = useMemo(() => {
    return highlights.filter(h => {
      const matchSec = selectedSectionFilter === 'all' || h.sectionId === selectedSectionFilter;
      const matchQ = !searchQuery.trim() || h.text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSec && matchQ;
    });
  }, [highlights, selectedSectionFilter, searchQuery]);

  const handleStartEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = (id: string) => {
    onUpdateNote(id, {
      title: editTitle.trim(),
      content: editContent.trim(),
    });
    setEditingNoteId(null);
  };

  const handleExportMarkdown = () => {
    let md = `# SỔ TAY GHI CHÚ VÀ TRÍCH DẪN — MARX STUDY\n\n`;
    md += `*Xuất ngày: ${new Date().toLocaleDateString('vi-VN')}*\n\n`;
    md += `## 1. Ghi chú cá nhân (${notes.length})\n\n`;
    notes.forEach((n, idx) => {
      md += `### ${idx + 1}. ${n.title}\n`;
      md += `*Vị trí: ${n.sectionTitle}*\n\n`;
      md += `${n.content}\n\n`;
      md += `---\n\n`;
    });

    md += `## 2. Đoạn văn bản đã đánh dấu (${highlights.length})\n\n`;
    highlights.forEach((h, idx) => {
      md += `> "${h.text}"\n\n`;
      if (h.note) md += `*Ghi chú đính kèm:* ${h.note}\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Marx_Study_Notes_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFD7CA] dark:border-[#383530] pb-5">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8A6328] dark:text-[#C2A267]">
            Sổ tay học tập cá nhân
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Ghi chú & Trích đoạn nghiên cứu
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Lưu trữ, tra cứu và xuất toàn bộ ghi chép lý luận của bạn sang định dạng Markdown
          </p>
        </div>

        <button
          onClick={handleExportMarkdown}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#682626] hover:bg-[#541E1E] text-[#FAF7F0] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] dark:text-[#1B1A18] flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Xuất sổ tay (.md)</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <select
          value={selectedSectionFilter}
          onChange={(e) => setSelectedSectionFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-1.5 text-xs rounded-lg border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#23221F] text-stone-800 dark:text-stone-200"
        >
          <option value="all">Tất cả các mục giáo trình</option>
          {CHAPTER_SECTIONS.map(s => (
            <option key={s.id} value={s.id}>
              {s.number}. {s.title}
            </option>
          ))}
        </select>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm trong ghi chú & trích dẫn..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#23221F] text-stone-800 dark:text-stone-200"
          />
        </div>
      </div>

      {/* Notes Section */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#682626] dark:text-[#C2A267]" />
          <span>Ghi chú của bạn ({filteredNotes.length})</span>
        </h3>

        {filteredNotes.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530]">
            Chưa có ghi chú nào phù hợp. Bạn có thể mở mục giáo trình và thêm ghi chú trong bảng điều khiển bên phải.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((n) => (
              <div
                key={n.id}
                className="p-4 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xs space-y-3 flex flex-col justify-between"
              >
                {editingNoteId === n.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full text-xs font-bold p-1.5 border rounded bg-transparent"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="w-full text-xs p-2 border rounded bg-transparent leading-relaxed"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-2 py-1 text-xs text-stone-500"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => handleSaveEdit(n.id)}
                        className="px-3 py-1 text-xs font-semibold bg-[#7F1D1D] text-white rounded"
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug">
                          {n.title}
                        </h4>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleStartEdit(n)}
                            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                            title="Sửa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteNote(n.id)}
                            className="p-1 text-stone-400 hover:text-rose-600"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
                        {n.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-[#DFD7CA]/60 dark:border-[#383530]/60">
                      <button
                        onClick={() => onNavigateToSection(n.sectionId)}
                        className="hover:text-[#682626] dark:hover:text-[#C2A267] transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">{n.sectionTitle}</span>
                      </button>
                      <span>{new Date(n.updatedAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Highlights Section */}
      <div className="space-y-4 pt-6 border-t border-[#DFD7CA] dark:border-[#383530]">
        <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-[#8A6328] dark:text-[#C2A267]" />
          <span>Đoạn trích dẫn sách giáo khoa ({filteredHighlights.length})</span>
        </h3>

        {filteredHighlights.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530]">
            Chưa có trích đoạn nào. Khi đọc sách, bạn có thể quét chọn bất kỳ câu chữ nào để đánh dấu màu sắc!
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHighlights.map((h) => (
              <div
                key={h.id}
                className="p-4 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] flex items-start justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <blockquote className="font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed border-l-2 border-[#8A6328] dark:border-[#C2A267] pl-3">
                    &ldquo;{h.text}&rdquo;
                  </blockquote>
                  {h.note && (
                    <p className="text-stone-500 text-[11px] pl-3">Ghi chú: {h.note}</p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onNavigateToSection(h.sectionId)}
                    className="p-1 text-stone-400 hover:text-[#682626] dark:hover:text-[#C2A267]"
                    title="Mở mục tương ứng"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteHighlight(h.id)}
                    className="p-1 text-stone-400 hover:text-rose-600"
                    title="Xóa đánh dấu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
