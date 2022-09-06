import { MantineTheme, DEFAULT_THEME, Shade } from "@mantine/core";
import { MantinePrimaryShade } from "@mantine/styles/lib/theme/types/MantineTheme";

// Template for extending the theme colors and adding typescript support

// type ExtendedCustomColors = "main" | DefaultMantineColor;

// declare module "@mantine/core" {
//   export interface MantineThemeColorsOverride {
//     colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
//   }
// }

export const DefaultTheme: MantineTheme = {
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    dark: [
      "#ffffff",
      "#bfbfbf",
      "#a6a6a6",
      "#8c8c8c",
      "#737373",
      "#404040",
      "#262626",
      "#111111",
      "#0d0d0d",
      "#0d0d0d"
    ],
    cyan: [
      "#d8ffff",
      "#acf6ff",
      "#7defff",
      "#4de9ff",
      "#27e2fe",
      "#17c9e5",
      "#009cb3",
      "#007081",
      "#00444f",
      "#00181e"
    ],
    red: [
      "#ffe4e4",
      "#fcb8b8",
      "#f48b8b",
      "#ee5d5d",
      "#e83030",
      "#cf1717",
      "#a21011",
      "#74090b",
      "#480405",
      "#1f0000"
    ]
  },
  fontFamily: "Nunito",
  headings: { ...DEFAULT_THEME.headings, fontFamily: "Nunito" },
  primaryColor: "cyan",
  primaryShade: { light: 5, dark: 4 },
  other: {
    errorColor: "red",
    highlightAnimation: "all 0.25s cubic-bezier(0.33, 0, 0, 1)",
    typingConfig: {
      fontSize: 2.5,
      lineHeight: 1.5,
      lineSpacing: 2,
      linesVisible: 3
    }
  }
};

interface ShadeObject {
  shade: Shade;
  offset: number;
  grayOffset: number;
}

const secondaryColourOffset = 3;
const grayColourOffset = 1;
const grayColourOffsetDark = 2;

export const getPrimaryShade = (theme: MantineTheme): ShadeObject => {
  const offset =
    theme.colorScheme === "light" ? -secondaryColourOffset : secondaryColourOffset;

  const grayOffset =
    theme.colorScheme === "light" ? -grayColourOffset : grayColourOffsetDark;
  if ((theme.primaryShade as MantinePrimaryShade).light == undefined) {
    return { shade: theme.primaryShade as Shade, offset, grayOffset };
  } else {
    return theme.colorScheme === "light"
      ? {
          shade: (theme.primaryShade as MantinePrimaryShade).light as Shade,
          offset,
          grayOffset
        }
      : {
          shade: (theme.primaryShade as MantinePrimaryShade).dark as Shade,
          offset,
          grayOffset
        };
  }
};
