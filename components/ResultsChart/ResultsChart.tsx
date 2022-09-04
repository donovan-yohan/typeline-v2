import { Paper, useMantineTheme } from "@mantine/core";
import { Chart, ChartData, ChartOptions, Color, PointStyle, TooltipItem } from "chart.js";
import React, { useMemo, useRef } from "react";
import { useThemeColours } from "../../hooks/useThemeColours";
import { generateChartStats } from "../../utils/chart/chart.utils";
import { formatTime } from "../../utils/utils";
import CustomLine from "./CustomLine/CustomLine";
import {
  AvgWPMDatasetConfig,
  ErrorDatasetConfig,
  RawWPMDatasetConfig,
} from "./ResultsChart.config";
import { ResultsChartProps } from "./ResultsChart.definition";
import { useResultsChartStyles } from "./ResultsChart.style";

const getLabelString = (context: TooltipItem<"line">) => {
  let value = `${context.parsed.y}`;
  if (!context.dataset.label) return value;
  if (context.dataset.label.includes("WPM")) {
    return value + `wpm ${context.dataset.label.replace(" WPM", "").toLowerCase()}`;
  } else if (context.dataset.label.includes("Error")) {
    if (context.parsed.y == 1) {
      return value + ` error`;
    } else {
      return value + ` errors`;
    }
  } else {
    return value + ` ${context.dataset.label.toLowerCase()}`;
  }
};

export const ResultsChart = (props: ResultsChartProps) => {
  const { classes } = useResultsChartStyles();
  const { fn } = useMantineTheme();
  const { incorrect, highlight, foreground, background } = useThemeColours();

  const stats = useMemo(() => generateChartStats(props.rawStats), [props.rawStats]);
  const chartData: ChartData<"line"> = useMemo(() => {
    return {
      labels: stats.map((_, i) => i + 1),
      datasets: [
        {
          ...ErrorDatasetConfig,
          data: stats.map((s) =>
            s.incorrectInInterval > 0 ? s.incorrectInInterval : null
          ),
          backgroundColor: incorrect,
          borderColor: incorrect,
          pointBorderColor: incorrect,
        },
        {
          ...AvgWPMDatasetConfig,
          data: stats.map((s) => s.wpm),
          backgroundColor: highlight,
          borderColor: highlight,
        },
        {
          ...RawWPMDatasetConfig,
          data: stats.map((s) => s.raw),
          backgroundColor: foreground,
          borderColor: foreground,
        },
      ],
    };
  }, [stats, incorrect, highlight, foreground]);

  const hasLowWPM = useMemo(() => stats.some((s) => s.wpm < 10 || s.raw < 10), [stats]);
  const needsMinHeight = useMemo(
    () => stats.every((s) => s.wpm < 47 && s.raw < 47),
    [stats]
  );

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      wpmAxis: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          display: false,
          drawBorder: false,
        },
        // stop WPM axis from going negative for very low WPM
        min: hasLowWPM ? -0.99 : 0,
        max: needsMinHeight ? 50 : undefined,
        suggestedMin: 0,
        grace: "5%",
        ticks: {
          font: {
            weight: "400",
          },
          callback: function (val: number | string) {
            if (typeof val === "string") return val;
            return val > 0 ? val : Math.ceil(val);
          },
        },
      },
      errorAxis: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: background,
          callback: (tick: number | string) => {
            if (typeof tick === "string") return tick;
            if (tick % 1 === 0) return tick;
          },
        },
        min: 0,
        grace: "5%",
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            weight: "400",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          generateLabels: (chart: Chart<"line">) => {
            let data = chart.data.datasets;
            return data.map((l, i) => {
              return {
                text: l.label?.toLowerCase() || "",
                fontColor: l.backgroundColor as Color,
                fillStyle: "fill",
                strokeStyle: "none",
                pointStyle: l.pointStyle as PointStyle,
                fillColor: l.backgroundColor as Color,
                color: l.backgroundColor as Color,
                datasetIndex: i,
              };
            });
          },
        },
        onClick: () => {},
      },
      tooltip: {
        titleColor: foreground,
        usePointStyle: true,
        backgroundColor: fn.darken(background, 0.9),
        boxWidth: 12,
        padding: 16,
        bodySpacing: 4,
        bodyFont: {
          weight: "normal",
        },
        cornerRadius: 2,
        caretSize: 6,
        caretPadding: 4,
        multiKeyBackground: "rgba(0,0,0,0)",
        callbacks: {
          title: (context: TooltipItem<"line">[]) => {
            return formatTime(context[0].parsed.x + 1);
          },
          label: (context: TooltipItem<"line">) => {
            return getLabelString(context);
          },
          labelTextColor: (context: TooltipItem<"line">) =>
            context.dataset.backgroundColor as Color,
          labelColor: (context: TooltipItem<"line">) => {
            return {
              bodyColor: context.dataset.backgroundColor as Color,
              borderColor: context.dataset.backgroundColor as Color,
              backgroundColor: context.dataset.backgroundColor as Color,
              borderWidth: 0,
              borderDash: undefined,
              borderRadius: 0,
            };
          },
        },
      },
    },
  };

  const chartParentRef = useRef<HTMLDivElement>(null);

  return (
    <Paper ref={chartParentRef} style={props.style} className={classes.container}>
      <CustomLine data={chartData} options={options} />
    </Paper>
  );
};
