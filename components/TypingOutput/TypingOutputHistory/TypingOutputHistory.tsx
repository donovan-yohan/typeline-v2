import { useAtom } from "jotai";
import { useRef } from "react";
import { TypingOutputHistoryProps } from "./TypingOutputHistory.definition";
import { useTypingOutputStyles } from "./TypingOutputHistory.style";
import { currentWordCorrectAtom } from "../Word/Word.atom";
import { TypingHighlight } from "../TypingHighlight/TypingHighlight";
import { HistoryWord } from "./HistoryWord/HistoryWord";
import { historyWordOffsetAtom } from "./HistoryWord/HistoryWord.atom";

const WORD_BUFFER = 5;

export const TypingOutputHistory = (props: TypingOutputHistoryProps) => {
  const { expected, keypresses } = props;
  const { classes } = useTypingOutputStyles();

  const [wordOffset] = useAtom(historyWordOffsetAtom);
  const [currentWordCorrect] = useAtom(currentWordCorrectAtom);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.wrapper} ref={ref}>
      <TypingHighlight offset={wordOffset} correct={currentWordCorrect} />
      {expected.slice(0, keypresses.length + WORD_BUFFER).map((expected, index) => {
        return (
          <HistoryWord
            id={`word-history-${index}`}
            keypresses={keypresses[index] || []}
            expected={expected}
            passed={index < keypresses.length - 1}
            current={index === keypresses.length - 1}
            key={`word-history-${index}`}
            parentRef={ref}
            index={index}
          />
        );
      })}
    </div>
  );
};
