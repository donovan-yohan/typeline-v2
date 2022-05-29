import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePageRedirect = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    router.push({
      pathname: "/test",
      query: { seed: id }
    });
  }, []);

  return <></>;
};

export default HomePageRedirect;
