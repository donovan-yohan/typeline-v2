import { useSetAtom } from "jotai";
import React, { useRef } from "react";
import { useCounter, useIsomorphicLayoutEffect, useUpdateEffect } from "usehooks-ts";
import { useOffset } from "../../../hooks/useOffset";
import { Letter } from "../Letter/Letter";
import { currentWordCorrectAtom, currentWordRefAtom, wordOffsetAtom } from "./Word.atom";
import { WordProps } from "./Word.definition";
import { useWordStyles } from "./Word.style";

export const Word = React.memo((props: WordProps) => {
  const { expected, actual, id, passed, current, parentRef } = props;
  const { cx, classes } = useWordStyles();

  const { count: charactersTyped, increment } = useCounter(0);
  const perfect = expected === actual && charactersTyped === expected.length && passed;

  const ref = useRef(null);
  const offset = useOffset(parentRef, ref, [current]);

  const setCurrentWordRef = useSetAtom(currentWordRefAtom);
  const setWordOffset = useSetAtom(wordOffsetAtom);
  const setCurrentWordCorrect = useSetAtom(currentWordCorrectAtom);

  useUpdateEffect(() => {
    current && setCurrentWordRef(ref);
  }, [current]);

  useUpdateEffect(() => {
    increment();
    setCurrentWordCorrect(expected.substring(0, actual.length) === actual);
  }, [actual]);

  useIsomorphicLayoutEffect(() => {
    if (current) {
      setWordOffset(offset);
      setCurrentWordCorrect(expected.substring(0, actual.length) === actual);
    }
  }, [current, offset]);

  const overflow = actual.slice(expected.length);

  return (
    <span
      className={cx(classes.word, {
        [classes.incorrect]: passed && actual !== expected
      })}
      ref={ref}
    >
      <>
        {expected.split("").map((char, index) => (
          <Letter
            expected={char}
            actual={actual[index]}
            typed={index < actual.length}
            active={index === actual.length}
            isLast={index === expected.length - 1}
            wordPassed={passed}
            wordActive={current}
            wordPerfect={perfect}
            wordOverflow={!!overflow}
            key={`${id}-letter-${index}`}
            parentRef={parentRef}
          />
        ))}
      </>
      <>
        {overflow &&
          overflow
            .split("")
            .map((char, index) => (
              <Letter
                expected={""}
                actual={char}
                typed
                active={index === overflow.length - 1}
                isLast
                wordPassed={passed}
                wordActive={current}
                wordOverflow
                key={`${id}-overflow-${index}`}
                parentRef={parentRef}
              />
            ))}
      </>
    </span>
  );
});
