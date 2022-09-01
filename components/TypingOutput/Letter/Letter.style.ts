import { createStyles } from "@mantine/core";
import { useThemeColours } from "../../../hooks/useThemeColours";
import { springWiggle, wordBounce } from "../../../styles/animations.style";
import { rem } from "../../../utils/styles/css.utils";
import { LetterProps } from "./Letter.definition";

export const useLetterStyles = createStyles((theme, { actual }: Partial<LetterProps>) => {
  const { gray, incorrect, incorrectFaded, highlight } = useThemeColours();
  return {
    letter: {
      position: "relative",
      display: "inline-block",
      fontSize: rem(theme.other.typingConfig.fontSize),
      lineHeight: theme.other.typingConfig.lineHeight,
      letterSpacing: "0.02em",
      transition: "color 0.2s ease",
      ["&:after"]: {
        content: `"${actual}"`,
        color: gray,
        position: "absolute",
        width: "100%",
        textAlign: "center",
        left: 0,
        top: "50%",
        fontSize: "0.66em",
        opacity: 0,
        transition: "0.3s cubic-bezier(0.27, 0.38, 0.14, 0.99)",
      },
    },
    correct: {},
    incorrect: {
      color: incorrect,
      animation: `${springWiggle} 0.2s cubic-bezier(0, 0.95, 0.25, 1)`,
      ["&:after"]: {
        content: `"${actual}"`,
        top: "75%",
        opacity: 1,
      },
    },
    perfect: {
      color: highlight,
      animation: `0.25s cubic-bezier(0, 0.5, 0.5, 1) alternate 2 ${wordBounce}`,
    },
    untyped: {
      color: gray,
    },
    overflow: {
      color: incorrect,
      textDecoration: "line-through",
      animation: `${springWiggle} 0.2s cubic-bezier(0, 0.95, 0.25, 1)`,
    },
    incorrectUntyped: {
      color: incorrectFaded,
      textDecoration: "underline",
    },
  };
});
