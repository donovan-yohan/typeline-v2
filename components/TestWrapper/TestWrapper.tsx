import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import {
  expectedAtom,
  isFinishedAtom,
  isRunningAtom,
  keypressAtom,
  wordGeneratorAtom,
} from "../../atoms/state.atom";
import { useWordGenerator } from "../../hooks/useWordGenerator";
import { KeypressType } from "../../interfaces/typeline";
import { typeOnString } from "../../utils/utils";
import { Timer } from "../Timer/Timer";
import { TypingInput } from "../TypingInput/TypingInput";
import { TypingOutput } from "../TypingOutput/TypingOutput";
import { TypingWrapper } from "../TypingWrapper/TypingWrapper";
import { TestWrapperProps } from "./TestWrapper.definition";
import { useTestWrapperStyles } from "./TestWrapper.style";

export const TestWrapper = (props: TestWrapperProps) => {
  const { classes } = useTestWrapperStyles();

  const [keys, setKeys] = useAtom(keypressAtom);
  const [wordGenerator] = useAtom(wordGeneratorAtom);

  const [actual, setActual] = useState("");

  const onType = ({ key, timestamp }: KeypressType) => {
    setKeys((keys) => [...keys, { key, timestamp }]);
    setActual((actual) => typeOnString(key, actual));
  };

  useEffect(() => {
    if (keys.length > 0 && !isRunning) setIsRunning(true);
  }, [keys]);

  const expectedArray = useWordGenerator(wordGenerator, actual.length);
  const debouncedExpected = useDebounce(expectedArray, 10);

  const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const [isFinished] = useAtom(isFinishedAtom);
  const [, setExpected] = useAtom(expectedAtom);

  useEffect(() => {
    if (isFinished) setExpected(expectedArray);
  }, [isFinished]);

  return (
    <div style={props.style} className={classes.container}>
      <TypingInput disabled={isFinished} onType={onType} />
      <TypingWrapper>
        <TypingOutput expected={debouncedExpected} actual={actual.split(" ")} />
      </TypingWrapper>
      <Timer isRunning={isRunning} />
    </div>
  );
};
