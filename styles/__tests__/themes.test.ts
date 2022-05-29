import { MantineTheme } from "@mantine/core";
import { getPrimaryShade } from "../themes";
import { MantinePrimaryShade } from "@mantine/styles/lib/theme/types/MantineTheme";

describe("themes.ts", () => {
  test("getPrimaryShade should return a shade if primaryShade is just a shade", () => {
    const mockTheme = {
      primaryShade: 5,
      colorScheme: "light"
    } as MantineTheme;

    expect(getPrimaryShade(mockTheme).shade).toBe(5);
  });

  test("getPrimaryShade should return a shade if primaryShade has multiple", () => {
    const mockTheme = {
      primaryShade: { light: 5, dark: 8 } as MantinePrimaryShade,
      colorScheme: "light"
    } as MantineTheme;

    expect(getPrimaryShade(mockTheme).shade).toBe(5);
  });
});
