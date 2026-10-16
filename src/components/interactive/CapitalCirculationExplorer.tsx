import React, { useState } from 'react';
import { ArrowRight, RefreshCw, HelpCircle, CheckCircle, Info } from 'lucide-react';
import { Formula } from '../common/Formula';

export const CapitalCirculationExplorer: React.FC = () => {
  const [mode, setMode] = useState<'HTH' | 'THT'>('THT');
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepsHTH = [
    { title: 'Hàng hóa 1 (H)', desc: 'Người sản xuất đem hàng hóa thừa của mình ra thị trường để bán.', icon: '🌾' },
    { title: 'Tiền tệ (T)', desc: 'Tiền đóng vai trò phương tiện lưu thông trung gian, không tích lũy.', icon: '🪙' },
    { title: 'Hàng hóa 2 (H)', desc: 'Dùng tiền mua hàng hóa khác có giá trị sử dụng mình đang cần tiêu dùng.', icon: '👞' },
  ];

  const stepsTHT = [
    { title: 'Tiền ban đầu (T)', desc: 'Nhà tư bản ứng vốn ra mua tư liệu sản xuất và sức lao động.', icon: '💰' },
    { title: 'Hàng hóa (H = TLSX + SLĐ)', desc: 'Quá trình sản xuất diễn ra, kết tinh giá trị mới vào hàng hóa mới.', icon: '🏭' },
    { title: 'Tiền dôi ra (T′ = T + m)', desc: 'Bán hàng hóa thu về số tiền lớn hơn ban đầu, xuất hiện giá trị thặng dư m.', icon: '📈' },
  ];

  const currentSteps = mode === 'HTH' ? stepsHTH : stepsTHT;

  return (
    <div className="my-8 p-6 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7E1D6] dark:border-[#383632]">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#B78C45] dark:text-[#E2B765]">
            Mô-đun tương tác giáo trình
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            Sự chuyển hóa của Tiền thành Tư bản: So sánh H–T–H và T–H–T′
          </h3>
        </div>

        {/* Segmented control buttons */}
        <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
          <button
            onClick={() => { setMode('HTH'); setActiveStep(0); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              mode === 'HTH'
                ? 'bg-white dark:bg-stone-900 text-[#7F1D1D] dark:text-[#E2B765] shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Lưu thông giản đơn (H – T – H)
          </button>
          <button
            onClick={() => { setMode('THT'); setActiveStep(0); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              mode === 'THT'
                ? 'bg-white dark:bg-stone-900 text-[#7F1D1D] dark:text-[#E2B765] shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Lưu thông tư bản (T – H – T′)
          </button>
        </div>
      </div>

      {/* Main Flow Stage */}
      <div className="py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          {currentSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer flex-1 w-full text-center p-4 rounded-xl border transition-all ${
                  activeStep === idx
                    ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/5 dark:bg-[#E2B765]/10 shadow-xs'
                    : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                }`}
              >
                <div className="text-3xl mb-2">{step.icon}</div>
                <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                  {step.title}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                  {step.desc}
                </div>
              </div>

              {idx < currentSteps.length - 1 && (
                <div className="hidden md:flex items-center text-stone-400 dark:text-stone-500">
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Selected Step Deep Dive */}
        <div className="mt-5 p-4 bg-stone-50 dark:bg-stone-800/40 rounded-lg border border-stone-200/60 dark:border-stone-700/60 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#B78C45] shrink-0 mt-0.5" />
          <div className="text-xs text-stone-700 dark:text-stone-300">
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              Chi tiết bước {activeStep + 1}: {currentSteps[activeStep].title} —
            </span>{' '}
            {currentSteps[activeStep].desc}
          </div>
        </div>
      </div>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-stone-200/80 dark:border-stone-800 text-xs">
        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/30 rounded-lg">
          <span className="text-stone-500 block text-[11px]">Điểm khởi đầu & kết thúc</span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {mode === 'HTH' ? 'Bắt đầu bằng Hàng, kết thúc bằng Hàng' : 'Bắt đầu bằng Tiền, kết thúc bằng Tiền dôi ra'}
          </span>
        </div>
        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/30 rounded-lg">
          <span className="text-stone-500 block text-[11px]">Mục đích vận động</span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {mode === 'HTH' ? 'Giá trị sử dụng (tiêu dùng cá nhân)' : 'Giá trị & Sự gia tăng giá trị (giá trị thặng dư m)'}
          </span>
        </div>
        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/30 rounded-lg">
          <span className="text-stone-500 block text-[11px]">Vai trò của tiền tệ</span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {mode === 'HTH' ? 'Chỉ là phương tiện lưu thông trung gian' : 'Là tư bản ứng trước, tự lớn lên trong sản xuất'}
          </span>
        </div>
        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/30 rounded-lg">
          <span className="text-stone-500 block text-[11px]">Giới hạn của vận động</span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {mode === 'HTH' ? 'Có giới hạn (dừng khi nhận hàng cần)' : 'Không có giới hạn (vận động liên tục để tích lũy)'}
          </span>
        </div>
      </div>

      {/* Why Money Becomes Capital Button */}
      <div className="mt-6 pt-5 border-t border-[#E7E1D6] dark:border-[#383632]">
        <button
          onClick={() => setShowSecret(prev => !prev)}
          className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-[#7F1D1D] dark:text-[#E2B765] rounded-lg font-serif font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          <span>{showSecret ? 'Thu gọn phân tích' : 'Khám phá: Vì sao tiền trở thành tư bản?'}</span>
        </button>

        {showSecret && (
          <div className="mt-4 p-5 bg-[#7F1D1D]/5 dark:bg-[#B78C45]/10 rounded-xl border border-[#7F1D1D]/20 dark:border-[#B78C45]/30 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed space-y-2.5 animate-in fade-in duration-200">
            <h4 className="font-serif font-bold text-[#7F1D1D] dark:text-[#E2B765] text-base">
              Luận giải chính xác từ học thuyết C. Mác:
            </h4>
            <p>
              Bản thân tiền tệ không tự nó sinh ra tiền tệ. Nếu để 100 USD trong két sắt thì sau một năm vẫn chỉ là 100 USD. Tiền chỉ chuyển hóa thành <strong>tư bản</strong> khi nó bước vào vòng lưu thông <Formula math="T - H - T'" /> nhằm chiếm đoạt lao động không bồi hoàn của người khác.
            </p>
            <p>
              Để công thức <Formula math="T - H - T'" /> thành hiện thực (với <Formula math="T' > T" />), nhà tư bản bắt buộc phải mua được một thứ hàng hóa mà khi đem vào sử dụng có thể tạo ra một lượng giá trị mới dôi ra ngoài giá trị của nó. Thứ hàng hóa độc nhất vô nhị đó chính là <strong>HÀNG HÓA SỨC LAO ĐỘNG</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
