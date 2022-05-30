import { OffsetType } from "../../hooks/useOffset";

export interface TypingOutputProps {
  expected: string;
  actual: string;
}

export interface LetterOffsetTuple {
  offset: OffsetType;
  isLast: boolean;
}
