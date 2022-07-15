import { SyntheticEvent, useState } from "react";
import { BACKSPACE_CHAR } from "../../utils/utils";
import { TypingInputProps } from "./TypingInput.definition";

export const TypingInput = (props: TypingInputProps) => {
  const { disabled, onType } = props;
  const [inputString, setInputString] = useState("");
  const [startTime, setStartTime] = useState<number | undefined>();

  const onSelect = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    input.selectionStart = input.selectionEnd;
  };

  const handleInputChange = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    const len = input.value.length;
    const value = input.value.charAt(len - 1);

    const timestamp = startTime ? Date.now() - startTime : 0;

    if (startTime === undefined) {
      setStartTime(Date.now());
    }

    if (inputString.length > len) {
      setInputString(input.value);
      onType?.({ key: BACKSPACE_CHAR, timestamp });
    } else {
      if (len === 1) {
        // Handle first button press
        if (value === " ") return;
      } else if (len > 1 && value === " ") {
        // Reject multiple spaces (and deal with MacOS auto punctuate)
        if (inputString[len - 2] === " ") return;

        // Handle space
      }
      setInputString((inputString) => inputString + value);
      onType?.({ key: value, timestamp });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.key.length > 1 && e.key != "Backspace") || disabled) e.preventDefault();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    input.focus();
  };
  return (
    <input
      value={inputString}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      onSelect={onSelect}
      onMouseDown={onMouseDown}
    />
  );
};
