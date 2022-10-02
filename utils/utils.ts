import { MutableRefObject } from "react";
import { KeypressType, StatType } from "../interfaces/typeline";
import { generateSeed } from "./wordGenerator/wordGenerator.utils";

export const BACKSPACE_CHAR = "⌫";

export const EmptyStatType: StatType = {
  correct: 0,
  incorrect: 0,
  corrected: 0,
  incorrectWords: [],
};

export const keypressToString = (keypresses: KeypressType[]): string => {
  const keys = keypresses.map((keypress) => keypress.key);

  return keys.reduce((acc, key) => {
    if (key === BACKSPACE_CHAR) {
      return acc.slice(0, -1);
    }

    return `${acc}${key}`;
  }, "");
};

export const keypressToArray = (keypresses: KeypressType[]): string[] => {
  return keypressToString(keypresses).split(" ");
};

export const keypressesToKeypressArray = (
  keypresses: KeypressType[]
): KeypressType[][] => {
  let keypressesArray: KeypressType[][] = [[]];
  let index = 0;
  let letters: number = 0;

  keypresses.forEach((keypress) => {
    if (keypress.key === " ") {
      // push keypress to current word
      keypressesArray[index].push(keypress);

      index++;
      if (!keypressesArray[index]) keypressesArray.push([]);
      letters = 0;
    } else if (keypress.key === BACKSPACE_CHAR) {
      if (letters === 0) {
        index--;
        letters = keypressesToLength(keypressesArray[index]);
      } else letters--;

      // push keypress to current word, or previous if empty
      keypressesArray[index].push(keypress);
    } else {
      keypressesArray[index].push(keypress);
      letters++;
    }
  });

  return keypressesArray;
};

const keypressesToLength = (keypresses: KeypressType[]): number => {
  let length = 0;

  keypresses.forEach((keypress) => {
    if (keypress.key === BACKSPACE_CHAR) length--;
    else length++;
  });

  return length;
};

export const typeOnString = (key: string, str: string): string => {
  if (key === BACKSPACE_CHAR) {
    return str.slice(0, -1);
  } else {
    return `${str}${key}`;
  }
};

export const createTypeUrl = (seed = generateSeed(), time = 30) => ({
  pathname: `/${seed}`,
  query: {
    t: time,
  },
});

const isMutableRefObject = <T>(thing: any): thing is MutableRefObject<T> =>
  (thing as MutableRefObject<T>) !== undefined;

// https://www.davedrinks.coffee/how-do-i-use-two-react-refs/

export const mergeRefs = <T>(...refs: React.Ref<T>[]) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 1) return filteredRefs[0];

  return (inst: T) => {
    for (const ref of filteredRefs) {
      if (typeof ref === "function") {
        ref(inst);
      } else if (isMutableRefObject<T>(ref)) {
        ref.current = inst;
      }
    }
  };
};

export function formatTime(time: number): string {
  return `${Math.floor(time / 60)}:${(time % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
}
