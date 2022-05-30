import { Text } from "@mantine/core";
import { useSetAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import { useOffset } from "../../../hooks/useOffset";
import { letterOffsetAtom } from "../TypingOutput.atom";
import { LetterProps } from "./Letter.definition";
import { useLetterStyles } from "./Letter.style";

export const Letter = React.memo((props: LetterProps) => {
  const {
    expected,
    actual,
    typed,
    active,
    isLast,
    wordPassed,
    wordActive,
    wordPerfect,
    letterClassnames,
    parentRef
  } = props;
  const { classes, cx } = useLetterStyles({ actual, isLast });

  const letter = expected ? expected : actual;

  const correct = expected === actual;
  const incorrect = !correct && typed && expected;
  const incorrectUntyped = wordPassed && !correct && !actual;
  const overflow = expected === "";

  const baseClassname = cx(classes.letter, {
    [classes.untyped]: !actual,
    [classes.incorrect]: incorrect,
    [classes.overflow]: overflow,
    [classes.perfect]: wordPerfect,
    [classes.incorrectUntyped]: incorrectUntyped
  });

  const customClassName =
    letterClassnames &&
    cx({
      [letterClassnames.correct]: correct,
      [letterClassnames.untyped]: !actual,
      [letterClassnames.incorrect]: incorrect,
      [letterClassnames.overflow]: overflow,
      [letterClassnames.perfect]: wordPerfect,
      [letterClassnames.incorrectUntyped]: incorrectUntyped
    });

  const className = cx(baseClassname, customClassName);

  const ref = useRef(null);
  const offset = useOffset(parentRef, ref, [active, wordActive, actual]);

  const setLetterOffset = useSetAtom(letterOffsetAtom);

  // effect for non overflow
  useUpdateEffect(() => {
    wordActive &&
      (active || (actual && isLast)) &&
      setLetterOffset({ offset, isLast: !!actual && isLast });
  }, [wordActive, active, actual, offset]);

  // effect for overflow
  useEffect(() => {
    if (overflow && wordActive) setLetterOffset({ offset, isLast });
  }, [offset, active, actual]);

  return (
    <Text ref={ref} component='span' className={className}>
      {letter}
    </Text>
  );
});
