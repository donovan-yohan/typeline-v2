export const Word = React.memo((props: WordProps) => {
  const { expected, actual, id, passed, current, parentRef } = props;
  const { count, increment } = useCounter(0);
  const perfect = expected === actual && count === expected.length && passed;

  const ref = useRef(null);
  const offset = useOffset(parentRef, ref, [actual, current]);

  const setWordOffset = useSetAtom(wordOffsetAtom);

  useDidUpdateEffect(() => {
    increment();
  }, [actual]);

  useIsomorphicLayoutEffect(() => {
    if (current) setWordOffset(offset);
  }, [current, offset]);

  const overflow = actual.slice(expected.length);

  return (
    <WordWrapper ref={ref}>
      <>
        {expected.split("").map((char, index) => (
          <Letter
            expected={char}
            actual={actual[index]}
            active={index < actual.length}
            wordPassed={passed}
            wordPerfect={perfect}
            key={`${id}-letter-${index}`}
          />
        ))}
      </>
      <>
        {overflow &&
          overflow
            .split("")
            .map((char, index) => (
              <Letter
                expected={""}
                actual={char}
                active
                wordPassed={passed}
                key={`${id}-overflow-${index}`}
              />
            ))}
      </>
    </WordWrapper>
  );
});
