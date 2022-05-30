import { createStyles } from "@mantine/core";
import { blink } from "../../../styles/animations.style";
import { getPrimaryShade } from "../../../styles/themes";
import { TypingCursorProps } from "./TypingCursor.definition";

export const useTypingCursorStyles = createStyles(
  (theme, { offset, correct, animate, isLast }: Partial<TypingCursorProps>) => {
    const { shade } = getPrimaryShade(theme);
    return {
      cursor: {
        position: "absolute",
        backgroundColor: correct
          ? theme.colors[theme.primaryColor][shade]
          : theme.colors[theme.other.errorColor][shade],
        top: offset?.top || 0,
        left: isLast ? offset?.right || 0 : offset?.left || 0,
        width: "0.1em",
        height: offset?.height || 0,
        transition: theme.other.highlightAnimation,
        animation: animate ? `1.05s cubic-bezier(0.9, 0, 0, 0.9) infinite ${blink}` : ""
      }
    };
  }
);
