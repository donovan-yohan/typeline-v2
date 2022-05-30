import { useRouter } from "next/router";
import { useEffect } from "react";
import { generateSeed } from "../utils/wordGenerator/wordGenerator.utils";

const HomePage = () => {
  const router = useRouter();

  const id = generateSeed();

  useEffect(() => {
    router.push({
      pathname: "/test",
      query: { seed: id }
    });
  }, []);

  return <></>;
};

export default HomePage;
