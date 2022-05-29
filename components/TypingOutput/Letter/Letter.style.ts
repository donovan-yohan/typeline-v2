import { createStyles } from "@mantine/core";
import { getPrimaryShade } from "../../../styles/themes";
import { LetterProps } from "./Letter.definition";

export const useLetterStyles = createStyles((theme, { actual }: Partial<LetterProps>) => {
  const { shade, offset } = getPrimaryShade(theme);
  return {
    correct: {},
    incorrect: {
      color: theme.colors[theme.other.errorColor][shade]
    },
    perfect: {
      color: theme.colors[theme.primaryColor][shade]
    },
    untyped: {
      color: theme.colors.gray[shade]
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
