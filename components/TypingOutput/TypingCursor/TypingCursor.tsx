import React from "react";
import { TypingCursorProps } from "./TypingCursor.definition";
import { useTypingCursorStyles } from "./TypingCursor.style";

export const TypingCursor = React.memo((props: TypingCursorProps) => {
  const { offset, correct, animate, isLast } = props;
  const { classes } = useTypingCursorStyles({ offset, correct, animate, isLast });

  return <div className={classes.cursor} />;
});
