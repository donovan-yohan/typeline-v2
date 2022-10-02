import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  resultsChartWrapper: {
    maxWidth: "960px",
    minWidth: "65vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  displayStats: {
    gap: "24px",
  },
  largeScore: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "-16px",
  },
  largeScoreNumber: {
    fontSize: "115px",
    letterSpacing: "-0.03em",
    lineHeight: 1,
    marginleft: "-6px",
    marginTop: "8px",
  },
  smallScore: {
    display: "flex",
    flexDirection: "column",
    fontSize: "30px",
  },
  smallScoreNumber: {
    fontWeight: "bold",
  },
  scoreLabel: {
    zIndex: 1,
    whiteSpace: "nowrap",
  },
}));
