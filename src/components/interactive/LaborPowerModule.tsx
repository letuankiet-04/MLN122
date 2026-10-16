import React, { useState } from 'react';
import { ChevronDown, ChevronUp, UserCheck, Sparkles, Scale, HeartHandshake } from 'lucide-react';
import { Formula } from '../common/Formula';

export const LaborPowerModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conditions' | 'value' | 'useValue'>('value');
  const [expandedComponent, setExpandedComponent] = useState<number | null>(0);

  const componentsOfValue = [
    {
      title: '1. Giá trị tư liệu sinh hoạt thiết yếu cho bản thân người lao động',
      desc: 'Khoản chi phí cho ăn, mặc, ở, y tế, đi lại cần thiết để người công nhân duy trì sự sống bình thường và phục hồi lại năng lượng cơ bắp, trí não sau mỗi ngày lao động.',
    },
    {
      title: '2. Chi phí đào tạo người lao động',
      desc: 'Chi phí học nghề, đào tạo chuyên môn, tích lũy kỹ năng để người lao động có thể thực hiện được các công việc từ đơn giản đến phức tạp trong nền sản xuất hiện đại.',
    },
    {
      title: '3. Giá trị tư liệu sinh hoạt nuôi sống gia đình, con cái người lao động',
      desc: 'Để duy trì sự tồn tại liên tục của giai cấp công nhân trên thị trường qua các thế hệ, người công nhân phải có khả năng sinh con và nuôi nấng con cái họ trưởng thành thay thế họ.',
    },
  ];

  return (
    <div className="my-8 p-6 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-xs">
      <div className="border-b border-[#E7E1D6] dark:border-[#383632] pb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#B78C45] dark:text-[#E2B765]">
          Phân tích phạm trù trung tâm
        </span>
        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
          Hàng hóa Sức Lao Động — Hàng hóa đặc biệt của nền kinh tế thị trường
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
          Khám phá 2 điều kiện lịch sử và hai thuộc tính đặc thù làm nên bí mật của tư bản.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 my-5">
        <button
          onClick={() => setActiveTab('conditions')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
            activeTab === 'conditions'
              ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765]'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
          }`}
        >
          2 Điều kiện lịch sử
        </button>
        <button
          onClick={() => setActiveTab('value')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
            activeTab === 'value'
              ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765]'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
          }`}
        >
          Giá trị của Sức lao động
        </button>
        <button
          onClick={() => setActiveTab('useValue')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
            activeTab === 'useValue'
              ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-[#7F1D1D]/10 dark:bg-[#E2B765]/15 text-[#7F1D1D] dark:text-[#E2B765]'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
          }`}
        >
          Giá trị sử dụng đặc biệt
        </button>
      </div>

      {/* Tab 1: Conditions */}
      {activeTab === 'conditions' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/30">
              <div className="flex items-center gap-2 mb-2 text-[#7F1D1D] dark:text-[#E2B765]">
                <UserCheck className="w-5 h-5" />
                <h4 className="font-serif font-bold text-sm">Điều kiện 1: Tự do về thân thể</h4>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Người lao động phải là người tự do về thân thể, làm chủ năng lực lao động của mình và chỉ bán quyền sử dụng sức lao động đó trong một khoảng thời gian nhất định (theo giờ, ngày, tháng). Nếu bán đứt cả đời, họ sẽ trở thành nô lệ và bản thân con người biến thành hàng hóa chứ không phải sức lao động.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/30">
              <div className="flex items-center gap-2 mb-2 text-[#7F1D1D] dark:text-[#E2B765]">
                <Scale className="w-5 h-5" />
                <h4 className="font-serif font-bold text-sm">Điều kiện 2: Không có tư liệu sản xuất</h4>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Người lao động bị tước đoạt hết mọi tư liệu sản xuất và của cải, không có cách nào khác để tự tiến hành sản xuất nuôi sống bản thân ngoài việc phải đem bán sức lao động cho người có tư liệu sản xuất (nhà tư bản).
              </p>
            </div>
          </div>

          <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs text-stone-600 dark:text-stone-300">
            <strong>Phân biệt then chốt:</strong> <em>Sức lao động</em> là khả năng lao động tiềm tàng trong cơ thể con người. <em>Lao động</em> là quá trình vận dụng sức lao động vào thực tế sản xuất. Người công nhân bán <strong>sức lao động</strong>, chứ không thể bán lao động.
          </div>
        </div>
      )}

      {/* Tab 2: Value */}
      {activeTab === 'value' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            Cũng như mọi hàng hóa khác, giá trị của hàng hóa sức lao động được đo bằng <strong>thời gian lao động xã hội cần thiết</strong> để sản xuất và tái sản xuất ra sức lao động, quy về giá trị của toàn bộ tư liệu sinh hoạt nuôi sống công nhân và gia đình.
          </p>

          <div className="space-y-2">
            {componentsOfValue.map((comp, idx) => (
              <div
                key={idx}
                className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-stone-50/50 dark:bg-stone-800/30"
              >
                <button
                  onClick={() => setExpandedComponent(expandedComponent === idx ? null : idx)}
                  className="w-full p-3 text-left font-serif font-semibold text-xs text-stone-900 dark:text-stone-100 flex items-center justify-between hover:bg-stone-100/50 dark:hover:bg-stone-700/50"
                >
                  <span>{comp.title}</span>
                  {expandedComponent === idx ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>
                {expandedComponent === idx && (
                  <div className="p-3 pt-0 text-xs text-stone-600 dark:text-stone-300 border-t border-stone-200/50 dark:border-stone-700/50 mt-1">
                    {comp.desc}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-[#B78C45]/10 rounded-lg border border-[#B78C45]/20 text-xs text-stone-800 dark:text-stone-200">
            <strong>Yếu tố tinh thần và lịch sử đặc thù:</strong> Khác với hàng hóa thông thường chỉ thuần túy là vật chất, giá trị sức lao động còn bao hàm nhu cầu về văn hóa, tinh thần, nâng cao dân trí và phụ thuộc vào trình độ văn minh, điều kiện địa lý và truyền thống lịch sử của mỗi quốc gia.
          </div>
        </div>
      )}

      {/* Tab 3: Use-Value */}
      {activeTab === 'useValue' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="p-5 bg-[#7F1D1D]/5 dark:bg-[#E2B765]/10 rounded-xl border border-[#7F1D1D]/20 dark:border-[#E2B765]/30">
            <div className="flex items-center gap-2 mb-2 text-[#7F1D1D] dark:text-[#E2B765]">
              <Sparkles className="w-5 h-5" />
              <h4 className="font-serif font-bold text-sm">Đặc tính kỳ diệu của Giá trị sử dụng Sức lao động</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed mb-3">
              Khi tiêu dùng một hàng hóa thông thường (như ăn một cái bánh, mặc một chiếc áo), giá trị sử dụng của nó sẽ mất đi hoặc hao mòn dần theo thời gian. Nhưng khi tiêu dùng hàng hóa sức lao động (tức để người công nhân tiến hành lao động), người công nhân sáng tạo ra một lượng giá trị <strong>hoàn toàn mới lớn hơn giá trị của bản thân sức lao động</strong>.
            </p>
            <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 text-center font-serif text-sm">
              <span className="text-stone-500">Công thức giá trị mới do lao động sống sáng tạo ra:</span>
              <div className="text-base font-bold text-[#7F1D1D] dark:text-[#E2B765] mt-1">
                Giá trị mới = v (bù đắp sức lao động) + m (giá trị thặng dư)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
