import { Header, Footer } from "@mantine/core";
import { PageWrapperProps } from "./PageWrapper.definition";
import { useStyles } from "./PageWrapper.style";

export function PageWrapper(props: PageWrapperProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <Header height={"64px"}>typeline</Header>
      <div className={classes.contentWrapper}>{props.children}</div>
      <Footer height={"64px"}>Copyright</Footer>
    </div>
  );
}
