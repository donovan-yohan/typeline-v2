import { createStyles } from "@mantine/core";

export const useResultsChartStyles = createStyles(() => ({
  container: {
    position: "relative",
    height: "500px",
    width: "100%",
    flex: "1 1 auto",
    canvas: {
      width: "100% !important",
    },
  },
}));
