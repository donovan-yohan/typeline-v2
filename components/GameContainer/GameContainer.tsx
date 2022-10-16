import { Container, Transition } from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { isFinishedAtom, isRunningAtom } from "../../atoms/state.atom";
import { ResultsWrapper } from "../ResultsWrapper/ResultsWrapper";
import { TestWrapper } from "../TestWrapper/TestWrapper";

export const GameContainer = () => {
  const [isFinished] = useAtom(isFinishedAtom);
  const [_, setIsRunning] = useAtom(isRunningAtom);
  const [transitionFinished, setTransitionFinished] = useState(false);

  return (
    /**
     * TODO: instead of swapping them entirely, transition within the testwrapper and just add the resultsChart to the bottom
     * so that it can leverage the natural scrolling of the page
     *
     * change between TypingOutput and HistoryTypingOutput
     * smooth scroll down, wait for duration of scroll, swap out components above with crossfade (to cover in case user scrolls up)
     * https://stackoverflow.com/questions/50074823/how-can-i-keep-scroll-position-when-add-dom-to-top
     */

    <Container>
      <Transition
        mounted={!isFinished}
        transition="slide-down"
        duration={400}
        timingFunction="ease-in"
        onExited={() => setTransitionFinished(true)}
      >
        {(styles) => <TestWrapper style={styles} />}
      </Transition>
      <Transition
        mounted={transitionFinished}
        transition="slide-up"
        duration={400}
        timingFunction="ease-out"
        onEnter={() => {
          window.scrollTo(0, document.body.scrollHeight);
          setIsRunning(false);
        }}
      >
        {(styles) => <ResultsWrapper style={styles} />}
      </Transition>
    </Container>
  );
};
