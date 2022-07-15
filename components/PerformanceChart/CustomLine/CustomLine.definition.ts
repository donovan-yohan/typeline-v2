import { ChartDataset, LineControllerDatasetOptions } from "chart.js";

export interface CustomLineProps {
  data: ChartDataset;
  options: LineControllerDatasetOptions;
  chartHeight: string;
}
