export interface LetterProps {
  expected: string;
  actual: string;
  active: boolean;
  wordPassed: boolean;
  wordPerfect?: boolean;
  letterStyle?: LetterStyle;
}

interface LetterStyle {
  correct: string;
  incorrect: string;
  perfect: string;
  untyped: string;
  overflow: string;
  incorrectUntyped: string;
}
