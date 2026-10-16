import React, { useState } from 'react';
import { ArrowRight, Zap, Clock, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { Formula } from '../common/Formula';

export const SurplusValueMethodsSimulator: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<'absolute' | 'relative' | 'extraordinary'>('absolute');
  const [isAbsoluteExtended, setIsAbsoluteExtended] = useState<boolean>(true);
  const [isRelativeOptimized, setIsRelativeOptimized] = useState<boolean>(true);

  return (
    <div className="my-8 p-6 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-xs">
      <div className="border-b border-[#E7E1D6] dark:border-[#383632] pb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#7F1D1D] dark:text-[#E2B765]">
          Mô phỏng cơ chế bóc lột
        </span>
        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
          So sánh phương pháp Giá trị thặng dư Tuyệt đối và Tương đối
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
          Khám phá sự biến đổi của thanh thời gian ngày làm việc và tỷ suất bóc lột m′
        </p>
      </div>

      {/* Method Switcher */}
      <div className="flex gap-2 my-5">
        <button
          onClick={() => setActiveMethod('absolute')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
            activeMethod === 'absolute'
              ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765]'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
          }`}
        >
          1. Thặng dư Tuyệt đối (Kéo dài giờ làm)
        </button>
        <button
          onClick={() => setActiveMethod('relative')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
            activeMethod === 'relative'
              ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765]'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
          }`}
        >
          2. Thặng dư Tương đối (Tăng NSLĐ)
        </button>
        <button
          onClick={() => setActiveMethod('extraordinary')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
            activeMethod === 'extraordinary'
              ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765]'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
          }`}
        >
          3. Thặng dư Siêu ngạch (Kỹ thuật cá biệt)
        </button>
      </div>

      {/* METHOD 1: ABSOLUTE SURPLUS VALUE */}
      {activeMethod === 'absolute' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-600 dark:text-stone-400">
              Trạng thái: <strong>{isAbsoluteExtended ? 'Đã kéo dài từ 8h lên 10h' : 'Ngày lao động ban đầu (8h)'}</strong>
            </span>
            <button
              onClick={() => setIsAbsoluteExtended(prev => !prev)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#7F1D1D] text-white hover:bg-[#681818] transition-colors"
            >
              {isAbsoluteExtended ? 'Xem ngày làm ban đầu (8h)' : 'Thực hiện kéo dài ngày làm việc (10h)'}
            </button>
          </div>

          {/* Visual Bars Comparison */}
          <div className="space-y-4">
            {/* Bar 1: Initial 8 hours */}
            <div>
              <div className="flex justify-between text-xs mb-1 font-semibold text-stone-700 dark:text-stone-300">
                <span>Ngày lao động ban đầu (8 giờ)</span>
                <span className="text-[#7F1D1D] dark:text-[#E2B765]">m′ = (4h / 4h) × 100% = 100%</span>
              </div>
              <div className="h-9 w-full rounded-lg overflow-hidden flex border border-stone-300 dark:border-stone-700">
                <div className="w-1/2 bg-amber-400 text-amber-950 flex items-center justify-center text-xs font-bold">
                  Tất yếu: 4h (t)
                </div>
                <div className="w-1/2 bg-[#7F1D1D] text-white flex items-center justify-center text-xs font-bold">
                  Thặng dư: 4h (t′)
                </div>
              </div>
            </div>

            {/* Bar 2: Extended 10 hours */}
            {isAbsoluteExtended && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between text-xs mb-1 font-semibold text-stone-700 dark:text-stone-300">
                  <span className="text-rose-700 dark:text-rose-400 font-bold">
                    Kéo dài thêm 2 giờ thành 10 giờ
                  </span>
                  <span className="text-rose-700 dark:text-rose-400 font-bold">
                    m′ = (6h / 4h) × 100% = 150% (+50%)
                  </span>
                </div>
                <div className="h-9 w-full rounded-lg overflow-hidden flex border border-rose-300 dark:border-rose-900">
                  <div style={{ width: '40%' }} className="bg-amber-400 text-amber-950 flex items-center justify-center text-xs font-bold">
                    Tất yếu: 4h (t)
                  </div>
                  <div style={{ width: '60%' }} className="bg-rose-700 text-white flex items-center justify-center text-xs font-bold">
                    Thặng dư: 6h (t′)
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">
              Nhận định học thuật quan trọng:
            </h4>
            <p>
              • Thời gian lao động tất yếu (t = 4h) không hề thay đổi. Toàn bộ 2 giờ kéo dài thêm đều chuyển thành <strong>thời gian lao động thặng dư</strong> (t′ tăng từ 4h lên 6h).
            </p>
            <p>
              • <strong>Giới hạn của phương pháp:</strong> Không thể kéo dài ngày làm việc đến 24 giờ vì vấp phải giới hạn sinh lý của công nhân (cần ăn, ngủ) và giới hạn pháp lý xã hội (đấu tranh của giai cấp công nhân đòi ngày làm việc 8 giờ).
            </p>
          </div>
        </div>
      )}

      {/* METHOD 2: RELATIVE SURPLUS VALUE */}
      {activeMethod === 'relative' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-600 dark:text-stone-400">
              Trạng thái: <strong>{isRelativeOptimized ? 'Đã tăng NSLĐ xã hội (t giảm còn 2h)' : 'Ngày lao động ban đầu (8h)'}</strong>
            </span>
            <button
              onClick={() => setIsRelativeOptimized(prev => !prev)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#B78C45] text-white hover:bg-[#9E7535] transition-colors"
            >
              {isRelativeOptimized ? 'Xem trạng thái ban đầu' : 'Tăng năng suất lao động xã hội'}
            </button>
          </div>

          {/* Visual Bars Comparison */}
          <div className="space-y-4">
            {/* Bar 1: Initial */}
            <div>
              <div className="flex justify-between text-xs mb-1 font-semibold text-stone-700 dark:text-stone-300">
                <span>Ngày lao động 8 giờ (Ban đầu)</span>
                <span className="text-[#7F1D1D] dark:text-[#E2B765]">m′ = (4h / 4h) × 100% = 100%</span>
              </div>
              <div className="h-9 w-full rounded-lg overflow-hidden flex border border-stone-300 dark:border-stone-700">
                <div className="w-1/2 bg-amber-400 text-amber-950 flex items-center justify-center text-xs font-bold">
                  Tất yếu: 4h (t)
                </div>
                <div className="w-1/2 bg-[#7F1D1D] text-white flex items-center justify-center text-xs font-bold">
                  Thặng dư: 4h (t′)
                </div>
              </div>
            </div>

            {/* Bar 2: Relative surplus value */}
            {isRelativeOptimized && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between text-xs mb-1 font-semibold text-stone-700 dark:text-stone-300">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    Ngày lao động vẫn 8 giờ (Rút ngắn t từ 4h xuống 2h)
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    m′ = (6h / 2h) × 100% = 300% (+200%!)
                  </span>
                </div>
                <div className="h-9 w-full rounded-lg overflow-hidden flex border border-emerald-300 dark:border-emerald-900">
                  <div style={{ width: '25%' }} className="bg-amber-400 text-amber-950 flex items-center justify-center text-xs font-bold">
                    t: 2h
                  </div>
                  <div style={{ width: '75%' }} className="bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                    Thặng dư: 6h (t′)
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">
              Cơ chế tinh vi của Phương pháp Tương đối:
            </h4>
            <p>
              • <strong>Độ dài ngày làm việc hoàn toàn không đổi (vẫn 8 giờ)</strong>. Nhà tư bản không hề vi phạm luật lao động về thời gian làm việc.
            </p>
            <p>
              • Nhưng nhờ <strong>tăng năng suất lao động xã hội</strong> trong các ngành sản xuất tư liệu sinh hoạt (gạo, vải, thịt...) làm giảm giá trị hàng tiêu dùng của công nhân, từ đó giảm giá trị sức lao động. Thời gian tất yếu t rút ngắn từ 4h xuống 2h, tự động đẩy thời gian thặng dư t′ lên 6h!
            </p>
          </div>
        </div>
      )}

      {/* METHOD 3: EXTRAORDINARY SURPLUS VALUE */}
      {activeMethod === 'extraordinary' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="p-5 bg-[#B78C45]/10 rounded-xl border border-[#B78C45]/30">
            <h4 className="font-serif font-bold text-sm text-[#7F1D1D] dark:text-[#E2B765] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Giá trị thặng dư Siêu ngạch — Động lực tối thượng của tiến bộ kỹ thuật
            </h4>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              Giá trị thặng dư siêu ngạch thu được khi một doanh nghiệp <strong>đi đầu trong việc đổi mới công nghệ</strong>, làm cho năng suất cá biệt cao hơn năng suất xã hội, khiến cho <strong>giá trị cá biệt của sản phẩm thấp hơn giá trị thị trường</strong> nhưng vẫn bán được theo giá thị trường.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-stone-50 dark:bg-stone-800/30 rounded-lg border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                Bản chất quan hệ
              </span>
              <p className="text-stone-600 dark:text-stone-400">
                Là hình thái biến tướng của giá trị thặng dư tương đối ở cấp độ từng doanh nghiệp tiên phong.
              </p>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800/30 rounded-lg border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                Tính chất tạm thời
              </span>
              <p className="text-stone-600 dark:text-stone-400">
                Chỉ tồn tại chừng nào kỹ thuật đó chưa bị các đối thủ bắt chước. Khi đối thủ bắt kịp, siêu ngạch biến mất.
              </p>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800/30 rounded-lg border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                Động lực phát triển
              </span>
              <p className="text-stone-600 dark:text-stone-400">
                Cuộc chạy đua săn lùng giá trị thặng dư siêu ngạch buộc các nhà tư bản liên tục đổi mới khoa học công nghệ.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
