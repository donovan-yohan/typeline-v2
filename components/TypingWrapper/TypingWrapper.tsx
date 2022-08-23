import { Paper } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { inputRefAtom } from "../../atoms/state.atom";
import { easeOutExpo } from "../../utils/styles/animations.utils";
import { currentWordRefAtom, wordOffsetAtom } from "../TypingOutput/Word/Word.atom";
import { TypingWrapperProps } from "./TypingWrapper.definition";
import { useTypingWrapperStyles } from "./TypingWrapper.style";

export const TypingWrapper = (props: TypingWrapperProps) => {
  const { children } = props;
  const { value: scroll } = useBoolean(false);

  const { classes } = useTypingWrapperStyles({ scroll });

  const [lineOffset, setLineOffset] = useState(0);

  const [ref] = useAtom(currentWordRefAtom);
  const [highlightOffset] = useAtom(wordOffsetAtom);
  const [inputRef] = useAtom(inputRefAtom);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    easing: (t: number) => easeOutExpo(t),
    duration: 1700
  });

  useEffect(() => {
    if (highlightOffset.top != lineOffset) setLineOffset(highlightOffset.top);
  }, [highlightOffset]);

  useEffect(() => {
    if (ref && ref.current) {
      targetRef.current = ref.current;
      scrollIntoView({ alignment: "center" });
    }
  }, [lineOffset]);

  return (
    <Paper
      ref={scrollableRef}
      className={classes.scrollArea}
      onClick={() => {
        inputRef?.current?.focus();
      }}
    >
      {children}
    </Paper>
  );
};
