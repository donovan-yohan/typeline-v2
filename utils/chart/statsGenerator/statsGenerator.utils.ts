import { StatType } from "../../../interfaces/typeline";

export const addCorrect = (stat: StatType): StatType => ({
  ...stat,
  correct: stat.correct + 1
});

export const addIncorrect = (stat: StatType): StatType => ({
  ...stat,
  incorrect: stat.incorrect + 1
});

export const addCorrected = (stat: StatType): StatType => ({
  ...stat,
  corrected: stat.corrected + 1
});

export const addIncorrectWord = (stat: StatType, incorrectWord: string): StatType => {
  let incorrectWords = stat.incorrectWords;
  if (incorrectWords.find((word) => word === incorrectWord)) return stat;

  return {
    ...stat,
    incorrectWords: [...incorrectWords, incorrectWord]
  };
};
