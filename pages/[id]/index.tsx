import { useRouter } from "next/router";
import { useEffect } from "react";
import { createTypeUrl } from "../../utils/utils";

const HomePageRedirect = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    router.push(createTypeUrl(id as string));
  }, []);

  return <></>;
};

export default HomePageRedirect;
