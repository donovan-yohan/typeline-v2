import { Container } from "@mantine/core";
import { useAtom } from "jotai";
import { isRunningAtom } from "../../../atoms/state.atom";
import { useFooterStyles } from "./PageFooter.style";

export function PageFooter() {
  const { classes } = useFooterStyles();

  const [isRunning] = useAtom(isRunningAtom);

  return (
    <div className={classes.footer} style={{ opacity: isRunning ? 0 : 1 }}>
      <Container className={classes.footerContent}>
        <span>typeline Typing Test ©2021</span>
        <span>
          Made with love by{" "}
          <a href="https://donovanyohan.com" target="_blank">
            Donovan Yohan
          </a>
        </span>
        <span>
          View source code on{" "}
          <a href="https://github.com/donovan-yohan/typeline-v2" target="_blank">
            GitHub
          </a>
        </span>
      </Container>
    </div>
  );
}
