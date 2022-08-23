import { OffsetType } from "../../../hooks/useOffset";

export interface TypingOutputHistoryProps {
  expected: string[];
  actual: string[];
  finished?: boolean;
}

export interface LetterOffsetTuple {
  offset: OffsetType;
  isLast: boolean;
}
