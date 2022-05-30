import { TypingHighlightProps } from "./TypingHighlight.definition";
import { useTypingHighlightStyles } from "./TypingHighlight.style";

export const TypingHighlight = (props: TypingHighlightProps) => {
  const { offset, correct } = props;
  const { classes } = useTypingHighlightStyles({ offset, correct });

  return <div className={classes.highlight} />;
};
