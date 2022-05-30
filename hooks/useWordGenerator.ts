import { useEffect, useState } from "react";
import { WordGenerator } from "../utils/wordGenerator/wordGenerator";
import { MIN_WORDS_AHEAD } from "../utils/wordGenerator/wordGenerator.config";

export const useWordGenerator = (
  wordGenerator: WordGenerator,
  typedCount: number
): string[] => {
  const [wordBank, setWordBank] = useState<string[]>([]);

  // reset word bank when word generator changes
  useEffect(() => {
    setWordBank([]);
  }, [wordGenerator]);

  useEffect(() => {
    if (wordBank.length < typedCount + MIN_WORDS_AHEAD) {
      setWordBank((words) => [...words, wordGenerator.generateWord()]);
    }
  }, [wordBank, typedCount]);

  return wordBank;
};
