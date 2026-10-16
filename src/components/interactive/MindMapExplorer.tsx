import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Search, ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

interface MindNode {
  id: string;
  title: string;
  desc: string;
  sectionId: string;
  category: 'core' | 'origin' | 'nature' | 'methods' | 'modern';
  children?: MindNode[];
}

const MIND_MAP_DATA: MindNode = {
  id: 'root',
  title: 'GIÁ TRỊ THẶNG DƯ (m)',
  desc: 'Quy luật kinh tế tuyệt đối của chủ nghĩa tư bản',
  sectionId: '3.1',
  category: 'core',
  children: [
    {
      id: 'branch-1',
      title: '1. Nguồn gốc của m',
      desc: 'Sự vận động của tiền và hàng hóa sức lao động',
      sectionId: '3.1.1',
      category: 'origin',
      children: [
        { id: '1-1', title: 'Công thức chung (T – H – T′)', desc: 'Mục đích là giá trị thặng dư', sectionId: '3.1.1', category: 'origin' },
        { id: '1-2', title: 'Mâu thuẫn công thức chung', desc: 'Không sinh ra từ lưu thông, cũng không ngoài lưu thông', sectionId: '3.1.1', category: 'origin' },
        { id: '1-3', title: 'Hàng hóa sức lao động', desc: '2 điều kiện & giá trị sử dụng đặc biệt (v + m)', sectionId: '3.1.1', category: 'origin' },
        { id: '1-4', title: 'Quá trình sản xuất m', desc: 'Ví dụ kéo sợi bông: t tất yếu + t′ thặng dư', sectionId: '3.1.1', category: 'origin' },
        { id: '1-5', title: 'Tư bản bất biến (c) & khả biến (v)', desc: 'G = c + v + m; chỉ có v sinh ra m', sectionId: '3.1.1', category: 'origin' },
      ],
    },
    {
      id: 'branch-2',
      title: '2. Bản chất của m',
      desc: 'Phản ánh quan hệ bóc lột giai cấp',
      sectionId: '3.1.2',
      category: 'nature',
      children: [
        { id: '2-1', title: "Tỷ suất m′ = (m/v) × 100%", desc: 'Đo lường trình độ bóc lột', sectionId: '3.1.2', category: 'nature' },
        { id: '2-2', title: "Khối lượng M = m′ × V", desc: 'Đo lường quy mô bóc lột', sectionId: '3.1.2', category: 'nature' },
        { id: '2-3', title: 'Chi phí sản xuất (k = c + v)', desc: 'Chi phí của nhà tư bản', sectionId: '3.1.2', category: 'nature' },
        { id: '2-4', title: 'Chuyển hóa m thành Lợi nhuận (p)', desc: 'Hình thái bề ngoài che đậy bóc lột', sectionId: '3.1.2', category: 'nature' },
      ],
    },
    {
      id: 'branch-3',
      title: '3. Các phương pháp sản xuất m',
      desc: 'Nâng cao tỷ suất bóc lột m′',
      sectionId: '3.1.3',
      category: 'methods',
      children: [
        { id: '3-1', title: 'Thặng dư tuyệt đối', desc: 'Kéo dài ngày làm việc (vấp phải giới hạn sinh lý & luật pháp)', sectionId: '3.1.3', category: 'methods' },
        { id: '3-2', title: 'Thặng dư tương đối', desc: 'Rút ngắn thời gian tất yếu bằng tăng NSLĐ xã hội', sectionId: '3.1.3', category: 'methods' },
        { id: '3-3', title: 'Thặng dư siêu ngạch', desc: 'Năng suất cá biệt cao hơn xã hội; động lực đổi mới công nghệ', sectionId: '3.1.3', category: 'methods' },
      ],
    },
    {
      id: 'branch-4',
      title: '4. CMCN 4.0 & Thực tiễn Việt Nam',
      desc: 'Sức sống của lý luận Mác trong thế giới đương đại',
      sectionId: '3.2',
      category: 'modern',
      children: [
        { id: '4-1', title: 'Robot & AI thuộc tư bản bất biến (c)', desc: 'Chỉ chuyển dịch giá trị, không tạo giá trị mới', sectionId: '3.2', category: 'modern' },
        { id: '4-2', title: 'Bóc lột trong kinh tế số', desc: 'Quản lý thuật toán, gig economy, lao động 24/7', sectionId: '3.2', category: 'modern' },
        { id: '4-3', title: 'Thực tiễn Việt Nam', desc: 'Thừa nhận m khách quan, phát triển KTTT định hướng XHCN', sectionId: '3.2', category: 'modern' },
      ],
    },
  ],
};

