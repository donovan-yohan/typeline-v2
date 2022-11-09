import { createStyles } from "@mantine/core";
import { useThemeColours } from "../../hooks/useThemeColours";
import { getPrimaryShade } from "../../styles/themes";

export const useStyles = createStyles((theme) => {
  const { shade, grayOffset } = getPrimaryShade(theme);
  const { foreground } = useThemeColours();
  return {
    timerWrapper: {
      display: "flex",
      alignItems: "center",
    },
    timer: {
      flexGrow: 1,
      ".mantine-Slider-track": {
        height: "2px",
      },
      ".mantine-Slider-track::before": {
        right: 0,
      },
      ".mantine-Slider-thumb": {
        display: "none",
      },
      ".mantine-Slider-bar": {
        transition: "all 1s linear",
        backgroundColor: foreground,
      },
    },
    timerText: {
      fontWeight: "bold",
      color: theme.colors.gray[shade + grayOffset],
    },
  };
});
