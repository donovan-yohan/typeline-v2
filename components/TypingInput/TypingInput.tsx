import { useAtom } from "jotai";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { inputRefAtom } from "../../atoms/state.atom";
import { BACKSPACE_CHAR } from "../../utils/utils";
import { TypingInputProps } from "./TypingInput.definition";

export const TypingInput = (props: TypingInputProps) => {
  const { disabled, onType } = props;
  const [inputString, setInputString] = useState("");
  const [startTime, setStartTime] = useState<number | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setInputRef] = useAtom(inputRefAtom);

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

  // autofocus on load
  useEffect(() => {
    if (inputRef) {
      setInputRef(inputRef);
      inputRef?.current?.focus();
    }
  }, [inputRef]);

  return (
    <input
      style={{ height: 0, border: 0, padding: 0, margin: 0 }}
      ref={inputRef}
      value={inputString}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      onSelect={onSelect}
      onMouseDown={onMouseDown}
    />
  );
};
