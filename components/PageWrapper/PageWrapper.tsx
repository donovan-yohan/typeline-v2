import { Header, Footer, Paper, Group } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { PageWrapperProps } from "./PageWrapper.definition";
import { useStyles } from "./PageWrapper.style";

export function PageWrapper(props: PageWrapperProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <Header height={"64px"}>
        <Group>
          typeline <ColorSchemeToggle />
        </Group>
      </Header>
      <Paper className={classes.contentWrapper}>{props.children}</Paper>
      <Footer height={"64px"}>Copyright</Footer>
    </div>
  );
}
