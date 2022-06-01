import { MantineColor } from "@mantine/core";

declare module "@mantine/core" {
  export interface MantineThemeOther {
    errorColor: MantineColor;
    highlightAnimation: string;
    /**
     * values are multiples of rem
     */
    typingConfig: TypingConfig;
  }

  export type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export interface TypelineTheme {}

export interface TypingConfig {
  fontSize: number;
  lineHeight: number;
  lineSpacing: number;
  linesVisible: number;
}
