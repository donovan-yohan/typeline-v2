import { ChartDataset, ScaleOptionsByType } from "chart.js";

export const ErrorDatasetConfig: Partial<ChartDataset<"line">> = {
  label: "Errors",
  fill: false,
  showLine: false,
  pointStyle: "crossRot",
  yAxisID: "errorAxis",
  pointRadius: 6,
  pointBorderWidth: 2,
  pointHitRadius: 12,
  pointHoverRadius: 9,
  pointHoverBorderWidth: 3,
};

export const AvgWPMDatasetConfig: Partial<ChartDataset<"line">> = {
  label: "Average WPM",
  fill: false,
  spanGaps: true,
  tension: 0.4,
  yAxisID: "wpmAxis",
  pointHitRadius: 12,
  pointHoverRadius: 8,
  borderWidth: 3,
};

export const RawWPMDatasetConfig: Partial<ChartDataset<"line">> = {
  label: "Raw WPM at Time",
  fill: false,
  spanGaps: true,
  tension: 0.4,
  yAxisID: "wpmAxis",
  pointRadius: 3,
  pointHitRadius: 12,
  pointHoverRadius: 6,
  borderWidth: 2,
};
