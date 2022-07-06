import { MutableRefObject } from "react";
import { KeypressType, StatType } from "../interfaces/typeline";
import { generateSeed } from "./wordGenerator/wordGenerator.utils";

export const BACKSPACE_CHAR = "⌫";

export const EmptyStatType: StatType = {
  correct: 0,
  incorrect: 0,
  corrected: 0,
  incorrectWords: []
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

export const createTypeUrl = (seed = generateSeed(), time = 30) => ({
  pathname: `/${seed}`,
  query: {
    t: time
  }
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
