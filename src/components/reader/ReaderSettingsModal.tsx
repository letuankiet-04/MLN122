import React from 'react';
import { X, Check, Eye, SunMedium } from 'lucide-react';
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
    { id: 'paper', label: 'Trang giấy ngà (Paper)', bg: 'bg-[#F2ECE1]', text: 'text-[#2C2723]', border: 'border-[#DFD7CA]' },
    { id: 'sepia', label: 'Nâu ấm dịu mắt (Sepia)', bg: 'bg-[#EAE0CE]', text: 'text-[#342A22]', border: 'border-[#D6C9B0]' },
    { id: 'dark', label: 'Đêm tối êm ái (Dark)', bg: 'bg-[#1B1A18]', text: 'text-[#DCD6CA]', border: 'border-[#383530]' },
    { id: 'focus', label: 'Tập trung thanh nhẹ (Focus)', bg: 'bg-[#F5F2EB]', text: 'text-[#262320]', border: 'border-[#E2DDD2]' },
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
      <div className="w-full max-w-md bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] shadow-xl p-5 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFD7CA] dark:border-[#383530]">
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              Tùy chỉnh chế độ đọc sách
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Cân bằng màu sắc, kiểu chữ và ánh sáng để đọc thoải mái
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Eye-care anti-glare switch */}
        <div className="p-3 rounded-lg border border-[#967338]/30 dark:border-[#C2A267]/30 bg-[#967338]/10 dark:bg-[#C2A267]/10 flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <SunMedium className="w-4 h-4 text-[#8A6328] dark:text-[#C2A267] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                Chế độ chống chói & bảo vệ mắt
              </span>
              <span className="text-[10px] text-stone-600 dark:text-stone-400 leading-tight block mt-0.5">
                Giảm độ chói xanh, lọc ánh sáng gắt, tăng độ êm dịu khi đọc lâu
              </span>
            </div>
          </div>

          <button
            onClick={() => onUpdateSettings({ eyeCareMode: !settings.eyeCareMode })}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
              settings.eyeCareMode ? 'bg-[#682626] dark:bg-[#C2A267]' : 'bg-stone-300 dark:bg-stone-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                settings.eyeCareMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Themes */}
        <div>
          <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-2">
            Màu nền trang sách
          </label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onUpdateSettings({ theme: t.id })}
                className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-between transition-all ${t.bg} ${t.text} ${t.border} ${
                  settings.theme === t.id ? 'ring-2 ring-[#682626] dark:ring-[#C2A267] shadow-xs' : 'opacity-85 hover:opacity-100'
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
                  ? 'border-[#682626] dark:border-[#C2A267] bg-[#682626]/10 dark:bg-[#C2A267]/15 text-[#682626] dark:text-[#C2A267] font-bold'
                  : 'border-[#DFD7CA] dark:border-[#383530] text-stone-700 dark:text-stone-300 bg-[#EFE8DD]/50 dark:bg-[#2A2824]'
              }`}
            >
              Chữ có chân (Literata Serif)
            </button>
            <button
              onClick={() => onUpdateSettings({ fontFamily: 'sans' })}
              className={`p-2 rounded-lg border text-xs font-sans transition-all ${
                settings.fontFamily === 'sans'
                  ? 'border-[#682626] dark:border-[#C2A267] bg-[#682626]/10 dark:bg-[#C2A267]/15 text-[#682626] dark:text-[#C2A267] font-bold'
                  : 'border-[#DFD7CA] dark:border-[#383530] text-stone-700 dark:text-stone-300 bg-[#EFE8DD]/50 dark:bg-[#2A2824]'
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
                    ? 'border-[#682626] dark:border-[#C2A267] bg-[#682626]/10 dark:bg-[#C2A267]/15 text-[#682626] dark:text-[#C2A267] font-bold'
                    : 'border-[#DFD7CA] dark:border-[#383530] text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DD]/50'
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
                      ? 'border-[#682626] dark:border-[#C2A267] bg-[#682626]/10 dark:bg-[#C2A267]/15 text-[#682626] dark:text-[#C2A267] font-bold'
                      : 'border-[#DFD7CA] dark:border-[#383530] text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DD]/50'
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
                      ? 'border-[#682626] dark:border-[#C2A267] bg-[#682626]/10 dark:bg-[#C2A267]/15 text-[#682626] dark:text-[#C2A267] font-bold'
                      : 'border-[#DFD7CA] dark:border-[#383530] text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DD]/50'
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
          className="w-full py-2 bg-[#682626] hover:bg-[#541E1E] text-[#FAF7F0] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] dark:text-[#1B1A18] text-xs font-semibold rounded-lg transition-colors shadow-xs"
        >
          Áp dụng & Đóng
        </button>
      </div>
    </div>
  );
};
