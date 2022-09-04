import { createStyles } from "@mantine/core";

export const useResultsWrapperStyles = createStyles(() => {
  return {
    resultsWrapper: {
      maxWidth: "960px",
      minWidth: "65vw",
      display: "flex",
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
    spacer: {
      pointerEvents: "none",
      userSelect: "none",
      opacity: 0,
    },
  };
});
