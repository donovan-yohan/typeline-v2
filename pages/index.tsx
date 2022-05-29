import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  const id = Math.floor(Math.random() * 10000000);

  useEffect(() => {
    router.push({
      pathname: "/test",
      query: { seed: id }
    });
  }, []);

  return <></>;
};

export default HomePage;
