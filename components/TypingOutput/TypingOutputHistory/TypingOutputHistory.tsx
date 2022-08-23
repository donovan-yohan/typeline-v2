import { useAtom } from "jotai";
import { useRef } from "react";
import { TypingOutputHistoryProps } from "./TypingOutputHistory.definition";
import { useTypingOutputStyles } from "./TypingOutputHistory.style";
import { Word } from "../Word/Word";
import { currentWordCorrectAtom, wordOffsetAtom } from "../Word/Word.atom";
import { TypingHighlight } from "../TypingHighlight/TypingHighlight";

export const TypingOutputHistory = (props: TypingOutputHistoryProps) => {
  const { expected, actual } = props;
  const { classes } = useTypingOutputStyles();

  const [wordOffset] = useAtom(wordOffsetAtom);
  const [currentWordCorrect] = useAtom(currentWordCorrectAtom);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.wrapper} ref={ref}>
      <TypingHighlight offset={wordOffset} correct={currentWordCorrect} />
      {expected.map((expected, index) => {
        const actualWord = actual[index];
        return (
          <Word
            id={`word-history-${index}`}
            actual={actualWord || ""}
            expected={expected}
            passed={index < actual.length - 1}
            current={index === actual.length - 1}
            key={`word-history-${index}`}
            parentRef={ref}
            index={index}
          />
        );
      })}
    </div>
  );
};
