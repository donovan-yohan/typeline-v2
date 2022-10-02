import { OffsetType } from "../../../hooks/useOffset";
import { KeypressType } from "../../../interfaces/typeline";

export interface TypingOutputHistoryProps {
  expected: string[];
  keypresses: KeypressType[][];
  finished?: boolean;
}

export interface LetterOffsetTuple {
  offset: OffsetType;
  isLast: boolean;
}
