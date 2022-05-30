import { createStyles } from "@mantine/core";
import { getPrimaryShade } from "../../../styles/themes";
import { LetterProps } from "./Letter.definition";

export const useLetterStyles = createStyles((theme, { actual }: Partial<LetterProps>) => {
  const { shade, offset, grayOffset } = getPrimaryShade(theme);
  return {
    letter: {
      position: "relative",
      fontSize: "32px",
      lineHeight: "1.5"
    },
    correct: {},
    incorrect: {
      color: theme.colors[theme.other.errorColor][shade],
      ["&:after"]: {
        content: `"${actual}"`,
        color: theme.colors[theme.other.errorColor][shade],
        position: "absolute",
        width: "100%",
        textAlign: "center",
        top: "70%",
        left: 0,
        fontSize: "0.66em"
      }
    },
    perfect: {
      color: theme.colors[theme.primaryColor][shade]
    },
    untyped: {
      color: theme.colors.gray[shade + grayOffset]
    },
    overflow: {
      color: theme.colors[theme.other.errorColor][shade + offset],
      textDecoration: "line-through"
    },
    incorrectUntyped: {
      color: theme.colors[theme.other.errorColor][shade + offset],
      textDecoration: "underline"
    }
  };
});
