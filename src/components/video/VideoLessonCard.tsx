import React from 'react';
import { Play, Clock, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { KnowledgeVideo } from '../../types/video';

interface VideoLessonCardProps {
  primaryVideo: KnowledgeVideo;
  allVideosForSection?: KnowledgeVideo[];
  onPlayVideo: (video: KnowledgeVideo) => void;
}

export const VideoLessonCard: React.FC<VideoLessonCardProps> = ({
  primaryVideo,
  allVideosForSection = [],
  onPlayVideo,
}) => {
  return (
    <div className="my-6 p-4 sm:p-5 rounded-xl border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#23221F] shadow-xs transition-all hover:border-[#8A6328]/40 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Thumbnail & Main Info */}
        <div className="flex items-start gap-4">
          {/* Thumbnail Box with Play Badge */}
          <div 
            onClick={() => onPlayVideo(primaryVideo)}
            className="group relative w-20 sm:w-28 h-20 sm:h-24 rounded-lg bg-gradient-to-br from-[#2D2A26] to-[#1A1916] border border-[#3E3A33] overflow-hidden flex flex-col items-center justify-center shrink-0 cursor-pointer shadow-sm"
          >
            <div className="text-2xl sm:text-3xl transition-transform group-hover:scale-110">
              {primaryVideo.thumbnailEmoji}
            </div>
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#682626] group-hover:bg-[#541E1E] dark:bg-[#C2A267] dark:group-hover:bg-[#AF8E53] text-white dark:text-stone-900 flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-stone-200">
              {primaryVideo.formattedDuration}
            </div>
          </div>

          {/* Video Title and Metadata */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#8A6328]/15 text-[#682626] dark:text-[#C2A267] border border-[#8A6328]/30">
                {primaryVideo.badgeText}
              </span>
              <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {primaryVideo.formattedDuration}
              </span>
            </div>

            <h3 
              onClick={() => onPlayVideo(primaryVideo)}
              className="text-sm sm:text-base font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-[#682626] dark:hover:text-[#C2A267] cursor-pointer transition-colors leading-snug"
            >
              {primaryVideo.title}
            </h3>

            <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
              {primaryVideo.subtitle}
            </p>

            {/* Key Tags */}
            <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
              {primaryVideo.keyTerms.slice(0, 3).map((term, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-[#EFE8DD] dark:bg-[#2C2A26] text-[10px] text-stone-600 dark:text-stone-400"
                >
                  #{term}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Primary Call to Action */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#DFD7CA] dark:border-[#383530]">
          <button
            onClick={() => onPlayVideo(primaryVideo)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#682626] hover:bg-[#541E1E] dark:bg-[#C2A267] dark:hover:bg-[#AF8E53] text-[#FAF7F0] dark:text-[#1B1A18] text-xs font-semibold shadow-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Xem video ngay</span>
          </button>
        </div>
      </div>

      {/* If section has multiple knowledge videos (e.g., 3.1.1), render secondary list */}
      {allVideosForSection.length > 1 && (
        <div className="mt-3.5 pt-3 border-t border-[#DFD7CA]/70 dark:border-[#383530]/70">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#8A6328] dark:text-[#C2A267]" />
              Các video kiến thức trọng tâm khác của mục này ({allVideosForSection.length - 1} video):
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {allVideosForSection
              .filter(v => v.id !== primaryVideo.id)
              .map(v => (
                <button
                  key={v.id}
                  onClick={() => onPlayVideo(v)}
                  className="p-2 rounded-lg border border-[#DFD7CA] dark:border-[#383530] bg-[#FAF7F0] dark:bg-[#1E1D1A] hover:bg-[#EFE8DD] dark:hover:bg-[#2A2824] text-left transition-colors flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-mono text-stone-400 block">{v.formattedDuration}</span>
                    <span className="text-xs font-medium text-stone-800 dark:text-stone-200 truncate block group-hover:text-[#682626] dark:group-hover:text-[#C2A267]">
                      {v.thumbnailEmoji} {v.title}
                    </span>
                  </div>
                  <Play className="w-3 h-3 text-stone-400 group-hover:text-[#682626] dark:group-hover:text-[#C2A267] shrink-0" />
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
