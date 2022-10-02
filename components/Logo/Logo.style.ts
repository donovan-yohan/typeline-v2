import { createStyles } from "@mantine/core";
import { useThemeColours } from "../../hooks/useThemeColours";
import { LogoStyleProps } from "./Logo.definition";

export const useLogoStyles = createStyles((_, { hovered }: LogoStyleProps) => {
  const { highlight, gray } = useThemeColours();
  return {
    logo: {
      height: "100%",
      padding: "24px 0 16px",
    },
    logoSvg: {
      fill: hovered ? highlight : gray,
      transition: "fill 0.3s ease-in-out",
    },
  };
});
