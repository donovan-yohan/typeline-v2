import { Container, Paper } from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import {
  isFinishedAtom,
  isRunningAtom,
  keypressAtom,
  wordGeneratorAtom
} from "../../atoms/state.atom";
import { useWordGenerator } from "../../hooks/useWordGenerator";
import { KeypressType } from "../../interfaces/typeline";
import { keypressToArray } from "../../utils/utils";
import { Timer } from "../Timer/Timer";
import { TypingInput } from "../TypingInput/TypingInput";
import { TypingOutput } from "../TypingOutput/TypingOutput";
import { TypingWrapper } from "../TypingWrapper/TypingWrapper";
import { TestWrapperProps } from "./TestWrapper.definition";

export const TestWrapper = (props: TestWrapperProps) => {
  const [keys, setKeys] = useAtom(keypressAtom);
  const [wordGenerator] = useAtom(wordGeneratorAtom);

  const actual = keypressToArray(keys);

  const onType = ({ key, timestamp }: KeypressType) => {
    setKeys((keys) => [...keys, { key, timestamp }]);
  };

  useEffect(() => {
    if (keys.length > 0 && !isRunning) setIsRunning(true);
  }, [keys]);

  const expectedArray = useWordGenerator(wordGenerator, actual.length);
  const debouncedExpected = useDebounce(expectedArray, 10);

  const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const [isFinished] = useAtom(isFinishedAtom);

  return (
    <Container style={props.style}>
      <TypingInput disabled={isFinished} onType={onType} />
      <TypingWrapper>
        <TypingOutput expected={debouncedExpected} actual={actual} />
      </TypingWrapper>
      <Timer isRunning={isRunning} />
    </Container>
  );
};
