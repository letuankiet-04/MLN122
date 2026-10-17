export type VideoSceneType = 'concept' | 'animation' | 'example' | 'summary' | 'quiz';

export interface VideoScene {
  id: string;
  sceneNumber: number;
  title: string;
  type: VideoSceneType;
  startTime: number; // seconds
  endTime: number; // seconds
  narration: string;
  visualStage: string;
  visualDetails?: {
    caption?: string;
    badges?: string[];
    dataPoints?: { label: string; value: string; color?: string }[];
  };
  highlightKeywords?: string[];
}

export interface VideoTranscriptItem {
  id: string;
  time: number;
  formattedTime: string;
  text: string;
}

export interface VideoQuickQuiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reviewTimestamp: number;
  reviewLabel: string;
}

export interface KnowledgeVideo {
  id: string;
  title: string;
  subtitle: string;
  sectionId: string;
  sectionNumber: string;
  durationSeconds: number;
  formattedDuration: string;
  badgeText: string;
  difficulty: 'Cơ bản' | 'Trọng tâm' | 'Nâng cao';
  thumbnailEmoji: string;
  keyTakeaways: string[];
  keyTerms: string[];
  formulaDiagram: {
    title: string;
    code: string;
    explanation: string;
    comparison?: {
      leftTitle: string;
      leftContent: string;
      rightTitle: string;
      rightContent: string;
    };
  };
  youtubeId?: string; // YouTube embed ID for real lecture video
  customVideoUrl?: string; // Optional MP4 or WebM link
  scenes: VideoScene[];
  transcript: VideoTranscriptItem[];
  quickQuiz: VideoQuickQuiz[];
}
