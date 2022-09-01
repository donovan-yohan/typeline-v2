import { ChartData, ChartOptions } from "chart.js";

export interface CustomLineProps {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  chartHeight: string;
}
