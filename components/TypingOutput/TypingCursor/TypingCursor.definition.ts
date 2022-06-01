import { OffsetType } from "../../../hooks/useOffset";

export interface TypingCursorProps {
  offset: OffsetType;
  correct: boolean;
  animate: boolean;
  isLast: boolean;
}
