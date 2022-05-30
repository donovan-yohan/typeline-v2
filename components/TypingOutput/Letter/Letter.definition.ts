export interface LetterProps {
  expected: string;
  actual: string;
  typed: boolean;
  active: boolean;
  isLast: boolean;
  wordPassed: boolean;
  wordActive: boolean;
  wordPerfect?: boolean;
  wordOverflow?: boolean;
  letterClassnames?: LetterClasses;
  parentRef: React.RefObject<HTMLDivElement>;
}

interface LetterClasses {
  correct: string;
  incorrect: string;
  perfect: string;
  untyped: string;
  overflow: string;
  incorrectUntyped: string;
}
