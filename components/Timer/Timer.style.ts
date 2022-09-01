import { createStyles } from "@mantine/core";
import { getPrimaryShade } from "../../styles/themes";

export const useStyles = createStyles((theme) => {
  const { shade, grayOffset } = getPrimaryShade(theme);
  return {
    timerWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    timer: {
      flexGrow: 1,
    },
    timerText: {
      fontWeight: "bold",
      color: theme.colors.gray[shade + grayOffset],
    },
  };
});
