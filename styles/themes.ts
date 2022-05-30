import { MantineTheme, DEFAULT_THEME, Shade } from "@mantine/core";
import { MantinePrimaryShade } from "@mantine/styles/lib/theme/types/MantineTheme";

// Template for extending the theme colors and adding typescript support

// type ExtendedCustomColors = "main" | DefaultMantineColor;

// declare module "@mantine/core" {
//   export interface MantineThemeColorsOverride {
//     colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
//   }
// }

export const LightBase: MantineTheme = {
  ...DEFAULT_THEME,
  white: "#fff",
  black: "#000",
  colors: {
    ...DEFAULT_THEME.colors,
    main: [
      "#ddf2ff",
      "#aed6ff",
      "#7dbbff",
      "#4aa0ff",
      "#1a85ff",
      "#006be6",
      "#0053b4",
      "#003b82",
      "#002451",
      "#000d21"
    ]
  }
};

interface ShadeObject {
  shade: Shade;
  offset: number;
  grayOffset: number;
}

const secondaryColourOffset = 4;
const grayColourOffset = 2;

export const getPrimaryShade = (theme: MantineTheme): ShadeObject => {
  const offset =
    theme.colorScheme === "light" ? -secondaryColourOffset : secondaryColourOffset;

  const grayOffset =
    theme.colorScheme === "light" ? -grayColourOffset : grayColourOffset - 1;
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