interface MindMapExplorerProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const MindMapExplorer: React.FC<MindMapExplorerProps> = ({ onNavigateToSection }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<MindNode | null>(MIND_MAP_DATA);

  const filterMatches = (node: MindNode): boolean => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const selfMatch = node.title.toLowerCase().includes(q) || node.desc.toLowerCase().includes(q);
    const childMatch = node.children?.some(filterMatches);
    return selfMatch || !!childMatch;
  };

  return (
    <div className="my-8 p-6 bg-[#FFFDF8] dark:bg-[#1E1D1A] rounded-xl border border-[#E7E1D6] dark:border-[#383632] shadow-xs">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7E1D6] dark:border-[#383632] pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#B78C45] dark:text-[#E2B765]">
            Bản đồ tri thức tương tác
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            Sơ đồ tư duy toàn diện: Lý luận Giá trị thặng dư
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
            Khám phá mối liên hệ logic giữa các phạm trù từ nguồn gốc đến hiện đại
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Lọc nhánh bản đồ..."
              className="pl-8 pr-3 py-1 text-xs rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 w-40 focus:w-52 transition-all"
            />
          </div>

          <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-md overflow-hidden bg-white dark:bg-stone-900">
            <button
              onClick={() => setZoom(z => Math.max(0.7, z - 0.1))}
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-stone-600 dark:text-stone-400 border-x border-stone-200 dark:border-stone-700">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
              title="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
              title="Khôi phục zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Visual Canvas */}
      <div className="my-6 overflow-x-auto p-4 bg-stone-50/50 dark:bg-stone-950/30 rounded-xl border border-stone-200/80 dark:border-stone-800/80 min-h-[420px]">
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          className="transition-transform duration-150 min-w-[760px] space-y-6"
        >
          {/* Central Root Node */}
          <div className="flex justify-center">
            <div
              onClick={() => setSelectedNode(MIND_MAP_DATA)}
              className="cursor-pointer px-6 py-3 rounded-2xl bg-[#7F1D1D] text-white shadow-md text-center max-w-sm ring-4 ring-[#7F1D1D]/20 hover:scale-105 transition-transform"
            >
              <div className="text-xs uppercase tracking-widest text-amber-200 font-semibold">Chủ đề trung tâm</div>
              <div className="font-serif font-bold text-base mt-0.5">{MIND_MAP_DATA.title}</div>
              <div className="text-[11px] text-stone-200 opacity-90 mt-1">{MIND_MAP_DATA.desc}</div>
            </div>
          </div>

          {/* 4 Main Branches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {MIND_MAP_DATA.children?.filter(filterMatches).map((branch) => (
              <div key={branch.id} className="space-y-3">
                {/* Branch Header Node */}
                <div
                  onClick={() => setSelectedNode(branch)}
                  className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                    selectedNode?.id === branch.id
                      ? 'border-[#7F1D1D] dark:border-[#E2B765] bg-white dark:bg-stone-900 shadow-xs'
                      : 'border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 hover:border-stone-300'
                  }`}
                >
                  <div className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center justify-between">
                    <span>{branch.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{branch.desc}</div>
                </div>

                {/* Sub Nodes */}
                <div className="space-y-2 pl-3 border-l-2 border-stone-200 dark:border-stone-700">
                  {branch.children?.filter(filterMatches).map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedNode(sub)}
                      className={`cursor-pointer p-2.5 rounded-lg border text-xs transition-all ${
                        selectedNode?.id === sub.id
                          ? 'border-[#B78C45] bg-[#B78C45]/10 text-stone-900 dark:text-stone-100 font-semibold'
                          : 'border-stone-200/60 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                      }`}
                    >
                      <div className="font-serif text-[11px] font-bold">{sub.title}</div>
                      <div className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">{sub.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Node Details & Direct Navigation */}
      {selectedNode && (
        <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Đang chọn nhánh kiến thức</span>
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              {selectedNode.title}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
              {selectedNode.desc}
            </p>
          </div>

          <button
            onClick={() => onNavigateToSection(selectedNode.sectionId)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#7F1D1D] hover:bg-[#681818] dark:bg-[#B78C45] dark:hover:bg-[#9E7535] dark:text-[#171717] rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 self-start sm:self-center"
          >
            <span>Mở mục giáo trình tương ứng</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
