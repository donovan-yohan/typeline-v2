import { createStyles } from "@mantine/core";
import { useThemeColours } from "../hooks/useThemeColours";

export const useGlobalStyles = createStyles(() => {
  const { foreground, gray, incorrect, highlight } = useThemeColours();
  return {
    tooltipIcon: {
      fontSize: "0.75em",
      fontWeight: "bold",
      height: "100%",
      border: "2px solid",
      borderRadius: "50%",
      letterSpacing: "0.45em",
      paddingLeft: "0.45em",
      marginLeft: "0.5em",
      marginRight: "-0.1em",
      transition: "0.25s ease-in-out",
      cursor: "default",
      userSelect: "none",
      color: gray,
      "&:hover": {
        color: foreground,
      },
    },
    tooltipBody: {
      width: "100%",
      fontSize: "14px !important",
      fontWeight: "normal",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      div: {
        whiteSpace: "normal",
        lineHeight: 1.5,
      },
    },
    label: {
      fontSize: "20px",
      fontWeight: "bold",
      textTransform: "lowercase",
      lineHeight: 1,
    },
    number: {
      fontFamily: "Comfortaa",
    },
    highlight: {
      color: highlight,
    },
    incorrect: {
      color: incorrect,
    },
    gray: {
      color: gray,
    },
  };
});
