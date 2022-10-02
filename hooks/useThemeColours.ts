import { useMantineTheme } from "@mantine/core";
import { useMemo } from "react";
import { getPrimaryShade } from "../styles/themes";

export const useThemeColours = () => {
  const theme = useMantineTheme();
  const { shade, offset, grayOffset } = useMemo(() => getPrimaryShade(theme), [theme]);
  const isDarkMode = useMemo(() => theme.colorScheme === "dark", [theme.colorScheme]);

  return {
    incorrect: theme.colors[theme.other.errorColor][shade],
    incorrectFaded: theme.colors[theme.other.errorColor][shade + offset],
    highlight: theme.colors[theme.primaryColor][shade],
    gray: theme.colors.gray[shade + grayOffset],
    background: isDarkMode ? theme.colors.dark[7] : theme.white,
    foreground: isDarkMode ? theme.white : theme.black,
    backgroundGray: isDarkMode ? theme.colors.dark[6] : theme.colors.gray[0],
  };
};
