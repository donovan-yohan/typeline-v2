import { Center, Paper, Title } from "@mantine/core";
import React from "react";
import { ResultsChartProps } from "./ResultsChart.definition";
import { useResultsChartStyles } from "./ResultsChart.style";

export const ResultsChart = (props: ResultsChartProps) => {
  const { classes } = useResultsChartStyles();

  return (
    <Paper style={props.style} className={classes.container}>
      <Center>
        <Title>Chart</Title>
      </Center>
    </Paper>
  );
};
