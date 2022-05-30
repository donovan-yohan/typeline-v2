import { CHARACTER_PLACEMENT, optionFlags } from "./wordGenerator.definition";
export const MAX_TIME = 120;
export const MAX_SEED_LENGTH = 100;

export const COMMON_WORD_BIAS = 0.8;

export const SHORT_WORD_MAX_LENGTH = 4;
export const MEDIUM_WORD_MAX_LENGTH = 8;
export const LONGEST_WORD_LENGTH = 14;

export const CAPITAL_CHANCE = 0.1;
export const NUMBER_CHANCE = 0.15;
export const NEW_DATE_CHANCE = 0.4;
export const OLD_DATE_CHANCE = 0.1;
export const SYMBOL_CHANCE = 0.05;
export const PUNCTUATION_CHANCE = 0.2;

export const MIN_PUNCTUATION_SPACE = 7;
export const MAX_PUNCTUATION_SPACE = 15;

export const MAX_SYMBOL_SPACE = 15;

export const MIN_WORDS_AHEAD = 50;

export const PUNCTUATION_TABLE = [
  { char: ".", probability: 0.392, placement: CHARACTER_PLACEMENT.AFTER },
  { char: ",", probability: 0.369, placement: CHARACTER_PLACEMENT.AFTER },
  { char: ";", probability: 0.019, placement: CHARACTER_PLACEMENT.AFTER },
  { char: ":", probability: 0.02, placement: CHARACTER_PLACEMENT.AFTER },
  { char: "!", probability: 0.021, placement: CHARACTER_PLACEMENT.AFTER },
  { char: "?", probability: 0.036, placement: CHARACTER_PLACEMENT.AFTER },
  { char: '""', probability: 0.161, placement: CHARACTER_PLACEMENT.WRAP }
];

export const SYMBOL_TABLE = [
  { char: "&", probability: 0.166, placement: CHARACTER_PLACEMENT.ALONE },
  { char: "()", probability: 0.166, placement: CHARACTER_PLACEMENT.WRAP },
  { char: "$", probability: 0.166, placement: CHARACTER_PLACEMENT.BEFORE },
  { char: "%", probability: 0.166, placement: CHARACTER_PLACEMENT.AFTER },
  { char: "-", probability: 0.166, placement: CHARACTER_PLACEMENT.MIDDLE },
  { char: "_", probability: 0.166, placement: CHARACTER_PLACEMENT.MIDDLE }
];

export const DEFAULT_OPTIONS: optionFlags = {
  hasUppercase: false,
  hasNumbers: false,
  hasPunctuation: false,
  hasSymbols: false,
  minWordLength: 1,
  maxWordLength: 7
};

export const DEFAULT_TIME = 30;
