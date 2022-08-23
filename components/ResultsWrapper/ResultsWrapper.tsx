import { Paper } from "@mantine/core";
import { ResultsChart } from "../ResultsChart/ResultsChart";
import { ResultsWrapperProps } from "./ResultsWrapper.definition";

export const ResultsWrapper = (props: ResultsWrapperProps) => {
  return (
    <Paper style={props.style}>
      
      <ResultsChart />
    </Paper>
  );
};
