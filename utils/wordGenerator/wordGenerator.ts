import pseudorandom from "seed-random";
import {
  CAPITAL_CHANCE,
  COMMON_WORD_BIAS,
  DEFAULT_OPTIONS,
  DEFAULT_TIME,
  MAX_PUNCTUATION_SPACE,
  MAX_SYMBOL_SPACE,
  MIN_PUNCTUATION_SPACE,
  NUMBER_CHANCE,
  PUNCTUATION_CHANCE,
  PUNCTUATION_TABLE,
  SYMBOL_CHANCE,
  SYMBOL_TABLE
} from "./wordGenerator.config";
import { CHARACTER_PLACEMENT, optionFlags } from "./wordGenerator.definition";
import {
  filterWordBank,
  formatWord,
  generateDate,
  getRandomWithBias
} from "./wordGenerator.utils";

export class WordGenerator {
  random: () => number;
  options: optionFlags;
  time: number;
  wordBank: string[];
  symbolCounter: number;
  puncCounter: number;

  constructor(
    seed: string,
    options: optionFlags = DEFAULT_OPTIONS,
    time: number = DEFAULT_TIME
  ) {
    this.random = pseudorandom(seed);
    this.options = options;
    this.time = time;
    this.wordBank = filterWordBank(options.minWordLength, options.maxWordLength);
    this.symbolCounter = 0;
    this.puncCounter = 0;
  }

  private getRandom(min: number, max: number) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  private getRandomWord() {
    let index = getRandomWithBias(
      this.random,
      0,
      this.wordBank.length - 0.001,
      0,
      COMMON_WORD_BIAS
    );
    return this.wordBank[Math.floor(index)];
  }

  generateWord(): string {
    const { hasNumbers, hasPunctuation, hasSymbols, hasUppercase } = this.options;
    let r = this.random();
    let word = "";
    if (hasNumbers && r < NUMBER_CHANCE) {
      r = this.random();
      word = generateDate(r, this.random);
    } else if (
      hasSymbols &&
      ((r >= NUMBER_CHANCE && r < SYMBOL_CHANCE + NUMBER_CHANCE) ||
        this.symbolCounter > MAX_SYMBOL_SPACE)
    ) {
      // SYMBOLS
      this.symbolCounter = 0;
      r = this.random();
      let probability = 0;
      let symbol = SYMBOL_TABLE[0];

      SYMBOL_TABLE.some((s) => {
        probability += s.probability;
        if (r <= probability) {
          symbol = s;
          return true;
        }
      });

      if (symbol.placement === CHARACTER_PLACEMENT.MIDDLE) {
        word = this.getRandomWord() + symbol.char + this.getRandomWord();
      } else if (symbol.char === "$") {
        word = formatWord(
          this.getRandom(0, 100).toFixed(2),
          symbol.char,
          symbol.placement
        );
      } else if (symbol.char === "%") {
        word = formatWord(
          Math.floor(this.getRandom(0, 100)).toString(),
          symbol.char,
          symbol.placement
        );
      } else if (symbol.placement === CHARACTER_PLACEMENT.WRAP) {
        word = formatWord(this.getRandomWord(), symbol.char, symbol.placement);
      } else {
        word = symbol.char;
      }
    } else {
      this.symbolCounter += 1;
      r = this.random();
      word = this.getRandomWord();
      if (hasPunctuation && this.puncCounter > MIN_PUNCTUATION_SPACE) {
        r = this.random();
        if (this.puncCounter > MAX_PUNCTUATION_SPACE || r < PUNCTUATION_CHANCE) {
          this.puncCounter = 0;
          r = this.random();
          let probability = 0;
          let punctuation = PUNCTUATION_TABLE[0];

          PUNCTUATION_TABLE.some((p) => {
            probability += p.probability;
            if (r <= probability) {
              punctuation = p;
              return true;
            }
          });

          if (punctuation.placement == CHARACTER_PLACEMENT.WRAP) {
            word = formatWord(word, punctuation.char, punctuation.placement);
          } else word += punctuation.char;
        } else {
          this.puncCounter += 1;
        }
      } else {
        this.puncCounter += 1;
      }
    }

    if (!hasUppercase) word = word.toLowerCase();
    else if (this.random() < CAPITAL_CHANCE)
      word = word.charAt(0).toUpperCase() + word.slice(1);

    return word;
  }
}
