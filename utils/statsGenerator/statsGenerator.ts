import { KeypressType, StatType } from "../../interfaces/typeline";
import { BACKSPACE_CHAR, EmptyStatType } from "../utils";
import {
  addCorrect,
  addCorrected,
  addIncorrect,
  addIncorrectWord
} from "./statsGenerator.utils";

export const generateStats = (
  keypresses: KeypressType[],
  expected: string[],
  totalTime: number
): StatType[] => {
  // check keypress against expected
  // add to actual string array
  // update expected index when space or backspace on empty actual
  // add to Math.floor(time) stat

  let actual = new Array(expected.length).fill("");
  let stats = new Array<StatType>(totalTime).fill(EmptyStatType);
  let actualIndex = 0;

  keypresses.forEach((keypress) => {
    const { key, timestamp } = keypress;
    const timeIndex = Math.floor(timestamp / 1000);

    const curr = actual[actualIndex];

    if (key === " ") {
      if (curr === expected[actualIndex]) stats[timeIndex] = addCorrect(stats[timeIndex]);
      else stats[timeIndex] = addIncorrect(stats[timeIndex]);

      actualIndex++;
    } else if (key === BACKSPACE_CHAR) {
      if (curr) {
        if (curr.slice(-1) !== expected[actualIndex][curr.length - 1])
          stats[timeIndex] = addCorrected(stats[timeIndex]);

        actual[actualIndex] = actual[actualIndex].slice(0, -1);
      } else {
        const lastActual = actual[actualIndex - 1];
        const lastExpected = expected[actualIndex - 1];
        if (lastActual && lastExpected && lastActual !== lastExpected)
          stats[timeIndex] = addCorrected(stats[timeIndex]);

        actualIndex--;
      }
    } else {
      if (
        curr.length < expected[actualIndex].length &&
        key === expected[actualIndex][curr.length]
      )
        stats[timeIndex] = addCorrect(stats[timeIndex]);
      else {
        stats[timeIndex] = addIncorrect(stats[timeIndex]);
        stats[timeIndex] = addIncorrectWord(stats[timeIndex], expected[actualIndex]);
      }
      actual[actualIndex] += key;
    }
  });
  return stats;
};
