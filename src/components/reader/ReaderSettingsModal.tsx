import React from 'react';
import { X, Check } from 'lucide-react';
import { ReaderSettings, ReaderTheme, FontSize, ContentWidth } from '../../types/textbook';

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const themes: { id: ReaderTheme; label: string; bg: string; text: string; border: string }[] = [
    { id: 'paper', label: 'Trang giấy (Paper)', bg: 'bg-[#F6F2E9]', text: 'text-[#292524]', border: 'border-[#E7E1D6]' },
    { id: 'sepia', label: 'Ấm áp (Sepia)', bg: 'bg-[#F4ECD8]', text: 'text-[#3D3028]', border: 'border-[#E5DAC3]' },
    { id: 'dark', label: 'Đêm tối (Dark)', bg: 'bg-[#171717]', text: 'text-[#F5F1E8]', border: 'border-[#33312E]' },
    { id: 'focus', label: 'Tập trung (Focus)', bg: 'bg-[#FAF8F5]', text: 'text-[#1F1F1F]', border: 'border-[#DDD8D0]' },
  ];

  const fontSizes: { id: FontSize; label: string; size: string }[] = [
    { id: 'sm', label: 'Nhỏ', size: '14px' },
    { id: 'md', label: 'Chuẩn', size: '16px' },
    { id: 'lg', label: 'Lớn', size: '18px' },
    { id: 'xl', label: 'Rất lớn', size: '20px' },
  ];

  const lineHeights: { id: 'normal' | 'relaxed' | 'loose'; label: string }[] = [
    { id: 'normal', label: 'Gọn (1.5)' },
    { id: 'relaxed', label: 'Vừa (1.75)' },
    { id: 'loose', label: 'Thoáng (2.0)' },
  ];

  const widths: { id: ContentWidth; label: string }[] = [
    { id: 'normal', label: 'Tiêu chuẩn (720px)' },
    { id: 'wide', label: 'Rộng (860px)' },
    { id: 'full', label: 'Toàn trang' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-xl p-5 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D6] dark:border-[#383632]">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            Tùy chỉnh chế độ đọc sách
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Themes */}
        <div>
          <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-2">
            Giao diện đọc
          </label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onUpdateSettings({ theme: t.id })}
                className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-between transition-all ${t.bg} ${t.text} ${t.border} ${
                  settings.theme === t.id ? 'ring-2 ring-[#7F1D1D] dark:ring-[#E2B765] shadow-xs' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <span>{t.label}</span>
                {settings.theme === t.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div>
          <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-2">
            Kiểu chữ
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdateSettings({ fontFamily: 'serif' })}
              className={`p-2 rounded-lg border text-xs font-serif transition-all ${
                settings.fontFamily === 'serif'
                  ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/5 dark:bg-[#E2B765]/10 text-[#7F1D1D] dark:text-[#E2B765] font-bold'
                  : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              Chữ có chân (Literata Serif)
            </button>
            <button
              onClick={() => onUpdateSettings({ fontFamily: 'sans' })}
              className={`p-2 rounded-lg border text-xs font-sans transition-all ${
                settings.fontFamily === 'sans'
                  ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/5 dark:bg-[#E2B765]/10 text-[#7F1D1D] dark:text-[#E2B765] font-bold'
                  : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              Chữ không chân (Sans-Serif)
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-2">
            Cỡ chữ hiển thị
          </label>
          <div className="grid grid-cols-4 gap-2">
            {fontSizes.map((s) => (
              <button
                key={s.id}
                onClick={() => onUpdateSettings({ fontSize: s.id })}
                className={`py-1.5 px-2 rounded-lg border text-xs text-center transition-all ${
                  settings.fontSize === s.id
                    ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765] font-bold'
                    : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
                }`}
              >
                <div>{s.label}</div>
                <div className="text-[10px] text-stone-400">{s.size}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Line Height & Content Width */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-2">
              Khoảng cách dòng
            </label>
            <div className="space-y-1.5">
              {lineHeights.map((lh) => (
                <button
                  key={lh.id}
                  onClick={() => onUpdateSettings({ lineHeight: lh.id })}
                  className={`w-full py-1 px-2 rounded-md border text-xs text-left transition-all ${
                    settings.lineHeight === lh.id
                      ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765] font-bold'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {lh.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-2">
              Độ rộng khung đọc
            </label>
            <div className="space-y-1.5">
              {widths.map((w) => (
                <button
                  key={w.id}
                  onClick={() => onUpdateSettings({ contentWidth: w.id })}
                  className={`w-full py-1 px-2 rounded-md border text-xs text-left transition-all ${
                    settings.contentWidth === w.id
                      ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765] font-bold'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Áp dụng & Đóng
        </button>
      </div>
    </div>
  );
};
