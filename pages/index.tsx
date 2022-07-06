import { useRouter } from "next/router";
import { useEffect } from "react";
import { createTypeUrl } from "../utils/utils";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(createTypeUrl());
  }, []);

  return <></>;
};

export default HomePage;
