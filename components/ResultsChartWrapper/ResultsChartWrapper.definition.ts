import { PropsWithChildren } from "react";
import { StatType } from "../../interfaces/typeline";
import { DisplayStats } from "../ResultsWrapper/ResultsWrapper.definition";

export interface ResultsChartWrapperProps extends PropsWithChildren<any> {
  rawStats: StatType[];
  displayStats: DisplayStats;
}
