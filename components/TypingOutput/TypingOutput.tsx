import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useBoolean, useTimeout } from "usehooks-ts";
import { TypingCursor } from "./TypeCursor/TypingCursor";
import { TypingHighlight } from "./TypingHighlight/TypingHighlight";
import {
  currentWordCorrectAtom,
  letterOffsetAtom,
  wordOffsetAtom
} from "./TypingOutput.atom";
import { TypingOutputProps } from "./TypingOutput.definition";
import { useTypingOutputStyles } from "./TypingOutput.style";
import { Word } from "./Word/Word";

const CURSOR_TIMEOUT = 900;

export const TypingOutput = (props: TypingOutputProps) => {
  const { expected, actual } = props;
  const { classes } = useTypingOutputStyles();

  const [wordOffset] = useAtom(wordOffsetAtom);
  const [letterOffset] = useAtom(letterOffsetAtom);
  const [currentWordCorrect] = useAtom(currentWordCorrectAtom);

  const {
    value: animateCursor,
    setTrue: doAnimate,
    setFalse: doNotAnimate
  } = useBoolean(true);
  const [animateCursorTimeout, setAnimateCursorTimeout] = useState<number | null>(
    CURSOR_TIMEOUT
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    doNotAnimate();
    setAnimateCursorTimeout(CURSOR_TIMEOUT);
  }, [actual]);

  useTimeout(() => {
    doAnimate();
    setAnimateCursorTimeout(null);
  }, animateCursorTimeout);

  return (
    <div className={classes.wrapper} ref={ref}>
      <TypingHighlight offset={wordOffset} correct={currentWordCorrect} />
      <TypingCursor
        offset={letterOffset.offset}
        isLast={letterOffset.isLast}
        correct={currentWordCorrect}
        animate={animateCursor}
      />
      {expected.split(" ").map((expected, index) => {
        const actualWord = actual.split(" ")[index];
        return (
          <Word
            id={`word-${index}`}
            actual={actualWord || ""}
            expected={expected}
            passed={index < actual.split(" ").length - 1}
            current={index === actual.split(" ").length - 1}
            key={`word-${index}`}
            parentRef={ref}
          />
        );
      })}
    </div>
  );
};
