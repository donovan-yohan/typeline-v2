import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
}));
