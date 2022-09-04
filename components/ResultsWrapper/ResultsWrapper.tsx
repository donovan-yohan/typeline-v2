import { Container, Group, Stack, Tooltip } from "@mantine/core";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { expectedAtom, keypressAtom, totalTimeAtom } from "../../atoms/state.atom";
import { TooltipStyle } from "../../styles/defaults.style";
import { useGlobalStyles } from "../../styles/globals.style";
import { generateStats } from "../../utils/chart/statsGenerator/statsGenerator";
import { calculateRawWPM, calculateTrueWPM } from "../../utils/chart/wpm.utils";
import { ResultsChart } from "../ResultsChart/ResultsChart";
import {
  DefaultDisplayStats,
  DisplayStats,
  ResultsWrapperProps,
} from "./ResultsWrapper.definition";
import { useResultsWrapperStyles } from "./ResultsWrapper.style";
import { RawWPMTooltip } from "./Tooltips/RawWPMTooltip";
import { TrueWPMTooltip } from "./Tooltips/TrueWPMTooltip";

export const ResultsWrapper = (props: ResultsWrapperProps) => {
  const { classes } = useResultsWrapperStyles();
  const { classes: global } = useGlobalStyles();

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
    <>
      <div className={classes.spacer}>
        W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W
        W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W
      </div>
      <Container style={props.style} className={classes.resultsWrapper}>
        <Stack className={classes.displayStats}>
          <div className={classes.largeScore}>
            <span className={`${global.label} ${classes.scoreLabel} ${global.highlight}`}>
              <span>WPM</span>
              <Tooltip {...TooltipStyle} position={"right"} label={<TrueWPMTooltip />}>
                <span className={global.tooltipIcon}>?</span>
              </Tooltip>
            </span>

            <span
              className={`${classes.largeScoreNumber} ${global.highlight} ${global.number}`}
            >
              {displayStats.trueWpm}
            </span>
          </div>

          <div className={classes.smallScore}>
            <span className={`${global.label} ${classes.scoreLabel}`}>
              <span>Raw WPM</span>
              <Tooltip {...TooltipStyle} position={"right"} label={<RawWPMTooltip />}>
                <span className={global.tooltipIcon}>?</span>
              </Tooltip>
            </span>

            <span>
              <span className={`${classes.smallScoreNumber} ${global.number}`}>
                {displayStats.rawWpm}
              </span>
              <span
                className={`${classes.smallScoreNumber} ${global.number} ${global.gray}`}
              >
                {` (${displayStats.rawTotalWpm})`}
              </span>
            </span>
          </div>
          <div className={classes.smallScore}>
            <span className={`${global.label} ${classes.scoreLabel} ${global.highlight}`}>
              Accuracy
            </span>
            <span
              className={`${classes.smallScoreNumber} ${global.highlight} ${global.number}`}
            >
              {displayStats.accuracy}
            </span>
          </div>
          <div className={classes.smallScore}>
            <span className={`${global.label} ${classes.scoreLabel}`}>Correct</span>
            <span className={`${classes.smallScoreNumber} ${global.number}`}>
              {displayStats.correct}
            </span>
          </div>
          <div className={classes.smallScore}>
            <span className={global.label}>
              <span className={`${classes.scoreLabel} ${global.incorrect}`}>Errors</span>
              <span className={classes.scoreLabel}>{` (corrected)`}</span>
            </span>
            <span>
              <span
                className={`${classes.smallScoreNumber} ${global.number} ${global.incorrect}`}
              >
                {displayStats.incorrect}
              </span>
              <span className={`${classes.smallScoreNumber} ${global.number}`}>
                {` (${displayStats.corrected})`}
              </span>
            </span>
          </div>
        </Stack>

        <ResultsChart rawStats={stats} />
      </Container>
      <div className={classes.spacer}>
        W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W
        W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W
      </div>
    </>
  );
};
