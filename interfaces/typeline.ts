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
