import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  Search, 
  Filter, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle,
  Video
} from 'lucide-react';
import { KNOWLEDGE_VIDEOS } from '../../content/knowledgeVideosData';
import { KnowledgeVideo } from '../../types/video';

interface VideoKnowledgeHubProps {
  onPlayVideo: (video: KnowledgeVideo) => void;
  onNavigateToSection: (sectionId: string) => void;
  onSwitchToQuiz: () => void;
}

export const VideoKnowledgeHub: React.FC<VideoKnowledgeHubProps> = ({
  onPlayVideo,
  onNavigateToSection,
  onSwitchToQuiz,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredVideos = KNOWLEDGE_VIDEOS.filter(video => {
    const matchesSearch = 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.keyTerms.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSection = selectedSection === 'all' || video.sectionId === selectedSection;
    const matchesDifficulty = selectedDifficulty === 'all' || video.difficulty === selectedDifficulty;

    return matchesSearch && matchesSection && matchesDifficulty;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#682626] to-[#451818] dark:from-[#2A2318] dark:to-[#1B1812] text-[#FAF7F0] border border-[#8A6328]/30 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 dark:bg-amber-400/20 text-xs font-semibold uppercase tracking-wider text-amber-200 border border-white/15">
            🎬 Module Video Kiến thức – Học nhanh 2–5 phút
          </span>
          <span className="text-xs text-amber-100/80 font-mono">
            Tổng cộng: {KNOWLEDGE_VIDEOS.length} video tương tác
          </span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-white dark:text-[#E2B765]">
            Học thuyết Giá trị thặng dư qua Video trực quan
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 dark:text-stone-300 leading-relaxed">
            Hệ thống video ngắn được thiết kế theo phương pháp khoa học: <strong>Concept ➔ Animation ➔ Example ➔ Summary ➔ Quiz</strong>. Giúp sinh viên nắm trọn bản chất các quy luật kinh tế phức tạp chỉ trong 3 phút mà không giản lược khái niệm học thuật.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-black/20 border border-white/10">
            <span className="text-[11px] text-stone-300 block">Thời lượng trung bình</span>
            <span className="text-base font-bold text-amber-300">~3 phút / video</span>
          </div>
          <div className="p-3 rounded-xl bg-black/20 border border-white/10">
            <span className="text-[11px] text-stone-300 block">Mô phỏng chuyển động</span>
            <span className="text-base font-bold text-amber-300">Dòng tiền & Hàng hóa</span>
          </div>
          <div className="p-3 rounded-xl bg-black/20 border border-white/10">
            <span className="text-[11px] text-stone-300 block">Kiểm tra tức thì</span>
            <span className="text-base font-bold text-amber-300">Quick Quiz sau video</span>
          </div>
          <div className="p-3 rounded-xl bg-black/20 border border-white/10">
            <span className="text-[11px] text-stone-300 block">Học tập chủ động</span>
            <span className="text-base font-bold text-amber-300">Interactive Explainer</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm video: tư bản, mâu thuẫn, sức lao động, kéo sợi bông, AI 4.0..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-page)] text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#8A6328]"
            />
          </div>

          {/* Section Filter */}
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-page)] text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
          >
            <option value="all">Tất cả các mục giáo trình</option>
            <option value="3.1">Mục 3.1: Tổng quan lý luận Mác</option>
            <option value="3.1.1">Mục 3.1.1: Nguồn gốc giá trị thặng dư</option>
            <option value="3.1.2">Mục 3.1.2: Bản chất của giá trị thặng dư</option>
            <option value="3.2">Mục 3.2: CMCN 4.0 & Thực tiễn VN</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-page)] text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
          >
            <option value="all">Mọi cấp độ</option>
            <option value="Cơ bản">Cơ bản</option>
            <option value="Trọng tâm">Trọng tâm</option>
            <option value="Nâng cao">Nâng cao</option>
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map(video => (
          <div
            key={video.id}
            className="group rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] overflow-hidden shadow-xs hover:border-[#8A6328]/60 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Thumbnail Stage */}
              <div 
                onClick={() => onPlayVideo(video)}
                className="relative h-44 bg-gradient-to-br from-[#2D2A26] to-[#181715] flex flex-col items-center justify-center cursor-pointer overflow-hidden p-4 text-center border-b border-[#3E3A33]"
              >
                <div className="text-4xl mb-2 transition-transform group-hover:scale-110">
                  {video.thumbnailEmoji}
                </div>

                {/* Video Play Overlay Button */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#682626] group-hover:bg-[#541E1E] dark:bg-[#C2A267] dark:group-hover:bg-[#AF8E53] text-white dark:text-stone-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[11px] font-mono text-stone-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{video.formattedDuration}</span>
                </div>

                {/* Section Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#682626]/90 text-[10px] font-mono font-semibold text-[#FAF7F0]">
                  Mục {video.sectionNumber}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-semibold text-[#8A6328] dark:text-[#C2A267]">
                      {video.badgeText}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] font-medium text-stone-600 dark:text-stone-400 text-[10px]">
                      {video.difficulty}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onPlayVideo(video)}
                    className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-[#682626] dark:group-hover:text-[#C2A267] cursor-pointer transition-colors leading-snug line-clamp-2"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {video.subtitle}
                  </p>
                </div>

                {/* Formula Teaser */}
                <div className="p-2 rounded-lg bg-[var(--bg-subtle)]/70 dark:bg-[var(--bg-page)] border border-[var(--border-color)]/60 dark:border-[var(--border-color)]/60 font-mono text-[11px] text-[#682626] dark:text-[#E2B765] truncate">
                  {video.formulaDiagram.code.split('\n')[0]}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="px-4 py-3 border-t border-[var(--border-color)] dark:border-[var(--border-color)] bg-[var(--bg-surface)] dark:bg-[#201F1C] flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => onNavigateToSection(video.sectionId)}
                className="text-[11px] text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" />
                <span>Đọc bài {video.sectionNumber}</span>
              </button>

              <button
                onClick={() => onPlayVideo(video)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#682626] hover:bg-[#541E1E] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] text-[#FAF7F0] dark:text-[#1B1A18] font-semibold transition-colors shadow-xs"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Xem video</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="p-12 text-center text-stone-500 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] dark:border-[var(--border-color)] space-y-2">
          <p className="text-sm font-semibold">Không tìm thấy video phù hợp với từ khóa.</p>
          <p className="text-xs">Hãy thử tìm các từ: "tư bản", "thặng dư", "sức lao động", "kéo sợi", "4.0".</p>
        </div>
      )}
    </div>
  );
};
