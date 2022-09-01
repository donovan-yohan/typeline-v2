import { Paper } from "@mantine/core";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { expectedAtom, keypressAtom, totalTimeAtom } from "../../atoms/state.atom";
import { generateStats } from "../../utils/chart/statsGenerator/statsGenerator";
import { ResultsChart } from "../ResultsChart/ResultsChart";
import { ResultsWrapperProps } from "./ResultsWrapper.definition";
import { useResultsWrapperStyles } from "./ResultsWrapper.style";

export const ResultsWrapper = (props: ResultsWrapperProps) => {
  const { classes } = useResultsWrapperStyles();

  const [totalTime] = useAtom(totalTimeAtom);
  const [keypresses] = useAtom(keypressAtom);
  const [expected] = useAtom(expectedAtom);

  const stats = useMemo(
    () => generateStats(keypresses, expected, totalTime),
    [keypresses, expected, totalTime]
  );

  return (
    <Paper style={props.style} className={classes.resultsWrapper}>
      <ResultsChart rawStats={stats} />
    </Paper>
  );
};
