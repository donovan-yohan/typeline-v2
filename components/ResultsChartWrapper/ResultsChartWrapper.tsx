import { Stack, Tooltip } from "@mantine/core";
import { TooltipStyle } from "../../styles/defaults.style";
import { useGlobalStyles } from "../../styles/globals.style";
import { ResultsChart } from "../ResultsChart/ResultsChart";
import { ResultsChartWrapperProps } from "./ResultsChartWrapper.definition";
import { useStyles } from "./ResultsChartWrapper.style";
import { RawWPMTooltip } from "./Tooltips/RawWPMTooltip";
import { TrueWPMTooltip } from "./Tooltips/TrueWPMTooltip";

export function ResultsChartWrapper(props: ResultsChartWrapperProps) {
  const { rawStats, displayStats } = props;
  const { classes } = useStyles();
  const { classes: global } = useGlobalStyles();

  return (
    <div className={classes.resultsChartWrapper}>
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
      <ResultsChart rawStats={rawStats} />
    </div>
  );
}
