import { KeypressType } from "../../interfaces/typeline";

export interface TypingInputProps {
  onType?: (value: KeypressType) => void;
}
