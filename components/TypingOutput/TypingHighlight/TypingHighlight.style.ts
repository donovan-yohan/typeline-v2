import { createStyles } from "@mantine/core";
import { getPrimaryShade } from "../../../styles/themes";
import { TypingHighlightProps } from "./TypingHighlight.definition";

export const useTypingHighlightStyles = createStyles(
  (theme, { offset, correct }: Partial<TypingHighlightProps>) => {
    const { shade, offset: shadeOffset } = getPrimaryShade(theme);
    return {
      highlight: {
        position: "absolute",
        backgroundColor: correct
          ? theme.colors[theme.primaryColor][shade + shadeOffset]
          : theme.colors[theme.other.errorColor][shade + shadeOffset],
        top: offset?.top || 0,
        left: offset?.left || 0,
        width: offset?.width || 0,
        height: offset?.height || 0,
        borderRadius: 4,
        transition: theme.other.highlightAnimation,
        opacity: 0.5
      }
    };
  }
);
