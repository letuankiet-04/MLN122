import React, { useState } from 'react';
import { Check, X, AlertCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { Formula } from '../common/Formula';

export const ContradictionExplorer: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'A' | 'B' | 'C'>('A');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({
    A: null,
    B: null,
    C: null,
  });

  const scenarios = {
    A: {
      id: 'A',
      title: 'Kịch bản A: Trao đổi ngang giá',
      subtitle: 'Hàng đổi lấy Hàng hoặc Hàng đổi lấy Tiền có cùng giá trị',
      content: 'Giả sử A đổi một tấm vải trị giá 100 USD lấy một đôi giày trị giá 100 USD của B. Sau cuộc trao đổi, cả A và B đều nhận được thứ mình cần dùng, nhưng tổng giá trị của A vẫn là 100 USD và của B vẫn là 100 USD. Lưu thông chỉ thay đổi hình thái của giá trị, không sinh ra thêm một xu nào.',
      question: 'Khi trao đổi hoàn toàn ngang giá, có thể sinh ra giá trị thặng dư (m) cho xã hội không?',
      options: [
        'Có thể, vì người mua được đôi giày mới bền đẹp hơn.',
        'Không thể, vì tổng giá trị hai bên bằng nhau, giá trị mới dôi ra = 0.'
      ],
      correct: 1,
      explanation: 'Chính xác! Trao đổi ngang giá chỉ phân phối lại giá trị sử dụng, tổng lượng giá trị trước và sau lưu thông là bất biến.'
    },
    B: {
      id: 'B',
      title: 'Kịch bản B: Trao đổi không ngang giá',
      subtitle: 'Bán đắt hơn giá trị, mua rẻ hơn giá trị hoặc gian lận thương mại',
      content: 'Nhà tư bản A bán hàng hóa cao hơn giá trị 10% (thu lời 10 USD). Nhưng khi A đi mua hàng hóa của các nhà tư bản khác, họ cũng bán đắt hơn 10%. Khoản tiền A kiếm thêm được khi bán lại bị mất đi khi mua. Xét trên quy mô toàn xã hội, số tiền người này được đúng bằng số tiền người kia mất. Tổng giá trị của toàn xã hội vẫn không đổi.',
      question: 'Tại sao việc bán đắt hoặc mua rẻ không thể giải thích nguồn gốc giá trị thặng dư của toàn xã hội?',
      options: [
        'Vì cái được của người bán đúng bằng cái mất của người mua; tổng giá trị xã hội không hề tăng lên.',
        'Vì trên thị trường không ai chịu mua hàng đắt.'
      ],
      correct: 0,
      explanation: 'Chính xác! C. Mác đã chỉ ra: Sự gian lận hay bán đắt chỉ làm thay đổi tỷ lệ phân phối giá trị giữa các túi tiền, chứ không thể tạo ra thêm giá trị thặng dư cho toàn xã hội.'
    },
    C: {
      id: 'C',
      title: 'Kịch bản C: Tiền nằm ngoài lưu thông',
      subtitle: 'Tiền cất giữ trong két sắt, hàng hóa để yên trong kho',
      content: 'Nếu nhà tư bản giữ khư khư số tiền của mình trong két sắt hoặc để hàng hóa trong kho dự trữ, không đem ra mua bán trao đổi hay thuê mướn lao động, thì tiền vẫn hoàn tiền, hàng vẫn hoàn hàng. Không có bất kỳ sự gia tăng giá trị nào xuất hiện.',
      question: 'Tiền tệ có thể tự lớn lên khi nằm ngoài lưu thông không?',
      options: [
        'Có, nếu để lâu năm thì tiền sẽ tự sinh lãi suất.',
        'Không, tiền nằm yên là tiền chết, không thể tự sinh thêm giá trị thặng dư.'
      ],
      correct: 1,
      explanation: 'Chính xác! Nằm ngoài lưu thông, tiền tệ hoàn toàn bất động, không tiếp xúc với bất kỳ quá trình sản xuất hay tạo giá trị mới nào.'
    }
  };

  const curr = scenarios[activeScenario];

  return (
    <div className="my-8 p-6 bg-[#FAF7F0] dark:bg-[#23221F] rounded-xl border border-[#DFD7CA] dark:border-[#383530] shadow-xs">
      <div className="border-b border-[#DFD7CA] dark:border-[#383530] pb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#8A6328] dark:text-[#C2A267]">
          Bài tập tư duy biện chứng
        </span>
        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
          Khám phá Mâu thuẫn trong công thức chung của tư bản
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
          Tại sao giá trị thặng dư không thể sinh ra từ lưu thông, nhưng cũng không thể sinh ra ở bên ngoài lưu thông?
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap gap-2 my-5">
        {(['A', 'B', 'C'] as const).map((sc) => (
          <button
            key={sc}
            onClick={() => setActiveScenario(sc)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all text-left flex-1 min-w-[160px] ${
              activeScenario === sc
                ? 'border-[#682626] dark:border-[#C2A267] bg-[#682626]/10 dark:bg-[#C2A267]/15 text-[#682626] dark:text-[#C2A267]'
                : 'border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#252420] hover:bg-[#EFE8DD] text-stone-700 dark:text-stone-300'
            }`}
          >
            <div className="font-bold">{scenarios[sc].title.split(':')[0]}</div>
            <div className="text-[11px] font-normal text-stone-500 truncate">
              {scenarios[sc].title.split(':')[1]}
            </div>
          </button>
        ))}
      </div>

      {/* Scenario Interactive Card */}
      <div className="p-5 bg-[#EFE8DD]/50 dark:bg-[#2A2824]/50 rounded-xl border border-[#DFD7CA] dark:border-[#383530]">
        <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
          {curr.title}
        </h4>
        <p className="text-xs text-stone-500 dark:text-stone-400 italic mb-3">
          {curr.subtitle}
        </p>
        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
          {curr.content}
        </p>

        {/* Check your understanding mini question */}
        <div className="pt-3 border-t border-[#DFD7CA] dark:border-[#383530]">
          <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Câu hỏi kiểm tra nhanh: {curr.question}
          </p>
          <div className="space-y-2">
            {curr.options.map((opt, idx) => {
              const isSelected = selectedAnswers[activeScenario] === idx;
              const isCorrect = idx === curr.correct;
              const showResult = selectedAnswers[activeScenario] !== null;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswers(prev => ({ ...prev, [activeScenario]: idx }))}
                  className={`w-full text-left p-2.5 text-xs rounded-md border transition-all flex items-center justify-between ${
                    showResult && isSelected
                      ? isCorrect
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                        : 'border-[#8A3333] bg-[#8A3333]/10 dark:bg-[#8A3333]/20 text-[#8A3333] dark:text-[#E09B9B]'
                      : showResult && isCorrect
                      ? 'border-emerald-600/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300'
                      : 'border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#23221F] hover:bg-[#EFE8DD] text-stone-800 dark:text-stone-200'
                  }`}
                >
                  <span>{opt}</span>
                  {showResult && isSelected && (
                    isCorrect ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-[#8A3333] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedAnswers[activeScenario] !== null && (
            <p className="mt-3 text-xs text-[#2D5A34] dark:text-[#88B88E] font-medium">
              {curr.explanation}
            </p>
          )}
        </div>
      </div>

      {/* Synthesis Box */}
      <div className="mt-6 p-4 bg-[#8A6328]/10 dark:bg-[#C2A267]/15 rounded-xl border border-[#8A6328]/25 dark:border-[#C2A267]/35 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-[#8A6328] dark:text-[#C2A267] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
          <strong className="text-stone-900 dark:text-stone-100 font-serif">Kết luận logic vĩ đại của C. Mác:</strong>{' '}
          &quot;Tư bản không thể xuất hiện từ lưu thông và cũng không thể xuất hiện ở bên ngoài lưu thông. Nó phải xuất hiện trong lưu thông và đồng thời không phải trong lưu thông.&quot; Chìa khóa giải quyết là: trong lưu thông, nhà tư bản mua được <strong>hàng hóa sức lao động</strong>, và ngoài lưu thông (trong xưởng sản xuất), nhà tư bản tiêu dùng sức lao động đó để tạo ra giá trị thặng dư.
        </div>
      </div>
    </div>
  );
};
