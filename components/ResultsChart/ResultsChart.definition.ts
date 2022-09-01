import { HTMLAttributes } from "react";
import { StatType } from "../../interfaces/typeline";

export interface ResultsChartProps extends HTMLAttributes<HTMLDivElement> {
  rawStats: StatType[];
}
