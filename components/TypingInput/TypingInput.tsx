import { SyntheticEvent, useState } from "react";
import { TypingInputProps } from "./TypingInput.definition";

export const TypingInput = (props: TypingInputProps) => {
  const [inputString, setInputString] = useState("");
  //   const [keys, setKeys] = useAtom(keypressAtom);

  const onSelect = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    input.selectionStart = input.selectionEnd;
  };

  const handleInputChange = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    const len = input.value.length;
    const value = input.value.charAt(len - 1);

    if (inputString.length > len) {
      setInputString(input.value);
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
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key.length > 1 && e.key != "Backspace") e.preventDefault();
    // else setKeys((keys) => [...keys, { key: e.key, timestamp: Date.now() }]);
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
