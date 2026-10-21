import React from 'react';
import { KnowledgeVideo, VideoScene } from '../../types/video';
import { 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  Cpu, 
  Users, 
  ShieldCheck, 
  Scale, 
  Layers, 
  Play, 
  Pause, 
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Flame,
  Award,
  Clock
} from 'lucide-react';

interface InteractiveExplainerCanvasProps {
  video: KnowledgeVideo;
  currentScene: VideoScene;
  currentTime: number;
  isPlaying: boolean;
  playbackRate: number;
  showSubtitles: boolean;
  onJumpToTime: (time: number) => void;
  onTogglePlay: () => void;
}

export const InteractiveExplainerCanvas: React.FC<InteractiveExplainerCanvasProps> = ({
  video,
  currentScene,
  currentTime,
  isPlaying,
  showSubtitles,
  onJumpToTime,
  onTogglePlay,
}) => {
  // Calculate scene progress (0 to 1)
  const sceneDuration = Math.max(1, currentScene.endTime - currentScene.startTime);
  const sceneProgress = Math.min(1, Math.max(0, (currentTime - currentScene.startTime) / sceneDuration));
  const overallProgress = video.durationSeconds > 0 ? (currentTime / video.durationSeconds) : 0;

  // Find active subtitle if available
  const activeTranscript = video.transcript
    .slice()
    .reverse()
    .find(t => currentTime >= t.time);

  const isAtBeginning = currentTime < 1;

  return (
    <div 
      className="relative w-full aspect-video bg-gradient-to-b from-[#181614] via-[#22201D] to-[#141312] rounded-xl overflow-hidden select-none border border-[#3E3A33] shadow-2xl flex flex-col justify-between group cursor-pointer"
      onClick={onTogglePlay}
    >
      {/* Top Header: Scene indicator, Timecode, Title */}
      <div className="absolute top-0 left-0 right-0 z-30 p-2.5 sm:p-3.5 bg-gradient-to-b from-black/85 via-black/50 to-transparent flex items-center justify-between text-xs font-sans text-stone-200">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded bg-[#8A6328]/90 text-amber-100 font-mono text-[11px] font-bold tracking-wide uppercase border border-amber-500/40 shrink-0">
            Cảnh {currentScene.sceneNumber}/{video.scenes.length}: {currentScene.type.toUpperCase()}
          </span>
          <span className="font-semibold text-stone-200 truncate text-xs sm:text-sm">
            {currentScene.title}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-stone-300 shrink-0">
          <span className="hidden sm:inline text-stone-400">Tiến độ:</span>
          <div className="w-16 sm:w-20 h-1.5 rounded-full bg-stone-700/80 overflow-hidden">
            <div
              className="h-full bg-amber-400 transition-all duration-150 ease-out"
              style={{ width: `${Math.round(overallProgress * 100)}%` }}
            />
          </div>
          <span className="text-amber-300 font-bold">{Math.round(overallProgress * 100)}%</span>
        </div>
      </div>

      {/* Main Animated Visual Stage */}
      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C2A267_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

        {/* Big Intro Poster when at 00:00 and not playing */}
        {isAtBeginning && !isPlaying ? (
          <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-lg px-4 py-6 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-4xl sm:text-5xl mb-3 drop-shadow-md">
              {video.thumbnailEmoji}
            </div>
            <div className="px-3 py-1 rounded-full bg-[#682626]/80 text-amber-200 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
              {video.badgeText}
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-2xl text-amber-100 mb-1 leading-snug">
              {video.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mb-5 leading-relaxed">
              {video.subtitle}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
              }}
              className="group/btn flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8A6328] to-[#C2A267] hover:from-[#9D7130] hover:to-[#D4B579] text-stone-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-900/40 transition-all transform hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current text-stone-950" />
              <span>Bắt đầu xem video ({video.formattedDuration})</span>
            </button>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-stone-400 font-mono">
              <span>Gồm {video.scenes.length} phân cảnh</span>
              <span>•</span>
              <span>Có phụ đề & câu hỏi ôn tập</span>
            </div>
          </div>
        ) : (
          /* Dynamic Scene Renderer based on video ID and scene */
          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center text-center">
            {renderSceneVisual(video, currentScene, sceneProgress, isPlaying)}
          </div>
        )}

        {/* Center Pause Indicator Overlay (when paused mid-video) */}
        {!isAtBeginning && !isPlaying && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity">
            <div className="w-16 h-16 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Subtitles Overlay */}
      {showSubtitles && activeTranscript && !isAtBeginning && (
        <div className="absolute bottom-3 left-4 right-4 z-20 flex justify-center pointer-events-none">
          <div className="px-4 py-2 rounded-lg bg-black/90 backdrop-blur-md border border-stone-700 text-stone-100 text-xs sm:text-sm font-sans text-center max-w-xl shadow-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-150">
            <p className="font-medium text-amber-100">
              {activeTranscript.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Complete visual logic for all 10 videos
function renderSceneVisual(video: KnowledgeVideo, scene: VideoScene, progress: number, isPlaying: boolean) {
  const videoId = video.id;

  // 1. H - T - H
  if (videoId === 'video-hth') {
    const activeStep = progress < 0.33 ? 1 : progress < 0.67 ? 2 : 3;

    return (
      <div className="w-full space-y-5 animate-in fade-in duration-300">
        {/* Step tracker */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-stone-400">
          <span className={`px-2 py-0.5 rounded-full transition-all ${activeStep === 1 ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800'}`}>
            Bước 1: Bán hàng lấy tiền
          </span>
          <span>➔</span>
          <span className={`px-2 py-0.5 rounded-full transition-all ${activeStep === 2 ? 'bg-emerald-500 text-stone-950 font-bold' : 'bg-stone-800'}`}>
            Bước 2: Tiền làm môi giới
          </span>
          <span>➔</span>
          <span className={`px-2 py-0.5 rounded-full transition-all ${activeStep === 3 ? 'bg-rose-500 text-stone-950 font-bold' : 'bg-stone-800'}`}>
            Bước 3: Mua hàng để dùng
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-5 font-mono text-xs">
          {/* H1 */}
          <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 1
              ? 'bg-[#8A6328]/50 border-amber-400 scale-105 shadow-xl shadow-amber-950/60 ring-2 ring-amber-400/40'
              : 'bg-[#8A6328]/20 border-amber-500/50 opacity-80'
          }`}>
            <div className="text-3xl mb-1">🌾</div>
            <div className="text-xs font-bold text-amber-200">HÀNG HÓA 1</div>
            <div className="text-[11px] text-stone-300">100kg Lúa</div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-amber-300 font-sans mb-0.5">Bán</span>
            <ArrowRight className={`w-5 h-5 transition-colors ${activeStep >= 2 ? 'text-amber-400 animate-pulse' : 'text-stone-600'}`} />
          </div>

          {/* T */}
          <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 2
              ? 'bg-emerald-950/80 border-emerald-400 scale-105 shadow-xl shadow-emerald-950/60 ring-2 ring-emerald-400/40'
              : 'bg-emerald-950/30 border-emerald-500/50 opacity-80'
          }`}>
            <div className="text-3xl mb-1">💰</div>
            <div className="text-xs font-bold text-emerald-300">TIỀN TỆ (T)</div>
            <div className="text-[11px] text-stone-300">1.000.000 đ</div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-amber-300 font-sans mb-0.5">Mua</span>
            <ArrowRight className={`w-5 h-5 transition-colors ${activeStep === 3 ? 'text-amber-400 animate-pulse' : 'text-stone-600'}`} />
          </div>

          {/* H2 */}
          <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 3
              ? 'bg-rose-950/80 border-rose-400 scale-105 shadow-xl shadow-rose-950/60 ring-2 ring-rose-400/40'
              : 'bg-rose-950/30 border-rose-500/50 opacity-80'
          }`}>
            <div className="text-3xl mb-1">🧵</div>
            <div className="text-xs font-bold text-rose-200">HÀNG HÓA 2</div>
            <div className="text-[11px] text-stone-300">10m Vải</div>
          </div>
        </div>

        <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-700 max-w-lg mx-auto text-xs font-sans text-stone-300 shadow-md">
          <p className="font-semibold text-amber-300 mb-1 flex items-center justify-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Mục đích: Giá trị sử dụng (Thỏa mãn nhu cầu tiêu dùng)
          </p>
          <p className="text-stone-400 text-[11px] leading-relaxed">
            Hành vi chấm dứt khi người nông dân có Vải để mặc. Tiền chỉ đóng vai trò vật trung gian phục vụ trao đổi, không tự tăng thêm giá trị!
          </p>
        </div>
      </div>
    );
  }

  // 2. T - H - T'
  if (videoId === 'video-tht') {
    const activeStep = progress < 0.35 ? 1 : progress < 0.7 ? 2 : 3;

    return (
      <div className="w-full space-y-5 animate-in fade-in duration-300">
        {/* Step tracker */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-stone-400">
          <span className={`px-2 py-0.5 rounded-full transition-all ${activeStep === 1 ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800'}`}>
            1. Ứng tiền (T)
          </span>
          <span>➔</span>
          <span className={`px-2 py-0.5 rounded-full transition-all ${activeStep === 2 ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800'}`}>
            2. Mua TLSX & Sức LĐ (H)
          </span>
          <span>➔</span>
          <span className={`px-2 py-0.5 rounded-full transition-all ${activeStep === 3 ? 'bg-emerald-500 text-stone-950 font-bold animate-pulse' : 'bg-stone-800'}`}>
            3. Thu hồi Tiền lớn hơn (T′ = T + m)
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-5 font-mono text-xs">
          {/* T ban đầu */}
          <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 1
              ? 'bg-stone-800 border-amber-400 scale-105 shadow-xl shadow-amber-950/50 ring-2 ring-amber-400/40'
              : 'bg-stone-800/80 border-stone-700 opacity-80'
          }`}>
            <div className="text-3xl mb-1">💵</div>
            <div className="text-xs font-bold text-amber-300">TIỀN ỨNG (T)</div>
            <div className="text-[11px] text-stone-300 font-bold">100 Triệu</div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-stone-400 font-sans mb-0.5">Ứng ra</span>
            <ArrowRight className={`w-5 h-5 transition-colors ${activeStep >= 2 ? 'text-amber-400 animate-pulse' : 'text-stone-600'}`} />
          </div>

          {/* H */}
          <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 2
              ? 'bg-stone-800 border-amber-400 scale-105 shadow-xl shadow-amber-950/50 ring-2 ring-amber-400/40'
              : 'bg-stone-800/80 border-amber-500/40 opacity-80'
          }`}>
            <div className="text-3xl mb-1">🏭</div>
            <div className="text-xs font-bold text-stone-200">HÀNG HÓA (H)</div>
            <div className="text-[11px] text-amber-300">Tư liệu + SLĐ</div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-stone-400 font-sans mb-0.5">Bán ra</span>
            <ArrowRight className={`w-5 h-5 transition-colors ${activeStep === 3 ? 'text-amber-400 animate-pulse' : 'text-stone-600'}`} />
          </div>

          {/* T' */}
          <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 3
              ? 'bg-[#682626] border-amber-400 scale-110 shadow-2xl shadow-amber-900/60 ring-4 ring-amber-400/50'
              : 'bg-[#682626]/40 border-amber-500/50 opacity-85'
          }`}>
            <div className="text-3xl mb-1 flex justify-center">
              💰<Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            </div>
            <div className="text-xs font-bold text-amber-300">TIỀN MỚI (T′)</div>
            <div className="text-[11px] text-amber-200 font-bold">120 Triệu!</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-300">
            T′ = T + ΔT
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-[#8A6328]/50 border border-amber-400 text-amber-200 font-bold flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            ΔT = 20 Triệu = Giá trị thặng dư (m)
          </div>
        </div>
      </div>
    );
  }

  // 3. Giá trị thặng dư là gì? (video-surplus-definition / video-surplus-concept)
  if (videoId === 'video-surplus-definition' || videoId === 'video-surplus-concept') {
    return (
      <div className="w-full space-y-4 animate-in fade-in duration-300">
        <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-700 max-w-lg mx-auto">
          <span className="text-[11px] font-mono text-stone-400 block mb-1">Cấu trúc giá trị hàng hóa toàn phần:</span>
          <div className="text-lg font-mono font-bold text-amber-300 tracking-wider">
            W = c + v + m
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto text-xs font-sans text-left">
          <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
            <span className="font-mono font-bold text-cyan-400 block mb-0.5">c (Bất biến)</span>
            <p className="text-[11px] text-stone-300">Máy móc, nguyên liệu.</p>
            <span className="text-[10px] text-stone-400 italic block mt-1">Chỉ chuyển dịch giá trị</span>
          </div>

          <div className="p-3 rounded-xl bg-stone-800/80 border border-emerald-600/50">
            <span className="font-mono font-bold text-emerald-400 block mb-0.5">v (Khả biến)</span>
            <p className="text-[11px] text-stone-300">Tiền lương trả công nhân.</p>
            <span className="text-[10px] text-emerald-300 italic block mt-1">Tái tạo giá trị sức LĐ</span>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-400 ring-1 ring-amber-400/40 shadow-lg">
            <span className="font-mono font-bold text-amber-300 block mb-0.5">m (Thặng dư)</span>
            <p className="text-[11px] text-amber-100 font-semibold">Giá trị dôi ra ngoài v.</p>
            <span className="text-[10px] text-amber-300 font-bold block mt-1">Nhà tư bản chiếm đoạt!</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 max-w-md mx-auto text-[11px] text-stone-300">
          ⚖️ <span className="font-semibold text-amber-300">Bản chất:</span> Giá trị thặng dư là phần lao động không công của công nhân bị nhà tư bản chiếm đoạt.
        </div>
      </div>
    );
  }

  // 4. Mâu thuẫn công thức chung (video-contradiction)
  if (videoId === 'video-contradiction') {
    return (
      <div className="w-full space-y-4 animate-in fade-in duration-300 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
          <div className="p-3 rounded-xl bg-stone-900/90 border border-amber-500/40 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>Trong lưu thông (Thị trường)</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              • Trao đổi ngang giá: 100$ = 100$ hàng ➔ m = 0.<br />
              • Bán đắt / Mua rẻ: Tổng giá trị toàn xã hội không đổi (trò chơi tổng bằng không).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-900/90 border border-rose-500/40 space-y-1.5">
            <div className="font-bold text-rose-300 flex items-center gap-1.5">
              <span>Ngoài lưu thông (Két sắt, kho)</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              • Tiền cất két: 100$ để 10 năm vẫn là 100$.<br />
              • Hàng hóa để kho: Hao mòn, hư hỏng, không tự sinh ra tiền mới!
            </p>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-[#682626]/50 via-stone-900 to-[#8A6328]/50 border border-amber-500/50 rounded-xl max-w-lg mx-auto text-center">
          <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block font-bold mb-1">
            🔑 Kết luận biện chứng của C. Mác:
          </span>
          <p className="text-xs text-stone-200 italic font-serif">
            "Tư bản phải xuất hiện trong lưu thông và đồng thời không phải trong lưu thông."
          </p>
          <div className="mt-1 text-xs font-bold text-emerald-400">
            ➔ Chìa khóa: Mua hàng hóa đặc biệt SỨC LAO ĐỘNG!
          </div>
        </div>
      </div>
    );
  }

  // 5. Hàng hóa sức lao động (video-labor-power)
  if (videoId === 'video-labor-power') {
    return (
      <div className="w-full space-y-4 animate-in fade-in duration-300 font-sans text-xs">
        <div className="p-2.5 rounded-xl bg-stone-900/90 border border-amber-500/40 max-w-md mx-auto">
          <span className="font-bold text-amber-300 text-sm block">
            2 Điều kiện lịch sử để Sức lao động thành Hàng hóa:
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto text-left">
          <div className="p-3 rounded-xl bg-stone-800/80 border border-emerald-500/50 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Điều kiện 1: Tự do thân thể</span>
            </div>
            <p className="text-[11px] text-stone-300">
              Người lao động được tự do về thân thể, làm chủ sức lao động của mình để đem bán có thời hạn.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-800/80 border border-rose-500/50 space-y-1">
            <div className="flex items-center gap-1.5 text-rose-300 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Điều kiện 2: Vô sản tư liệu</span>
            </div>
            <p className="text-[11px] text-stone-300">
              Bị tước đoạt hết tư liệu sản xuất, không thể tự sản xuất để nuôi sống mình, buộc phải đi làm thuê.
            </p>
          </div>
        </div>

        <div className="p-2 bg-stone-900/90 rounded-lg border border-stone-700 max-w-md mx-auto text-[11px] text-stone-400">
          💡 Nếu thiếu 1 trong 2 điều kiện, phương thức sản xuất tư bản chủ nghĩa không thể hình thành.
        </div>
      </div>
    );
  }

  // 6. Hai thuộc tính hàng hóa sức lao động (video-labor-properties / video-two-attributes)
  if (videoId === 'video-labor-properties' || videoId === 'video-two-attributes') {
    return (
      <div className="w-full space-y-4 animate-in fade-in duration-300 font-sans text-xs">
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto text-left">
          {/* Giá trị */}
          <div className="p-3 rounded-xl bg-stone-900/90 border border-cyan-500/50 space-y-1.5">
            <span className="font-bold text-cyan-300 text-xs block uppercase">
              1. Giá trị của Sức LĐ
            </span>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Quy về giá trị của tư liệu sinh hoạt thiết yếu để nuôi sống người công nhân + gia đình họ + chi phí đào tạo.
            </p>
            <div className="text-[10px] text-cyan-200 font-mono bg-cyan-950/60 p-1.5 rounded">
              Ví dụ: Lương 15$/ngày (đủ ăn mặc ở)
            </div>
          </div>

          {/* Giá trị sử dụng */}
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-400 ring-1 ring-amber-400/40 space-y-1.5">
            <span className="font-bold text-amber-300 text-xs block uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              2. Giá trị sử dụng (Kỳ diệu)
            </span>
            <p className="text-[11px] text-amber-100 leading-relaxed">
              Khi được tiêu dùng (làm việc), nó sáng tạo ra một lượng giá trị mới <strong>lớn hơn giá trị của bản thân nó</strong>!
            </p>
            <div className="text-[10px] text-amber-200 font-mono bg-amber-900/40 p-1.5 rounded font-bold">
              Tạo ra 30$/ngày (Dôi ra 15$ thặng dư)
            </div>
          </div>
        </div>

        <div className="p-2.5 bg-stone-900/90 rounded-lg border border-stone-700 max-w-md mx-auto text-center text-xs text-stone-200">
          ✨ Đây chính là <strong>nguồn gốc duy nhất</strong> sinh ra giá trị thặng dư trong chủ nghĩa tư bản!
        </div>
      </div>
    );
  }

  // 7. Chìa khóa giải quyết mâu thuẫn (video-labor-key / video-key-solution)
  if (videoId === 'video-labor-key' || videoId === 'video-key-solution') {
    return (
      <div className="w-full space-y-4 animate-in fade-in duration-300 font-sans text-xs">
        <div className="p-3 rounded-xl bg-gradient-to-r from-stone-900 via-[#8A6328]/30 to-stone-900 border border-amber-500/50 max-w-lg mx-auto">
          <div className="text-2xl mb-1">🔑</div>
          <h4 className="font-bold text-amber-300 text-sm">
            Vì sao Hàng hóa Sức lao động là chìa khóa?
          </h4>
        </div>

        <div className="flex items-center justify-center gap-3 max-w-lg mx-auto font-mono text-xs">
          <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 flex-1 text-center">
            <span className="text-[10px] text-stone-400 block font-sans">Trong lưu thông:</span>
            <span className="text-xs font-bold text-emerald-400">Mua đúng giá trị</span>
            <p className="text-[10px] text-stone-400 font-sans mt-0.5">(Trả lương sòng phẳng)</p>
          </div>

          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />

          <div className="p-3 rounded-xl bg-[#682626]/40 border border-amber-400 flex-1 text-center">
            <span className="text-[10px] text-amber-300 block font-sans">Trong sản xuất:</span>
            <span className="text-xs font-bold text-amber-300">Bắt làm việc quá mức</span>
            <p className="text-[10px] text-amber-200 font-sans mt-0.5">(Tạo ra giá trị mới lớn hơn)</p>
          </div>
        </div>

        <div className="p-2 bg-stone-900/90 rounded-lg border border-stone-700 max-w-md mx-auto text-[11px] text-stone-300 text-center">
          Mác khẳng định: Không vi phạm quy luật giá trị mà nhà tư bản vẫn bỏ túi khoản giá trị thặng dư khổng lồ!
        </div>
      </div>
    );
  }

  // 8. Quá trình sản xuất giá trị thặng dư (kéo sợi bông) (video-production-process)
  if (videoId === 'video-production-process') {
    const currentHour = Math.min(8, Math.max(0, Math.round(progress * 8 * 10) / 10));
    const isSecondHalf = progress >= 0.5;

    return (
      <div className="w-full space-y-4 animate-in fade-in duration-300 font-sans text-xs">
        {/* Interactive 8h Working Day Timeline */}
        <div className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-700 max-w-lg mx-auto space-y-1.5 shadow-md">
          <div className="flex justify-between items-center text-[10px] font-mono text-stone-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Tiến trình ngày làm việc:</span>
              <strong className="text-amber-300 text-xs">{currentHour}h / 8h</strong>
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isSecondHalf
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              {isSecondHalf ? "Giai đoạn 2: Lao động thặng dư (t')" : 'Giai đoạn 1: Lao động tất yếu (t)'}
            </span>
          </div>

          <div className="relative w-full h-3 bg-stone-800 rounded-full overflow-hidden flex border border-stone-700">
            {/* 4h đầu boundary */}
            <div className="w-1/2 h-full bg-emerald-950/80 border-r border-dashed border-stone-500 relative flex items-center justify-center">
              <span className="text-[8px] font-mono text-emerald-300 font-bold">4h Tất yếu (t)</span>
            </div>
            {/* 4h sau boundary */}
            <div className="w-1/2 h-full bg-amber-950/80 relative flex items-center justify-center">
              <span className="text-[8px] font-mono text-amber-300 font-bold">4h Thặng dư (t')</span>
            </div>
            {/* Live Progress Scrubber */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 transition-all duration-150 shadow-sm"
              style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto text-left">
          {/* 4h đầu */}
          <div className={`p-3 rounded-xl border transition-all duration-300 ${
            !isSecondHalf
              ? 'bg-emerald-950/60 border-emerald-400 scale-[1.02] shadow-xl shadow-emerald-950/50 ring-2 ring-emerald-400/40'
              : 'bg-emerald-950/20 border-emerald-500/30 opacity-75'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                4 GIỜ ĐẦU: TẤT YẾU (t)
              </span>
              {!isSecondHalf && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold animate-pulse">
                  Đang chạy
                </span>
              )}
            </div>
            <ul className="space-y-1 text-stone-300 text-[11px]">
              <li>• 10kg bông: 100$ (c1)</li>
              <li>• Hao mòn máy: 6$ (c2)</li>
              <li>• Lao động tạo mới: 15$ (v)</li>
              <li className="pt-1 font-bold text-emerald-300 border-t border-emerald-800">
                ➔ Bù đúng 15$ tiền lương!
              </li>
            </ul>
          </div>

          {/* 4h sau */}
          <div className={`p-3 rounded-xl border transition-all duration-300 ${
            isSecondHalf
              ? 'bg-amber-950/60 border-amber-400 scale-[1.02] shadow-xl shadow-amber-950/50 ring-2 ring-amber-400/40'
              : 'bg-amber-950/20 border-amber-500/30 opacity-75'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-amber-300 font-bold">
                4 GIỜ SAU: THẶNG DƯ (t′)
              </span>
              {isSecondHalf && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 font-bold animate-pulse">
                  Bóc lột m
                </span>
              )}
            </div>
            <ul className="space-y-1 text-stone-300 text-[11px]">
              <li>• 10kg bông: 100$ (c1)</li>
              <li>• Hao mòn máy: 6$ (c2)</li>
              <li>• Lao động tạo thêm: 15$ (m)</li>
              <li className="pt-1 font-bold text-amber-300 border-t border-amber-800">
                ➔ 15$ thuần túy cho Nhà tư bản!
              </li>
            </ul>
          </div>
        </div>

        <div className="p-2.5 bg-stone-900/90 rounded-lg border border-amber-500/40 max-w-md mx-auto text-xs font-mono text-amber-200 flex items-center justify-center gap-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Tỷ suất bóc lột: m′ = (15$ / 15$) × 100% = 100%!</span>
        </div>
      </div>
    );
  }

  // 9. Bản chất giá trị thặng dư & Tỷ suất m' (video-nature-surplus)
  if (videoId === 'video-nature-surplus') {
    return (
      <div className="w-full space-y-4 animate-in fade-in duration-300 font-sans text-xs">
        <div className="p-3 rounded-xl bg-stone-900/90 border border-amber-500/40 max-w-lg mx-auto text-center shadow-md">
          <span className="text-xs font-bold text-amber-300 block mb-1">
            2 Công thức đo lường cốt lõi:
          </span>
          <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-700 hover:border-amber-400/50 transition-colors">
              <span className="text-[10px] text-stone-400 block font-sans">Tỷ suất giá trị thặng dư:</span>
              <span className="text-amber-300 font-bold text-sm">m′ = (m / v) × 100%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-700 hover:border-emerald-400/50 transition-colors">
              <span className="text-[10px] text-stone-400 block font-sans">Khối lượng thặng dư:</span>
              <span className="text-emerald-400 font-bold text-sm">M = m′ × V</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-700 max-w-lg mx-auto text-left text-[11px] text-stone-300 leading-relaxed shadow-sm">
          • <strong className="text-amber-300">m′</strong> phản ánh trình độ bóc lột của nhà tư bản đối với công nhân làm thuê.<br />
          • <strong className="text-emerald-300">M</strong> phản ánh quy mô bóc lột của nhà tư bản trên toàn bộ lực lượng lao động.
        </div>
      </div>
    );
  }

  // 10. CMCN 4.0 và AI (video-industry-40)
  if (videoId === 'video-industry-40') {
    return (
      <div className="w-full space-y-4 animate-in fade-in duration-300 font-sans text-xs">
        <div className="flex items-center justify-center gap-3 max-w-lg mx-auto">
          <div className="flex-1 p-3 rounded-xl bg-stone-900/90 border border-cyan-500/40 text-left space-y-1 shadow-md hover:border-cyan-400 transition-all">
            <div className="flex items-center gap-1.5 text-stone-200 font-bold">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Robot & AI</span>
            </div>
            <div className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 text-[10px] font-mono inline-block border border-cyan-700/50">
              TƯ BẢN BẤT BIẾN (c)
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Chỉ chuyển giá trị cũ hao mòn vào sản phẩm, không thể tự tạo ra giá trị mới!
            </p>
          </div>

          <div className="px-2 py-1 rounded-full bg-stone-800 border border-stone-600 text-xs font-bold text-amber-400 shadow-sm">
            VS
          </div>

          <div className="flex-1 p-3 rounded-xl bg-stone-900/90 border border-amber-500/50 text-left space-y-1 shadow-md hover:border-amber-400 transition-all">
            <div className="flex items-center gap-1.5 text-amber-200 font-bold">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Lao động trí tuệ</span>
            </div>
            <div className="px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 text-[10px] font-mono inline-block border border-amber-700/50">
              TƯ BẢN KHẢ BIẾN (v)
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Kỹ sư phần mềm, nhà nghiên cứu sáng tạo ra giá trị mới khổng lồ (v + m).
            </p>
          </div>
        </div>

        <div className="p-2.5 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-lg border border-amber-500/30 max-w-md mx-auto text-center text-[11px] text-stone-200 shadow-sm">
          ⭐ Máy móc càng hiện đại thì <strong className="text-amber-300">lao động sống trí tuệ của con người</strong> càng đóng vai trò quyết định!
        </div>
      </div>
    );
  }

  // Fallback visual
  return (
    <div className="w-full space-y-3 max-w-md mx-auto font-sans text-center">
      <div className="p-4 rounded-xl bg-stone-900/90 border border-amber-500/40 space-y-2">
        <div className="text-3xl">{video.thumbnailEmoji}</div>
        <h4 className="text-sm font-bold text-amber-200">{scene.title}</h4>
        <p className="text-xs text-stone-300 leading-relaxed">
          {scene.narration}
        </p>
      </div>
    </div>
  );
}
