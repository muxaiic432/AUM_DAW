export interface Track {
  id: string;
  name: string;
  type: 'audio' | 'midi' | 'instrument';
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
  effects: Effect[];
  clips: Clip[];
  instrument?: Instrument;
}

export interface Clip {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  notes?: Note[];
  audioBuffer?: AudioBuffer;
}

export interface Note {
  pitch: number;
  velocity: number;
  startTime: number;
  duration: number;
}

export interface Effect {
  id: string;
  name: string;
  type: string;
  parameters: Record<string, number>;
  enabled: boolean;
}

export interface Instrument {
  id: string;
  name: string;
  type: string;
  parameters: Record<string, number>;
}

export interface ProjectData {
  id: string;
  name: string;
  bpm: number;
  key: string;
  timeSignature: string;
  tracks: Track[];
  effects: Effect[];
  mixerSettings: {
    masterVolume: number;
    masterPan: number;
  };
}

export interface UserProfile {
  id: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  preferences: {
    genres: string[];
    assistanceLevel: 'minimal' | 'moderate' | 'comprehensive';
    learningGoals: string[];
  };
  progress: {
    theoryKnowledge: number;
    mixingSkills: number;
    completedLessons: string[];
  };
  history: {
    commonTechniques: string[];
    favoritePlugins: string[];
    recentProjects: string[];
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  context?: {
    analysisType?: string;
    suggestions?: string[];
    examples?: string[];
  };
}

export interface AnalysisResult {
  key: string;
  chordProgression: string[];
  genre: string;
  suggestions: {
    harmony: string[];
    arrangement: string[];
    mixing: string[];
    structure: string[];
  };
  theoryLessons: {
    title: string;
    content: string;
    difficulty: string;
  }[];
}