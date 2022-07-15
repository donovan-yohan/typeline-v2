import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Center } from "@mantine/core";
import { wordGeneratorAtom } from "../../atoms/state.atom";
import { useAtom } from "jotai";
import { createTypeUrl } from "../../utils/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { WordGenerator } from "../../utils/wordGenerator/wordGenerator";
import { generateSeed } from "../../utils/wordGenerator/wordGenerator.utils";
import { GameContainer } from "../../components/GameContainer/GameContainer";

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

  const [, setWordGenerator] = useAtom(wordGeneratorAtom);

  return (
    <PageWrapper>
      <Center>
        <GameContainer />
      </Center>
    </PageWrapper>
  );
}
