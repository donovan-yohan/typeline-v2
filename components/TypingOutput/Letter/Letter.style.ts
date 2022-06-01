import { css } from "@emotion/css";
import { createStyles } from "@mantine/core";
import { springWiggle, wordBounce } from "../../../styles/animations.style";
import { getPrimaryShade } from "../../../styles/themes";
import { rem } from "../../../utils/styles/css.utils";
import { LetterProps } from "./Letter.definition";

export const useLetterStyles = createStyles((theme, { actual }: Partial<LetterProps>) => {
  const { shade, offset, grayOffset } = getPrimaryShade(theme);
  return {
    letter: {
      position: "relative",
      display: "inline-block",
      fontSize: rem(theme.other.typingConfig.fontSize),
      lineHeight: theme.other.typingConfig.lineHeight,
      letterSpacing: "0.02em",
      transition: "color 0.2s ease",
      ["&:after"]: {
        content: `"←"`,
        color: theme.colors.gray[shade + grayOffset],
        position: "absolute",
        width: "100%",
        textAlign: "center",
        left: 0,
        top: "50%",
        fontSize: "0.66em",
        opacity: 0,
        transition: "0.3s cubic-bezier(0.27, 0.38, 0.14, 0.99)"
      }
    },
    correct: {},
    incorrect: {
      color: theme.colors[theme.other.errorColor][shade],
      animation: `${springWiggle} 0.2s cubic-bezier(0, 0.95, 0.25, 1)`,
      ["&:after"]: {
        content: `"${actual}"`,
        top: "75%",
        opacity: 1
      }
    },
    perfect: {
      color: theme.colors[theme.primaryColor][shade],
      animation: `0.25s cubic-bezier(0, 0.5, 0.5, 1) alternate 2 ${wordBounce}`
    },
    untyped: {
      color: theme.colors.gray[shade + grayOffset]
    },
    overflow: {
      color: theme.colors[theme.other.errorColor][shade + offset],
      textDecoration: "line-through",
      animation: `${springWiggle} 0.2s cubic-bezier(0, 0.95, 0.25, 1)`
    },
    incorrectUntyped: {
      color: theme.colors[theme.other.errorColor][shade + offset],
      textDecoration: "underline"
    }
  };
});
