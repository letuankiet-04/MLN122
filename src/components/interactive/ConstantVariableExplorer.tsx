import React, { useState } from 'react';
import { Layers, Info, Check, RefreshCw } from 'lucide-react';
import { Formula } from '../common/Formula';

export const ConstantVariableExplorer: React.FC = () => {
  const [activePart, setActivePart] = useState<'c' | 'v' | 'm'>('v');
  const [cValue, setCValue] = useState<number>(106);
  const [vValue, setVValue] = useState<number>(15);
  const [mValue, setMValue] = useState<number>(15);

  const totalValue = cValue + vValue + mValue;
  const cPercent = (cValue / totalValue) * 100;
  const vPercent = (vValue / totalValue) * 100;
  const mPercent = (mValue / totalValue) * 100;

  const partDetails = {
    c: {
      name: 'Tư bản bất biến (c)',
      formula: 'c = c_1 + c_2',
      nature: 'Tồn tại dưới dạng tư liệu sản xuất (nhà xưởng, máy móc, nguyên vật liệu)',
      role: 'Chỉ là điều kiện vật chất. Giá trị cũ được lao động cụ thể bảo tồn và chuyển dịch nguyên vẹn vào sản phẩm mới, không thay đổi về lượng.',
      color: 'bg-[#D1C7BA] dark:bg-[#5E574E]',
    },
    v: {
      name: 'Tư bản khả biến (v)',
      formula: 'v \\to v + m',
      nature: 'Tồn tại dưới dạng sức lao động của công nhân làm thuê',
      role: 'Nguồn gốc trực tiếp duy nhất sinh ra giá trị thặng dư m. Lao động trừu tượng của công nhân tái tạo ra giá trị mới v + m.',
      color: 'bg-[#D6C29E] dark:bg-[#6E5D43]',
    },
    m: {
      name: 'Giá trị thặng dư (m)',
      formula: 'm = G - (c + v)',
      nature: 'Phần giá trị mới dôi ra ngoài giá trị sức lao động (v)',
      role: 'Do lao động thặng dư của công nhân tạo ra và bị nhà tư bản chiếm đoạt không bồi hoàn. Là mục đích tối thượng của sản xuất TBCN.',
      color: 'bg-[#742424] dark:bg-[#8A3333]',
    },
  };

  const curr = partDetails[activePart];

  return (
    <div className="my-8 p-6 bg-[#FAF6EE] dark:bg-[#1E1D1A] rounded-xl border border-[#E2DACD] dark:border-[#383632] shadow-xs">
      <div className="border-b border-[#E2DACD] dark:border-[#383632] pb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#A67C37] dark:text-[#C99E52]">
          Cơ cấu giá trị hàng hóa
        </span>
        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
          Tư bản bất biến (c) và Tư bản khả biến (v) — Công thức G = c + v + m
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
          Nhấp vào từng phần của thanh giá trị để khám phá vai trò bản chất của từng nhân tố
        </p>
      </div>

      {/* Interactive Stacked Value Bar */}
      <div className="my-6">
        <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 mb-2">
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            Tổng giá trị hàng hóa (G = c + v + m): {totalValue} USD
          </span>
          <span>Chọn phần để kiểm tra chi tiết</span>
        </div>

        <div className="h-12 w-full rounded-xl overflow-hidden flex border border-[#DCD3C4] dark:border-stone-700 cursor-pointer shadow-inner">
          <div
            onClick={() => setActivePart('c')}
            style={{ width: `${cPercent}%` }}
            className={`h-full bg-[#D1C7BA] hover:bg-[#C5BBAE] dark:bg-[#5E574E] dark:hover:bg-[#6B645B] transition-all flex items-center justify-center text-xs font-bold text-[#3A352F] dark:text-[#FAF7F0] ${
              activePart === 'c' ? 'ring-2 ring-[#742424] dark:ring-[#C99E52]' : ''
            }`}
          >
            <span className="truncate px-2">c ({cValue} USD · {cPercent.toFixed(1)}%)</span>
          </div>

          <div
            onClick={() => setActivePart('v')}
            style={{ width: `${vPercent}%` }}
            className={`h-full bg-[#D6C29E] hover:bg-[#C9B38B] dark:bg-[#6E5D43] dark:hover:bg-[#7D6B4E] transition-all flex items-center justify-center text-xs font-bold text-[#3D311F] dark:text-[#FAF7F0] ${
              activePart === 'v' ? 'ring-2 ring-[#742424] dark:ring-[#C99E52]' : ''
            }`}
          >
            <span className="truncate px-2">v ({vValue} USD · {vPercent.toFixed(1)}%)</span>
          </div>

          <div
            onClick={() => setActivePart('m')}
            style={{ width: `${mPercent}%` }}
            className={`h-full bg-[#742424] hover:bg-[#5E1D1D] dark:bg-[#8A3333] dark:hover:bg-[#9E3D3D] transition-all flex items-center justify-center text-xs font-bold text-[#FDFBF7] ${
              activePart === 'm' ? 'ring-2 ring-[#FDFBF7] dark:ring-[#C99E52]' : ''
            }`}
          >
            <span className="truncate px-2">m ({mValue} USD · {mPercent.toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      {/* Inspected Component Detail Card */}
      <div className="p-5 bg-[#F4EFE6]/80 dark:bg-stone-800/40 rounded-xl border border-[#DFD5C4] dark:border-stone-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-3.5 h-3.5 rounded-full ${curr.color}`} />
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              {curr.name}
            </h4>
          </div>
          <Formula math={curr.formula} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#FAF6EE] dark:bg-stone-900 rounded-lg border border-[#E2DACD] dark:border-stone-800">
            <span className="text-[11px] text-stone-400 block mb-1">Hình thái tồn tại</span>
            <p className="text-stone-700 dark:text-stone-300">{curr.nature}</p>
          </div>
          <div className="p-3 bg-[#FAF6EE] dark:bg-stone-900 rounded-lg border border-[#E2DACD] dark:border-stone-800">
            <span className="text-[11px] text-stone-400 block mb-1">Vai trò trong sản xuất giá trị thặng dư</span>
            <p className="text-stone-700 dark:text-stone-300">{curr.role}</p>
          </div>
        </div>
      </div>

      {/* Twofold nature of labor callout */}
      <div className="mt-4 p-4 bg-[#742424]/5 dark:bg-[#C99E52]/10 rounded-xl border border-[#742424]/20 dark:border-[#C99E52]/30 text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
        <strong>Tính chất hai mặt của lao động sản xuất:</strong> Nhờ <em>lao động cụ thể</em> của người công nhân mà giá trị của tư liệu sản xuất (c) được bảo tồn và chuyển dịch nguyên vẹn vào sản phẩm mới. Đồng thời, nhờ <em>lao động trừu tượng</em> mà người công nhân sáng tạo ra một lượng giá trị hoàn toàn mới (v + m).
      </div>
    </div>
  );
};
