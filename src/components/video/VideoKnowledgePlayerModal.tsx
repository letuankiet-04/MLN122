import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  FastForward, 
  Subtitles, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Mic, 
  MicOff, 
  ListVideo,
  Tv,
  Layers,
  Link as LinkIcon,
  ExternalLink
} from 'lucide-react';
import { KnowledgeVideo, VideoScene } from '../../types/video';
import { InteractiveExplainerCanvas } from './InteractiveExplainerCanvas';
import { KNOWLEDGE_VIDEOS } from '../../content/knowledgeVideosData';

interface VideoKnowledgePlayerModalProps {
  video: KnowledgeVideo;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onSwitchToQuiz?: () => void;
  onSelectVideo?: (videoId: string) => void;
}

export const VideoKnowledgePlayerModal: React.FC<VideoKnowledgePlayerModalProps> = ({
  video,
  isOpen,
  onClose,
  onNavigateToSection,
  onSwitchToQuiz,
  onSelectVideo,
}) => {
  // Video Mode: 'explainer' (Interactive Canvas) or 'youtube' (Real Video / Lecture)
  const [videoMode, setVideoMode] = useState<'explainer' | 'youtube'>('explainer');
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  // Playback States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [enableVoiceNarration, setEnableVoiceNarration] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'quiz' | 'formula'>('transcript');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Quick Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Reset video state when video changes or modal opens
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
    setSelectedAnswers({});
    setSubmittedQuiz({});
    if ('speechSynthesis' in window) {
      window.speechSynthesis?.cancel();
    }
  }, [video.id, isOpen]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Find current active scene
  const currentScene: VideoScene = video.scenes.find(
    s => currentTime >= s.startTime && currentTime <= s.endTime
  ) || video.scenes[video.scenes.length - 1] || {
    id: 'default',
    sceneNumber: 1,
    title: video.title,
    type: 'concept',
    startTime: 0,
    endTime: video.durationSeconds,
    narration: video.subtitle,
    visualStage: 'default'
  };

  // Playback timer loop
  useEffect(() => {
    if (!isOpen || videoMode !== 'explainer') return;

    if (isPlaying) {
      const interval = 100; // ms
      timerRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + (0.1 * playbackRate);
          if (next >= video.durationSeconds) {
            setIsPlaying(false);
            return video.durationSeconds;
          }
          return next;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackRate, video.durationSeconds, isOpen, videoMode]);

  // Voice narration using Web Speech API (optional interactive feature)
  useEffect(() => {
    if (!enableVoiceNarration || !isPlaying || videoMode !== 'explainer' || !('speechSynthesis' in window)) {
      window.speechSynthesis?.cancel();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentScene.narration);
    utterance.lang = 'vi-VN';
    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : volume;
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentScene.id, enableVoiceNarration, isPlaying, playbackRate, isMuted, volume, videoMode]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if ('speechSynthesis' in window) window.speechSynthesis?.cancel();
        onClose();
      }
      if (e.key === ' ' && videoMode === 'explainer') {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
          e.preventDefault();
          setIsPlaying(prev => !prev);
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, videoMode]);

  if (!isOpen) return null;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
  };

  const handleJumpToTime = (time: number) => {
    setCurrentTime(time);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleSelectQuizOption = (quizId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [quizId]: optionIndex }));
    setSubmittedQuiz(prev => ({ ...prev, [quizId]: true }));
  };

  // Highlighting key terms in transcript
  const renderHighlightedText = (text: string) => {
    const keywords = ['tư bản', 'giá trị thặng dư', 'sức lao động', 'giá trị sử dụng', 'giá trị hàng hóa', 'mâu thuẫn', 'lưu thông'];
    let highlighted = text;
    keywords.forEach(kw => {
      const regex = new RegExp(`(${kw})`, 'gi');
      highlighted = highlighted.replace(regex, `<mark class="bg-[#8A6328]/25 text-[#682626] dark:text-[#E2B765] font-semibold px-1 rounded">$1</mark>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  // Extract YouTube ID if user enters custom URL
  const getEmbedYoutubeId = () => {
    if (customYoutubeUrl.trim()) {
      const match = customYoutubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match && match[1]) return match[1];
    }
    return video.youtubeId || 'FzP69L5C8bU'; // Default educational lecture
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl max-h-[95vh] bg-[#FAF7F0] dark:bg-[#1E1D1A] rounded-2xl border border-[#DFD7CA] dark:border-[#383530] shadow-2xl overflow-hidden flex flex-col font-sans"
      >
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-[#DFD7CA] dark:border-[#383530] bg-[#F2ECE1] dark:bg-[#252420] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-md bg-[#682626] text-[#FAF7F0] dark:bg-[#C2A267] dark:text-[#1B1A18] text-xs font-bold uppercase tracking-wider shrink-0 shadow-xs">
              Mục {video.sectionNumber}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-sm sm:text-base md:text-lg text-stone-900 dark:text-stone-100 truncate">
                {video.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 hidden sm:block truncate">
                {video.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mode switch for study preference */}
            <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-lg bg-[#EFE8DD] dark:bg-[#2C2A26] border border-[#DFD7CA] dark:border-[#383530] text-xs font-medium">
              <span className="px-2 py-0.5 rounded bg-[#FAF7F0] dark:bg-[#1E1D1A] text-[#682626] dark:text-[#C2A267] font-semibold shadow-xs">
                🎬 Xem video ({video.formattedDuration})
              </span>
              {onNavigateToSection && (
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis?.cancel();
                    onClose();
                    onNavigateToSection(video.sectionId);
                  }}
                  className="px-2 py-0.5 rounded text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  📖 Đọc lý thuyết
                </button>
              )}
              {onSwitchToQuiz && (
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis?.cancel();
                    onClose();
                    onSwitchToQuiz();
                  }}
                  className="px-2 py-0.5 rounded text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  ✍️ Làm Quiz
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis?.cancel();
                onClose();
              }}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-[#EFE8DD] dark:hover:bg-[#2C2A26] transition-colors"
              title="Đóng modal (Phím Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left column (Player + Transcript/Quiz) & Right column (Takeaways/Formulas) */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          {/* Main Left Column: Video display, Controls, Interactive Tabs */}
          <div className="flex-1 p-3 sm:p-5 flex flex-col space-y-4 border-b lg:border-b-0 lg:border-r border-[#DFD7CA] dark:border-[#383530]">
            
            {/* View Mode Selector: Explainer vs YouTube Video */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#EFE8DD] dark:bg-[#252420] p-1.5 rounded-xl border border-[#DFD7CA] dark:border-[#383530] text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setVideoMode('explainer');
                    if ('speechSynthesis' in window) window.speechSynthesis?.cancel();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                    videoMode === 'explainer'
                      ? 'bg-[#FAF7F0] dark:bg-[#1E1D1A] text-[#682626] dark:text-[#C2A267] font-bold shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hoạt họa đồ họa tương tác (Interactive Canvas)</span>
                </button>

                <button
                  onClick={() => {
                    setVideoMode('youtube');
                    setIsPlaying(false);
                    if ('speechSynthesis' in window) window.speechSynthesis?.cancel();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                    videoMode === 'youtube'
                      ? 'bg-[#FAF7F0] dark:bg-[#1E1D1A] text-[#682626] dark:text-[#C2A267] font-bold shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5 text-rose-500" />
                  <span>Video bài giảng YouTube (Thực tế)</span>
                </button>
              </div>

              {videoMode === 'youtube' && (
                <button
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="flex items-center gap-1 text-[11px] text-[#682626] dark:text-[#C2A267] hover:underline px-2 py-0.5"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>Đổi link YouTube</span>
                </button>
              )}
            </div>

            {/* Custom YouTube URL input row */}
            {videoMode === 'youtube' && showUrlInput && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF7F0] dark:bg-[#23221F] border border-[#DFD7CA] dark:border-[#383530] text-xs">
                <input
                  type="text"
                  placeholder="Dán link YouTube bài giảng của trường (ví dụ: https://www.youtube.com/watch?v=...)"
                  value={customYoutubeUrl}
                  onChange={(e) => setCustomYoutubeUrl(e.target.value)}
                  className="flex-1 bg-transparent border-none text-stone-800 dark:text-stone-200 focus:outline-none text-xs"
                />
                <button
                  onClick={() => setShowUrlInput(false)}
                  className="px-2.5 py-1 rounded bg-[#682626] text-white font-medium text-[11px]"
                >
                  Áp dụng
                </button>
              </div>
            )}

            {/* Video Canvas Component or YouTube Embed */}
            {videoMode === 'explainer' ? (
              <InteractiveExplainerCanvas
                video={video}
                currentScene={currentScene}
                currentTime={currentTime}
                isPlaying={isPlaying}
                playbackRate={playbackRate}
                showSubtitles={showSubtitles}
                onJumpToTime={handleJumpToTime}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
              />
            ) : (
              <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-[#3E3A33] shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${getEmbedYoutubeId()}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Video Player Control Bar (Visible in Explainer mode) */}
            {videoMode === 'explainer' && (
              <div className="p-3 bg-[#F2ECE1] dark:bg-[#252420] rounded-xl border border-[#DFD7CA] dark:border-[#383530] space-y-2">
                {/* Scrubbing Bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400 w-11 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <div className="relative flex-1 flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={video.durationSeconds}
                      step={0.5}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#682626] dark:accent-[#C2A267]"
                    />
                  </div>
                  <span className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400 w-11">
                    {formatTime(video.durationSeconds)}
                  </span>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-stone-700 dark:text-stone-300 text-xs font-medium">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Play / Pause */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1.5 rounded-lg bg-[#682626] hover:bg-[#541E1E] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] text-[#FAF7F0] dark:text-[#1B1A18] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                      title={isPlaying ? 'Tạm dừng (Phím Cách)' : 'Phát tiếp (Phím Cách)'}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" />
                          <span>Tạm dừng</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>Phát</span>
                        </>
                      )}
                    </button>

                    {/* Replay 5s */}
                    <button
                      onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
                      className="p-1.5 rounded-lg hover:bg-[#DFD7CA] dark:hover:bg-[#383530] transition-colors"
                      title="Lùi 5 giây"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Forward 5s */}
                    <button
                      onClick={() => setCurrentTime(Math.min(video.durationSeconds, currentTime + 5))}
                      className="p-1.5 rounded-lg hover:bg-[#DFD7CA] dark:hover:bg-[#383530] transition-colors"
                      title="Tua 5 giây"
                    >
                      <FastForward className="w-4 h-4" />
                    </button>

                    {/* Volume Toggle & Slider */}
                    <div className="flex items-center gap-1 pl-1">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 rounded-lg hover:bg-[#DFD7CA] dark:hover:bg-[#383530] transition-colors"
                        title={isMuted ? 'Bật âm' : 'Tắt âm'}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-stone-500" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseFloat(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-14 sm:w-20 h-1.5 bg-stone-300 dark:bg-stone-700 rounded appearance-none cursor-pointer accent-[#682626] dark:accent-[#C2A267]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Web Speech API Voice Narration Toggle */}
                    <button
                      onClick={() => setEnableVoiceNarration(!enableVoiceNarration)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] transition-colors ${
                        enableVoiceNarration
                          ? 'border-[#8A6328] bg-[#8A6328]/15 text-[#682626] dark:text-[#C2A267] font-semibold'
                          : 'border-[#DFD7CA] dark:border-[#383530] text-stone-600 dark:text-stone-400'
                      }`}
                      title="Đọc thuyết minh tiếng Việt tự động"
                    >
                      {enableVoiceNarration ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5 text-stone-400" />}
                      <span className="hidden sm:inline">Giọng đọc AI</span>
                    </button>

                    {/* Subtitle Toggle */}
                    <button
                      onClick={() => setShowSubtitles(!showSubtitles)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] transition-colors ${
                        showSubtitles
                          ? 'border-[#8A6328] bg-[#8A6328]/15 text-[#682626] dark:text-[#C2A267] font-semibold'
                          : 'border-[#DFD7CA] dark:border-[#383530] text-stone-600 dark:text-stone-400'
                      }`}
                      title="Bật/Tắt phụ đề tiếng Việt"
                    >
                      <Subtitles className="w-3.5 h-3.5" />
                      <span>Phụ đề</span>
                    </button>

                    {/* Playback Speed selector */}
                    <select
                      value={playbackRate}
                      onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                      className="px-1.5 py-1 rounded-lg border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#1E1D1A] text-stone-800 dark:text-stone-200 text-xs font-mono font-medium focus:outline-none"
                      title="Tốc độ phát"
                    >
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1.0x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2.0x</option>
                    </select>

                    {/* Fullscreen Toggle */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg hover:bg-[#DFD7CA] dark:hover:bg-[#383530] transition-colors"
                      title="Toàn màn hình"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Tabs: Interactive Transcript vs Quick Quiz */}
            <div className="pt-2 flex-1 flex flex-col min-h-[220px]">
              <div className="flex items-center gap-2 border-b border-[#DFD7CA] dark:border-[#383530] pb-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'transcript'
                      ? 'bg-[#FAF7F0] dark:bg-[#252420] text-[#682626] dark:text-[#C2A267] border border-[#DFD7CA] dark:border-[#383530] font-bold'
                      : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Transcript văn bản ({video.transcript.length} mốc)</span>
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'quiz'
                      ? 'bg-[#FAF7F0] dark:bg-[#252420] text-[#682626] dark:text-[#C2A267] border border-[#DFD7CA] dark:border-[#383530] font-bold'
                      : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Kiểm tra nhanh ({video.quickQuiz.length} câu)</span>
                </button>
              </div>

              {/* Tab 1: Interactive Transcript */}
              {activeTab === 'transcript' && (
                <div className="mt-3 flex-1 overflow-y-auto space-y-2 max-h-56 pr-2">
                  <p className="text-[11px] text-stone-500 italic pb-1">
                    Nhấp vào bất kỳ đoạn nào để nhảy video tới thời điểm tương ứng:
                  </p>
                  {video.transcript.map(item => {
                    const isActive = currentTime >= item.time && (
                      video.transcript.findIndex(t => t.id === item.id) === video.transcript.length - 1 ||
                      currentTime < (video.transcript[video.transcript.findIndex(t => t.id === item.id) + 1]?.time || 999)
                    );

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleJumpToTime(item.time)}
                        className={`p-2.5 rounded-lg text-xs flex items-start gap-3 cursor-pointer transition-colors border ${
                          isActive
                            ? 'bg-[#EFE8DD] dark:bg-[#2C2A26] border-[#8A6328]/40 ring-1 ring-[#8A6328]/30 font-medium text-stone-900 dark:text-stone-100'
                            : 'bg-transparent border-transparent hover:bg-[#FAF7F0] dark:hover:bg-[#23221F] text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        <span className="font-mono text-[11px] font-bold text-[#8A6328] dark:text-[#C2A267] shrink-0 pt-0.5">
                          {item.formattedTime}
                        </span>
                        <p className="leading-relaxed flex-1">
                          {renderHighlightedText(item.text)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Quick Quiz after video */}
              {activeTab === 'quiz' && (
                <div className="mt-3 flex-1 overflow-y-auto space-y-4 max-h-56 pr-2 font-sans text-xs">
                  {video.quickQuiz.map((q, idx) => {
                    const isSubmitted = submittedQuiz[q.id];
                    const selectedIdx = selectedAnswers[q.id];
                    const isCorrect = selectedIdx === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className="p-3.5 rounded-xl border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#23221F] space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-stone-900 dark:text-stone-100">
                            Câu {idx + 1}: {q.question}
                          </span>
                          {isSubmitted && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 ${
                              isCorrect 
                                ? 'bg-[#EDF3EC] text-[#25462A] dark:bg-[#1E2820] dark:text-[#88B88E]' 
                                : 'bg-[#FBEAE9] text-[#7A2727] dark:bg-[#341C1C] dark:text-[#F87171]'
                            }`}>
                              {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                              {isCorrect ? 'Chính xác' : 'Chưa đúng'}
                            </span>
                          )}
                        </div>

                        {/* Options */}
                        <div className="space-y-1.5">
                          {q.options.map((opt, optIdx) => {
                            let optionClass = 'border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#1E1D1A] text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DD] dark:hover:bg-[#2C2A26]';
                            if (isSubmitted) {
                              if (optIdx === q.correctIndex) {
                                optionClass = 'border-[#2D5A34] bg-[#EDF3EC] dark:bg-[#1E2820] text-[#25462A] dark:text-[#88B88E] font-semibold';
                              } else if (optIdx === selectedIdx) {
                                optionClass = 'border-[#7A2727] bg-[#FBEAE9] dark:bg-[#341C1C] text-[#7A2727] dark:text-[#F87171]';
                              } else {
                                optionClass = 'border-[#DFD7CA] dark:border-[#383530] opacity-50';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectQuizOption(q.id, optIdx)}
                                className={`w-full text-left p-2 rounded-lg border text-xs transition-colors flex items-center justify-between ${optionClass}`}
                              >
                                <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Immediate Explanation and Review Video Suggestion */}
                        {isSubmitted && (
                          <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed border space-y-1.5 ${
                            isCorrect 
                              ? 'bg-[#EDF3EC] dark:bg-[#1E2820] border-[#C8DAC6] dark:border-[#2D3F30] text-[#25462A] dark:text-[#88B88E]'
                              : 'bg-[#FBEAE9] dark:bg-[#341C1C] border-[#F2C5C3] dark:border-[#522525] text-[#7A2727] dark:text-[#F87171]'
                          }`}>
                            <p><strong>Giải thích:</strong> {q.explanation}</p>
                            {!isCorrect && (
                              <button
                                onClick={() => handleJumpToTime(q.reviewTimestamp)}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#682626] hover:bg-[#541E1E] text-white text-[11px] font-medium transition-colors shadow-xs"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>{q.reviewLabel}</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Key takeaways, Highlighted terms, Formula comparison */}
          <div className="w-full lg:w-80 p-4 sm:p-5 bg-[#F8F5EE] dark:bg-[#201F1C] overflow-y-auto space-y-5 text-xs font-sans">
            {/* Box 1: Kiến thức cần nhớ */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#682626] dark:text-[#C2A267] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Kiến thức cần nhớ ({video.keyTakeaways.length} điểm)
              </span>
              <ul className="space-y-2 text-stone-700 dark:text-stone-300 text-xs leading-relaxed">
                {video.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A6328] dark:bg-[#C2A267] mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Sơ đồ hoặc Công thức liên quan */}
            <div className="p-3.5 rounded-xl border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#252420] space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-[11px] block">
                {video.formulaDiagram.title}
              </span>
              <div className="p-2 rounded bg-[#EFE8DD] dark:bg-[#1A1916] font-mono text-[11px] text-[#682626] dark:text-[#E2B765] whitespace-pre-wrap break-words border border-[#DFD7CA] dark:border-[#383530]">
                {video.formulaDiagram.code}
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed italic">
                {video.formulaDiagram.explanation}
              </p>
            </div>

            {/* Box 3: Thuật ngữ quan trọng được highlight */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 block">
                Thuật ngữ quan trọng
              </span>
              <div className="flex flex-wrap gap-1.5">
                {video.keyTerms.map((term, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-[#FAF7F0] dark:bg-[#2A2824] border border-[#DFD7CA] dark:border-[#383530] text-[11px] font-medium text-stone-800 dark:text-stone-200"
                  >
                    #{term}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 4: Danh sách video cùng chuyên đề */}
            {onSelectVideo && (
              <div className="pt-2 border-t border-[#DFD7CA] dark:border-[#383530] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                  <ListVideo className="w-3.5 h-3.5" />
                  Các video khác trong chương
                </span>
                <div className="space-y-1.5">
                  {KNOWLEDGE_VIDEOS.map(v => (
                    <button
                      key={v.id}
                      onClick={() => onSelectVideo(v.id)}
                      className={`w-full text-left p-2 rounded-lg border text-xs transition-colors flex items-center justify-between gap-2 ${
                        v.id === video.id
                          ? 'border-[#8A6328] bg-[#8A6328]/10 font-semibold text-[#682626] dark:text-[#C2A267]'
                          : 'border-transparent hover:border-[#DFD7CA] dark:hover:border-[#383530] hover:bg-[#FAF7F0] dark:hover:bg-[#252420] text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span className="truncate">{v.thumbnailEmoji} {v.title}</span>
                      <span className="text-[10px] font-mono text-stone-400 shrink-0">{v.formattedDuration}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
