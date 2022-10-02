import { createStyles } from "@mantine/core";
import { useThemeColours } from "../../../hooks/useThemeColours";
import { GlobalStyleConfig } from "../../../styles/globals.style";

export const useFooterStyles = createStyles(() => {
  const { background, gray, highlight } = useThemeColours();

  return {
    footer: {
      position: "fixed",
      width: "100%",
      backgroundColor: background,
      zIndex: 1,
      bottom: 0,
    },
    footerContent: {
      padding: "16px 0 24px",
      display: "flex",
      justifyContent: "space-between",
      color: gray,
      a: {
        textDecoration: "none",
        fontWeight: "bold",
        color: gray,
        "&:hover": {
          color: highlight,
        },
        transition: GlobalStyleConfig.Transition.Default,
      },
    },
  };
});
