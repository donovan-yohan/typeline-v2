import { KeypressType } from "../../interfaces/typeline";

export interface TypingInputProps {
  disabled: boolean;
  onType?: (value: KeypressType) => void;
}
