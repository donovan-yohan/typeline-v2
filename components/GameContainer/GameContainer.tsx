import { Container, Transition } from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { isFinishedAtom } from "../../atoms/state.atom";
import { ResultsWrapper } from "../ResultsWrapper/ResultsWrapper";
import { TestWrapper } from "../TestWrapper/TestWrapper";

export const GameContainer = () => {
  const [isFinished] = useAtom(isFinishedAtom);
  const [transitionFinished, setTransitionFinished] = useState(false);

  return (
    <Container>
      <Transition
        mounted={!isFinished}
        transition='slide-down'
        duration={400}
        timingFunction='ease-in'
        onExited={() => setTransitionFinished(true)}
      >
        {(styles) => <TestWrapper style={styles} />}
      </Transition>
      <Transition
        mounted={transitionFinished}
        transition='slide-up'
        duration={400}
        timingFunction='ease-out'
      >
        {(styles) => <ResultsWrapper style={styles} />}
      </Transition>
    </Container>
  );
};
