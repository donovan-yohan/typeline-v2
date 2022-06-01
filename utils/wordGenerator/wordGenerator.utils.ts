import {
  MEDIUM_WORD_MAX_LENGTH,
  NEW_DATE_CHANCE,
  OLD_DATE_CHANCE,
  SHORT_WORD_MAX_LENGTH
} from "./wordGenerator.config";
import shortWords from "../../assets/short.js";
import mediumWords from "../../assets/medium.js";
import longWords from "../../assets/long.js";
import { CHARACTER_PLACEMENT } from "./wordGenerator.definition";

export function generateSeed() {
  return (Math.random() + 1)
    .toString(36)
    .substring(2)
    .replace(/[0-9]+/g, "")
    .substring(0, 7);
}

export function getRandomWithBias(
  random: () => number,
  min: number,
  max: number,
  bias: number,
  influence: number
) {
  let num = random() * (max - min) + min;
  let mix = random() * influence;
  return num * (1 - mix) + bias * mix;
}

export const getRandom = (random: () => number, min: number, max: number): number => {
  return random() * (max - min) + min;
};

export function generateDate(r: number, random: () => number) {
  if (r < NEW_DATE_CHANCE) {
    // generate date from 1600 to present
    return Math.floor(getRandom(random, 1600, new Date().getFullYear())) + "";
  } else if (r >= NEW_DATE_CHANCE && r < NEW_DATE_CHANCE + OLD_DATE_CHANCE) {
    // generate BC date
    let date = Math.floor(getRandom(random, 100, 900));
    return date + "BC";
  } else {
    // generate a placement number
    let number = Math.floor(getRandom(random, 1, 20));
    if (number === 1) {
      return "1st";
    } else if (number === 2) {
      return "2nd";
    } else if (number === 3) {
      return "3rd";
    } else {
      return number + "th";
    }
  }
}

export function formatWord(
  word: string,
  symbol: string,
  placement: CHARACTER_PLACEMENT
): string {
  if (placement === CHARACTER_PLACEMENT.BEFORE) {
    return symbol + word;
  } else if (placement === CHARACTER_PLACEMENT.AFTER) {
    return word + symbol;
  } else {
    if (symbol.length == 2) {
      return symbol.charAt(0) + word + symbol.charAt(1);
    } else {
      return symbol + word + symbol;
    }
  }
}

// combine n arrays with alternating values
export function combineArraysAlternating<T>(arrays: T[][]): T[] {
  let combined: T[] = [];
  let length = Math.max(...arrays.map((a) => a.length));
  for (let i = 0; i < length; i++) {
    arrays.forEach((a) => {
      if (a[i]) combined.push(a[i]);
    });
  }
  return combined;
}

export function filterWordBank(min: number, max: number): string[] {
  if (min === max) min = 0;

  let short = shortWords;
  let med = mediumWords;
  let long = longWords;

  if (min > SHORT_WORD_MAX_LENGTH) short = [];
  else if (max < SHORT_WORD_MAX_LENGTH)
    short = short.filter((w) => w.length <= max && w.length > min);

  if (min > MEDIUM_WORD_MAX_LENGTH || max <= SHORT_WORD_MAX_LENGTH) med = [];
  else med = med.filter((w) => w.length <= max && w.length > min);

  if (max <= MEDIUM_WORD_MAX_LENGTH) long = [];
  else if (min > MEDIUM_WORD_MAX_LENGTH)
    long = long.filter((w) => w.length <= max && w.length > min);

  return combineArraysAlternating([short, med]).concat(long);
}
