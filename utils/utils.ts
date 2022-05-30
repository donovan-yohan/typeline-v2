import { MutableRefObject } from "react";
import { KeypressType } from "../interfaces/typeline";
import { generateSeed } from "./wordGenerator/wordGenerator.utils";

export const BACKSPACE_CHAR = "⌫";

export const keypressToString = (keypresses: KeypressType[]): string => {
  const keys = keypresses.map((keypress) => keypress.key);

  return keys.reduce((acc, key) => {
    if (key === BACKSPACE_CHAR) {
      return acc.slice(0, -1);
    }

    return `${acc}${key}`;
  }, "");
};

export const createTypeUrl = (seed = generateSeed(), time = 30) => ({
  pathname: "/type",
  query: {
    s: seed,
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
