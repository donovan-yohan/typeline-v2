import { Container, Transition } from "@mantine/core";
import { useAtom } from "jotai";
import { isRunningAtom } from "../../../atoms/state.atom";
import { ColorSchemeToggle } from "../../ColorSchemeToggle/ColorSchemeToggle";
import Logo from "../../Logo/Logo";
import { useStyles } from "./PageHeader.style";

export function PageHeader() {
  const { classes } = useStyles();

  const [isRunning] = useAtom(isRunningAtom);

  return (
    <Transition transition={"fade"} mounted={!isRunning} duration={200}>
      {(styles) => (
        <div className={classes.header} style={styles}>
          <Container className={classes.headerContent}>
            <Logo />
            <ColorSchemeToggle />
          </Container>
        </div>
      )}
    </Transition>
  );
}
