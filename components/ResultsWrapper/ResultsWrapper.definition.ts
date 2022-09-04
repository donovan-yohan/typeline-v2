import { PropsWithChildren } from "react";

export interface ResultsWrapperProps extends PropsWithChildren<any> {}

export interface DisplayStats {
  trueWpm: number;
  rawWpm: number;
  rawTotalWpm: number;
  accuracy: string;
  correct: number;
  incorrect: number;
  corrected: number;
}

export const DefaultDisplayStats: DisplayStats = {
  trueWpm: 0,
  rawWpm: 0,
  rawTotalWpm: 0,
  accuracy: "0%",
  correct: 0,
  incorrect: 0,
  corrected: 0,
};
