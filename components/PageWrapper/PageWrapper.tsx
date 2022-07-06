import { Header, Footer, Paper } from "@mantine/core";
import { PageWrapperProps } from "./PageWrapper.definition";
import { useStyles } from "./PageWrapper.style";

export function PageWrapper(props: PageWrapperProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <Header height={"64px"}>typeline</Header>
      <Paper className={classes.contentWrapper}>{props.children}</Paper>
      <Footer height={"64px"}>Copyright</Footer>
    </div>
  );
}
