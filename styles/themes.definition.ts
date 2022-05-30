import { MantineColor } from "@mantine/core";

declare module "@mantine/core" {
  export interface MantineThemeOther {
    errorColor: MantineColor;
    highlightAnimation: string;
  }

  export type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export interface TypelineTheme {}
