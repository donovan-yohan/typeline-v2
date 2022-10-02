import { createStyles } from "@mantine/core";
import { useThemeColours } from "../../../hooks/useThemeColours";

export const useStyles = createStyles(() => {
  const { background } = useThemeColours();

  return {
    header: {
      position: "fixed",
      width: "100%",
      backgroundColor: background,
      zIndex: 1,
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };
});
