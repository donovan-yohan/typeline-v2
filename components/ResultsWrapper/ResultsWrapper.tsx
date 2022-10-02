import { useAtom } from "jotai";
import { useMemo } from "react";
import { expectedAtom, keypressAtom, totalTimeAtom } from "../../atoms/state.atom";
import { generateStats } from "../../utils/chart/statsGenerator/statsGenerator";
import { calculateRawWPM, calculateTrueWPM } from "../../utils/chart/wpm.utils";
import { keypressesToKeypressArray } from "../../utils/utils";
import { ResultsChartWrapper } from "../ResultsChartWrapper/ResultsChartWrapper";
import { TypingOutputHistory } from "../TypingOutput/TypingOutputHistory/TypingOutputHistory";
import {
  DefaultDisplayStats,
  DisplayStats,
  ResultsWrapperProps,
} from "./ResultsWrapper.definition";
import { useResultsWrapperStyles } from "./ResultsWrapper.style";

export const ResultsWrapper = (props: ResultsWrapperProps) => {
  const { classes } = useResultsWrapperStyles();

  const [totalTime] = useAtom(totalTimeAtom);
  const [keypresses] = useAtom(keypressAtom);
  const [expected] = useAtom(expectedAtom);

  const stats = useMemo(
    () =>
      totalTime === 0 || keypresses.length === 0 || expected.length === 0
        ? []
        : generateStats(keypresses, expected, totalTime),
    [keypresses, expected, totalTime]
  );

  const displayStats: DisplayStats = useMemo(() => {
    if (stats.length === 0) return DefaultDisplayStats;

    const totalCorrect = stats.reduce((acc, curr) => acc + curr.correct, 0);
    const totalIncorrect = stats.reduce((acc, curr) => acc + curr.incorrect, 0);
    const totalCorrected = stats.reduce((acc, curr) => acc + curr.corrected, 0);

    return {
      trueWpm: calculateTrueWPM(
        totalCorrect,
        totalIncorrect,
        totalCorrected,
        0,
        totalTime
      ),
      rawWpm: calculateRawWPM(totalCorrect, 0, totalTime),
      rawTotalWpm: calculateRawWPM(totalCorrect + totalIncorrect, 0, totalTime),
      accuracy:
        ((totalCorrect / (totalCorrect + totalIncorrect)) * 100 || 0).toLocaleString(
          "en-US",
          { maximumFractionDigits: 1 }
        ) + "%",
      correct: totalCorrect,
      incorrect: totalIncorrect,
      corrected: totalCorrected,
    };
  }, [stats]);

  return (
    <div style={props.style} className={classes.wrapper}>
      <div className={classes.historyWrapper}>
        <TypingOutputHistory
          keypresses={keypressesToKeypressArray(keypresses)}
          expected={expected}
        />
      </div>
      <ResultsChartWrapper rawStats={stats} displayStats={displayStats} />
    </div>
  );
};
