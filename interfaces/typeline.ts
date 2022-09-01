export interface KeypressType {
  key: string;
  timestamp: number;
}

export interface StatType {
  correct: number;
  incorrect: number;
  corrected: number;
  incorrectWords: string[];
}

export interface ChartStatType {
  wpm: number;
  raw: number;
  correctInInterval: number;
  incorrectInInterval: number;
  correctedInInterval: number;
  correctToTime: number;
  incorrectToTime: number;
  correctedToTime: number;
  incorrectWords: string[];
}
