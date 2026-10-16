import React, { useState } from 'react';
import { RotateCcw, Play, Clock, DollarSign, Award, Layers, Sparkles } from 'lucide-react';
import { Formula } from '../common/Formula';

export const SurplusValueSimulator: React.FC = () => {
  // Canonical textbook values
  const DEFAULT_COTTON = 100;
  const DEFAULT_DEPRECIATION = 6;
  const DEFAULT_LABOR_POWER = 15;
  const DEFAULT_HOURS = 8;
  const DEFAULT_NECESSARY_HOURS = 4;

  const [cottonCost, setCottonCost] = useState<number>(DEFAULT_COTTON);
  const [machineryDepreciation, setMachineryDepreciation] = useState<number>(DEFAULT_DEPRECIATION);
  const [laborPowerValue, setLaborPowerValue] = useState<number>(DEFAULT_LABOR_POWER);
  const [totalWorkingHours, setTotalWorkingHours] = useState<number>(DEFAULT_HOURS);
  const [necessaryHours, setNecessaryHours] = useState<number>(DEFAULT_NECESSARY_HOURS);
  
  const [timelineStep, setTimelineStep] = useState<'all' | 'phase1' | 'phase2'>('all');
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);

  // Math derivations
  // Hourly new value created by worker = laborPowerValue / necessaryHours
  const hourlyNewValue = necessaryHours > 0 ? laborPowerValue / necessaryHours : 0;
  const surplusHours = Math.max(0, totalWorkingHours - necessaryHours);
  
  const totalNewValue = totalWorkingHours * hourlyNewValue;
  const surplusValue = surplusHours * hourlyNewValue; // m
  const advancedCapital = cottonCost + machineryDepreciation + laborPowerValue; // C = c + v
  const constantCapital = cottonCost + machineryDepreciation; // c
  const productValue = constantCapital + totalNewValue; // G = c + v + m
  const surplusRate = laborPowerValue > 0 ? (surplusValue / laborPowerValue) * 100 : 0; // m'

  const handleReset = () => {
    setCottonCost(DEFAULT_COTTON);
    setMachineryDepreciation(DEFAULT_DEPRECIATION);
    setLaborPowerValue(DEFAULT_LABOR_POWER);
    setTotalWorkingHours(DEFAULT_HOURS);
    setNecessaryHours(DEFAULT_NECESSARY_HOURS);
    setTimelineStep('all');
  };

  return (
    <div className="my-8 p-6 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7E1D6] dark:border-[#383632] pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7F1D1D] dark:text-[#E2B765]">
            Mô phỏng trọng tâm bài học
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            Mô phỏng quá trình sản xuất giá trị thặng dư (Ví dụ xưởng kéo sợi bông)
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
            Phân tích quá trình tạo ra 15 USD giá trị thặng dư từ ngày lao động 8 giờ chuẩn mực của C. Mác
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSandboxOpen(prev => !prev)}
            className="px-3 py-1.5 text-xs font-semibold rounded-md border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
          >
            {isSandboxOpen ? 'Đóng hộp thử nghiệm' : 'Mở hộp thử nghiệm'}
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-semibold rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5"
            title="Khôi phục số liệu nguyên bản giáo trình"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục</span>
          </button>
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="my-6">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#B78C45]" />
            Dòng thời gian ngày làm việc: {totalWorkingHours} giờ
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setTimelineStep('phase1')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                timelineStep === 'phase1'
                  ? 'bg-[#B78C45] text-white font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              4 giờ đầu (Lao động tất yếu)
            </button>
            <button
              onClick={() => setTimelineStep('phase2')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                timelineStep === 'phase2'
                  ? 'bg-[#7F1D1D] text-white font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              4 giờ sau (Lao động thặng dư)
            </button>
            <button
              onClick={() => setTimelineStep('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                timelineStep === 'all'
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              Toàn bộ ngày làm việc
            </button>
          </div>
        </div>

        {/* Visual Progress Working Day Bar */}
        <div className="h-10 w-full rounded-xl overflow-hidden flex border border-stone-300 dark:border-stone-700 shadow-inner">
          {/* Phase 1: Necessary */}
          <div
            style={{ width: `${(necessaryHours / totalWorkingHours) * 100}%` }}
            className={`h-full flex items-center justify-center text-xs font-semibold text-amber-950 transition-all ${
              timelineStep === 'phase2' ? 'opacity-40 bg-amber-200' : 'bg-amber-300 dark:bg-amber-500'
            }`}
          >
            <span className="truncate px-2">
              Lao động tất yếu (t = {necessaryHours}h) → Tái tạo v ({laborPowerValue} USD)
            </span>
          </div>

          {/* Phase 2: Surplus */}
          <div
            style={{ width: `${(surplusHours / totalWorkingHours) * 100}%` }}
            className={`h-full flex items-center justify-center text-xs font-semibold text-white transition-all ${
              timelineStep === 'phase1' ? 'opacity-40 bg-rose-800' : 'bg-[#7F1D1D] dark:bg-rose-700'
            }`}
          >
            <span className="truncate px-2">
              Lao động thặng dư (t′ = {surplusHours}h) → Tạo m ({surplusValue.toFixed(1)} USD)
            </span>
          </div>
        </div>
      </div>

      {/* Numerical Ledger — Academic Accuracy */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-5">
        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/40 rounded-lg border border-stone-200/80 dark:border-stone-700/80">
          <span className="text-[11px] text-stone-500 block">Tiền mua bông</span>
          <span className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {cottonCost} USD
          </span>
          <span className="text-[10px] text-stone-400 block">Tư bản bất biến (c₁)</span>
        </div>

        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/40 rounded-lg border border-stone-200/80 dark:border-stone-700/80">
          <span className="text-[11px] text-stone-500 block">Hao mòn máy móc</span>
          <span className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {machineryDepreciation} USD
          </span>
          <span className="text-[10px] text-stone-400 block">Tư bản bất biến (c₂)</span>
        </div>

        <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-lg border border-amber-200/80 dark:border-amber-900/40">
          <span className="text-[11px] text-amber-800 dark:text-amber-400 block">Giá trị sức lao động (v)</span>
          <span className="text-base font-serif font-bold text-amber-900 dark:text-amber-300 tabular-nums">
            {laborPowerValue} USD
          </span>
          <span className="text-[10px] text-amber-600/80 dark:text-amber-500 block">Tư bản khả biến (v)</span>
        </div>

        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/40 rounded-lg border border-stone-200/80 dark:border-stone-700/80">
          <span className="text-[11px] text-stone-500 block">Tư bản ứng trước (C)</span>
          <span className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {advancedCapital} USD
          </span>
          <span className="text-[10px] text-stone-400 block">c + v ({constantCapital} + {laborPowerValue})</span>
        </div>

        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/40 rounded-lg border border-stone-200/80 dark:border-stone-700/80">
          <span className="text-[11px] text-stone-500 block">Giá trị mới sáng tạo</span>
          <span className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {totalNewValue.toFixed(1)} USD
          </span>
          <span className="text-[10px] text-stone-400 block">v + m ({laborPowerValue} + {surplusValue.toFixed(1)})</span>
        </div>

        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/40 rounded-lg border border-stone-200/80 dark:border-stone-700/80">
          <span className="text-[11px] text-stone-500 block">Giá trị sản phẩm (G)</span>
          <span className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {productValue.toFixed(1)} USD
          </span>
          <span className="text-[10px] text-stone-400 block">c + v + m</span>
        </div>

        <div className="p-3 bg-rose-50/80 dark:bg-rose-950/30 rounded-lg border border-rose-300 dark:border-rose-900/50 sm:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] text-rose-800 dark:text-rose-300 block font-semibold">
                Giá trị thặng dư (m) thu được
              </span>
              <span className="text-xl font-serif font-bold text-[#7F1D1D] dark:text-rose-400 tabular-nums">
                + {surplusValue.toFixed(1)} USD
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-500 block">Tỷ suất bóc lột (m′)</span>
              <span className="text-base font-serif font-bold text-[#7F1D1D] dark:text-rose-400 tabular-nums">
                {surplusRate.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Step Explanation Cards */}
      <div className="space-y-3 my-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
        {(timelineStep === 'all' || timelineStep === 'phase1') && (
          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/50">
            <h4 className="font-serif font-bold text-amber-950 dark:text-amber-200 mb-1">
              Giai đoạn 1: 4 giờ đầu (Thời gian lao động tất yếu - t = 4h)
            </h4>
            <p>
              Người công nhân làm việc 4 giờ, dùng sức lao động chuyển 100 USD giá trị bông và 6 USD hao mòn máy móc vào sản phẩm, đồng thời sáng tạo ra 15 USD giá trị mới. Tổng giá trị sợi tạo ra là 100 + 6 + 15 = <strong>121 USD</strong>. Đúng bằng số tiền 121 USD nhà tư bản ứng ra. Tại thời điểm này, <strong>nhà tư bản chưa thu được đồng giá trị thặng dư nào (m = 0)</strong>.
            </p>
          </div>
        )}

        {(timelineStep === 'all' || timelineStep === 'phase2') && (
          <div className="p-4 bg-[#7F1D1D]/5 dark:bg-[#7F1D1D]/20 rounded-xl border border-[#7F1D1D]/20 dark:border-[#7F1D1D]/40">
            <h4 className="font-serif font-bold text-[#7F1D1D] dark:text-[#E2B765] mb-1">
              Giai đoạn 2: 4 giờ tiếp theo (Thời gian lao động thặng dư - t′ = 4h)
            </h4>
            <p>
              Nhà tư bản đã mua sức lao động trọn ngày 8 giờ với giá 15 USD, nên công nhân phải tiếp tục làm thêm 4 giờ nữa. Trong 4 giờ này, công nhân lại tạo ra thêm 15 USD giá trị mới. Khoản 15 USD này nhà tư bản <strong>chiếm đoạt không bồi hoàn</strong>, đó chính là <strong>Giá trị thặng dư (m = 15 USD)</strong>!
            </p>
          </div>
        )}
      </div>

      {/* Sandbox Toggle Panel */}
      {isSandboxOpen && (
        <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-700 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B78C45]" />
              Hộp thử nghiệm giả định giáo dục (Sandbox)
            </h4>
            <span className="text-[11px] text-stone-500">Thử thay đổi biến số để xem m và m′ thay đổi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Chi phí bông (USD): <span className="font-bold tabular-nums">{cottonCost}</span>
              </label>
              <input
                type="range"
                min="50"
                max="200"
                step="10"
                value={cottonCost}
                onChange={(e) => setCottonCost(Number(e.target.value))}
                className="w-full accent-[#7F1D1D]"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Hao mòn máy móc (USD): <span className="font-bold tabular-nums">{machineryDepreciation}</span>
              </label>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={machineryDepreciation}
                onChange={(e) => setMachineryDepreciation(Number(e.target.value))}
                className="w-full accent-[#7F1D1D]"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Giá trị sức lao động v (USD): <span className="font-bold tabular-nums">{laborPowerValue}</span>
              </label>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={laborPowerValue}
                onChange={(e) => setLaborPowerValue(Number(e.target.value))}
                className="w-full accent-[#7F1D1D]"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Tổng ngày làm việc (giờ): <span className="font-bold tabular-nums">{totalWorkingHours}h</span>
              </label>
              <input
                type="range"
                min="4"
                max="14"
                step="1"
                value={totalWorkingHours}
                onChange={(e) => setTotalWorkingHours(Number(e.target.value))}
                className="w-full accent-[#7F1D1D]"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Lao động tất yếu t (giờ): <span className="font-bold tabular-nums">{necessaryHours}h</span>
              </label>
              <input
                type="range"
                min="1"
                max={totalWorkingHours}
                step="1"
                value={necessaryHours}
                onChange={(e) => setNecessaryHours(Math.min(totalWorkingHours, Number(e.target.value)))}
                className="w-full accent-[#7F1D1D]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
