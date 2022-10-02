import { Tooltip } from "@mantine/core";
import { useSetAtom } from "jotai";
import React, { useMemo, useRef } from "react";
import { useOffset } from "../../../../hooks/useOffset";
import { TooltipStyle } from "../../../../styles/defaults.style";
import { BACKSPACE_CHAR, keypressToString } from "../../../../utils/utils";
import { Letter } from "../../Letter/Letter";
import { currentHistoryWordRefAtom, historyWordOffsetAtom } from "./HistoryWord.atom";
import { HistoryWordProps } from "./HistoryWord.definition";
import { useWordStyles } from "./HistoryWord.style";
import { HistoryTooltip } from "./HistoryTooltip/HistoryTooltip";

export const HistoryWord = React.memo((props: HistoryWordProps) => {
  const { expected, keypresses, id, passed, current, parentRef } = props;
  const { cx, classes } = useWordStyles();

  const actual = useMemo(() => keypressToString(keypresses).trim(), [keypresses]);
  const perfect = useMemo(
    () =>
      keypresses.filter((k) => k.key !== BACKSPACE_CHAR && k.key !== " ").length ===
        expected.length &&
      actual === expected &&
      passed,
    [keypresses, passed, expected]
  );

  const ref = useRef(null);
  const offset = useOffset(parentRef, ref, [current]);

  const setCurrentHistoryWordRef = useSetAtom(currentHistoryWordRefAtom);
  const setHistoryWordOffset = useSetAtom(historyWordOffsetAtom);

  const overflow = actual.slice(expected.length);

  return (
    <Tooltip
      disabled={!passed && !current}
      {...TooltipStyle}
      width={"auto"}
      position={"bottom"}
      transitionDuration={350}
      label={<HistoryTooltip keypresses={keypresses} />}
      offset={-8}
    >
      <span
        className={cx(classes.word, {
          [classes.incorrect]: passed && actual !== expected,
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
    </Tooltip>
  );
});
