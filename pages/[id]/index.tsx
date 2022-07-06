import { ColorSchemeToggle } from "../../components/ColorSchemeToggle/ColorSchemeToggle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { TypingInput } from "../../components/TypingInput/TypingInput";
import { Center, Container, Stack } from "@mantine/core";
import { TypingOutput } from "../../components/TypingOutput/TypingOutput";
import { keypressAtom, wordGeneratorAtom } from "../../atoms/state.atom";
import { useAtom } from "jotai";
import { KeypressType } from "../../interfaces/typeline";
import { createTypeUrl, keypressToArray } from "../../utils/utils";
import { useRouter } from "next/router";
import { useDebounce } from "usehooks-ts";
import { useEffect } from "react";
import { WordGenerator } from "../../utils/wordGenerator/wordGenerator";
import { generateSeed } from "../../utils/wordGenerator/wordGenerator.utils";
import { useWordGenerator } from "../../hooks/useWordGenerator";
import { TypingWrapper } from "../../components/TypingWrapper/TypingWrapper";

export default function HomePage() {
  const router = useRouter();
  const { id, t } = router.query;

  useEffect(() => {
    console.log("resetting test due to url change");
    const seed = (id as string) || generateSeed();
    const time = parseInt(t as string) || undefined;
    router.push(createTypeUrl(seed, time), undefined, { shallow: true });
    setWordGenerator(new WordGenerator(seed, undefined, time));
  }, [id, t]);

  const [keys, setKeys] = useAtom(keypressAtom);
  const [wordGenerator, setWordGenerator] = useAtom(wordGeneratorAtom);

  const actual = keypressToArray(keys);

  const onType = ({ key, timestamp }: KeypressType) => {
    setKeys((keys) => [...keys, { key, timestamp }]);
  };

  const expectedArray = useWordGenerator(wordGenerator, actual.length);
  const debouncedExpected = useDebounce(expectedArray, 10);

  return (
    <PageWrapper>
      <ColorSchemeToggle />
      <Center>
        <Stack>
          <TypingInput onType={onType} />
          <Container size={"md"}>
            <TypingWrapper>
              <TypingOutput expected={debouncedExpected} actual={actual} />
            </TypingWrapper>
          </Container>
        </Stack>
      </Center>
    </PageWrapper>
  );
}
