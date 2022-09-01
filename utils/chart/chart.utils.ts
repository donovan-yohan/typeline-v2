import { ChartStatType, StatType } from "../../interfaces/typeline";
import { calculateRawWPM, calculateTrueWPM } from "./wpm.utils";

const RAW_AVERAGING_SAMPLES = 2;
const RAW_MAIN_DATA_WEIGHT = 0.85;

const weightedAverage = (
  array: number[],
  i: number,
  totalSamples: number,
  weight: number
) => {
  let value = 0;

  let remainingWeight = 1;
  let nextWeight = weight;

  for (let k = 1; k <= totalSamples; k++) {
    if (i - k >= 0) {
      value += array[i - k + 1] * nextWeight;
      remainingWeight -= nextWeight;
      nextWeight = remainingWeight * weight;
    }
  }
  value += remainingWeight * (array[i - totalSamples] || array[0]);
  return value;
};

export const generateChartStats = (stats: StatType[]): ChartStatType[] => {
  const statsCorrectArray = stats.map((stat) => stat.correct);

  return stats.map((stat, i) => {
    const correctToTime = stats
      .slice(0, i + 1)
      .reduce((acc, stat) => acc + stat.correct, 0);
    const incorrectToTime = stats
      .slice(0, i + 1)
      .reduce((acc, stat) => acc + stat.incorrect, 0);
    const correctedToTime = stats
      .slice(0, i + 1)
      .reduce((acc, stat) => acc + stat.corrected, 0);

    const weightedCorrect = weightedAverage(
      statsCorrectArray,
      i,
      RAW_AVERAGING_SAMPLES,
      RAW_MAIN_DATA_WEIGHT
    );

    return {
      wpm: calculateTrueWPM(correctToTime, incorrectToTime, correctedToTime, 0, i + 1),
      raw: calculateRawWPM(weightedCorrect, 0, i + 1),
      correctInInterval: stat.correct,
      incorrectInInterval: stat.incorrect,
      correctedInInterval: stat.corrected,
      correctToTime,
      incorrectToTime,
      correctedToTime,
      incorrectWords: stat.incorrectWords,
    } as ChartStatType;
  });
};
