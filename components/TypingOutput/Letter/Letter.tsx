import { Text } from "@mantine/core";
import React from "react";
import { LetterProps } from "./Letter.definition";
import { useLetterStyles } from "./Letter.style";

export const Letter = React.memo((props: LetterProps) => {
  const { expected, actual, active, wordPassed, wordPerfect, letterStyle } = props;
  const { classes, cx } = useLetterStyles({ actual });

  const letter = expected ? expected : actual;

  const correct = expected === actual;
  const incorrectUntyped = wordPassed && !correct && !actual;
  const overflow = expected === "";

  const baseClassname = cx({
    [classes.untyped]: !actual,
    [classes.incorrect]: active && !correct,
    [classes.overflow]: overflow,
    [classes.perfect]: wordPerfect,
    [classes.incorrectUntyped]: incorrectUntyped
  });

  const customClassName =
    letterStyle &&
    cx({
      [letterStyle.correct]: correct,
      [letterStyle.untyped]: !actual,
      [letterStyle.incorrect]: active && !correct,
      [letterStyle.overflow]: overflow,
      [letterStyle.perfect]: wordPerfect,
      [letterStyle.incorrectUntyped]: incorrectUntyped
    });

  const className = cx(baseClassname, customClassName);

  return <Text className={className}>{letter}</Text>;
});
