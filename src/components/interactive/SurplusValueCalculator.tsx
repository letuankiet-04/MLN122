import React, { useState } from 'react';
import { Calculator, RotateCcw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Formula } from '../common/Formula';

export const SurplusValueCalculator: React.FC = () => {
  // Preset 1: Textbook cotton-spinning example
  const [m, setM] = useState<number>(15);
  const [v, setV] = useState<number>(15);
  const [t, setT] = useState<number>(4);
  const [tPrime, setTPrime] = useState<number>(4);
  const [VTotal, setVTotal] = useState<number>(1500);

  // Method 1: By Value
  const mRateByValue = v > 0 ? (m / v) * 100 : null;

  // Method 2: By Time
  const mRateByTime = t > 0 ? (tPrime / t) * 100 : null;

  // Total Mass M = (m' / 100) * VTotal
  const effectiveRate = mRateByValue !== null ? mRateByValue : (mRateByTime || 0);
  const massM = (effectiveRate / 100) * VTotal;

  // Consistency check
  const isConsistent = mRateByValue !== null && mRateByTime !== null 
    ? Math.abs(mRateByValue - mRateByTime) < 0.01
    : true;

  const loadPreset = (preset: 'cotton' | 'absolute' | 'relative') => {
    if (preset === 'cotton') {
      setM(15);
      setV(15);
      setT(4);
      setTPrime(4);
      setVTotal(1500);
    } else if (preset === 'absolute') {
      setM(22.5);
      setV(15);
      setT(4);
      setTPrime(6);
      setVTotal(3000);
    } else if (preset === 'relative') {
      setM(45);
      setV(15);
      setT(2);
      setTPrime(6);
      setVTotal(5000);
    }
  };

  return (
    <div className="my-8 p-6 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7E1D6] dark:border-[#383632] pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7F1D1D] dark:text-[#E2B765]">
            Công cụ học tập & tính toán
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#B78C45]" />
            Máy tính Tỷ suất (m′) và Khối lượng (M) Giá trị thặng dư
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
            Phân biệt hai phương pháp tính tỷ suất bóc lột và tính quy mô bóc lột xã hội
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-stone-500 mr-1">Mẫu giáo trình:</span>
          <button
            onClick={() => loadPreset('cotton')}
            className="px-2.5 py-1 text-xs rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300"
          >
            Kéo sợi (100%)
          </button>
          <button
            onClick={() => loadPreset('absolute')}
            className="px-2.5 py-1 text-xs rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300"
          >
            Tuyệt đối (150%)
          </button>
          <button
            onClick={() => loadPreset('relative')}
            className="px-2.5 py-1 text-xs rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300"
          >
            Tương đối (300%)
          </button>
        </div>
      </div>

      {/* Input Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Method 1 Inputs: By Value */}
        <div className="p-4 bg-stone-50/70 dark:bg-stone-800/30 rounded-xl border border-stone-200/80 dark:border-stone-700/80">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
              Phương pháp 1: Tính theo Giá trị (m & v)
            </h4>
            <Formula math="m' = \frac{m}{v} \times 100\%" />
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Giá trị thặng dư (m) [USD]:
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={m}
                onChange={(e) => setM(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Tư bản khả biến (v) [USD]:
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={v}
                onChange={(e) => setV(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Method 2 Inputs: By Time */}
        <div className="p-4 bg-stone-50/70 dark:bg-stone-800/30 rounded-xl border border-stone-200/80 dark:border-stone-700/80">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
              Phương pháp 2: Tính theo Thời gian (t & t′)
            </h4>
            <Formula math="m' = \frac{t'}{t} \times 100\%" />
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Thời gian lao động tất yếu (t) [giờ]:
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={t}
                onChange={(e) => setT(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Thời gian lao động thặng dư (t′) [giờ]:
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={tPrime}
                onChange={(e) => setTPrime(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate V input */}
      <div className="p-4 bg-stone-50/50 dark:bg-stone-800/20 rounded-xl border border-stone-200/60 dark:border-stone-700/60 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <label className="font-semibold text-stone-900 dark:text-stone-100 block">
              Tổng tư bản khả biến toàn doanh nghiệp/xã hội (V) [USD]:
            </label>
            <span className="text-[11px] text-stone-500">
              Dùng để tính Khối lượng giá trị thặng dư (M) theo công thức <Formula math="M = m' \times V" />
            </span>
          </div>
          <input
            type="number"
            min="100"
            step="100"
            value={VTotal}
            onChange={(e) => setVTotal(Math.max(0, Number(e.target.value)))}
            className="w-48 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono text-sm"
          />
        </div>
      </div>

      {/* Results Deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Result 1 */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
          <span className="text-[11px] text-stone-500 block">m′ theo Giá trị (m/v)</span>
          <div className="text-2xl font-serif font-bold text-[#7F1D1D] dark:text-[#E2B765] my-1 tabular-nums">
            {mRateByValue !== null ? `${mRateByValue.toFixed(1)}%` : 'Lỗi (v = 0)'}
          </div>
          <p className="text-[11px] text-stone-500">
            = ({m} / {v}) × 100%
          </p>
        </div>

        {/* Result 2 */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
          <span className="text-[11px] text-stone-500 block">m′ theo Thời gian (t′/t)</span>
          <div className="text-2xl font-serif font-bold text-[#7F1D1D] dark:text-[#E2B765] my-1 tabular-nums">
            {mRateByTime !== null ? `${mRateByTime.toFixed(1)}%` : 'Lỗi (t = 0)'}
          </div>
          <p className="text-[11px] text-stone-500">
            = ({tPrime}h / {t}h) × 100%
          </p>
        </div>

        {/* Result 3 */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
          <span className="text-[11px] text-stone-500 block">Khối lượng thặng dư (M)</span>
          <div className="text-2xl font-serif font-bold text-[#B78C45] dark:text-[#E2B765] my-1 tabular-nums">
            {massM.toLocaleString('en-US', { maximumFractionDigits: 1 })} USD
          </div>
          <p className="text-[11px] text-stone-500">
            = ({effectiveRate.toFixed(1)}% / 100) × {VTotal.toLocaleString()} USD
          </p>
        </div>
      </div>

      {/* Consistency warning if assumptions differ */}
      {!isConsistent && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Lưu ý học thuật:</strong> Hai phương pháp cho ra hai tỷ suất khác nhau ({mRateByValue?.toFixed(1)}% vs {mRateByTime?.toFixed(1)}%) vì bạn nhập độc lập các số liệu thời gian (t, t′) không đồng nhất với lượng giá trị (m, v). Trong thực tế, vì giá trị mới tỷ lệ thuận với thời gian lao động nên hai tỷ suất này luôn bằng nhau!
          </div>
        </div>
      )}
    </div>
  );
};
