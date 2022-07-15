import { OffsetType } from "../../hooks/useOffset";

export interface TypingOutputProps {
  expected: string[];
  actual: string[];
  finished?: boolean;
}

export interface LetterOffsetTuple {
  offset: OffsetType;
  isLast: boolean;
}
