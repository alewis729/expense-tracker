import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "@expense-tracker/graphql";

type useIsLoggedInHook = () => boolean;

const useIsLoggedIn: useIsLoggedInHook = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  const isClient = typeof window !== "undefined";

  return (isClient && data.isLoggedIn) || false;
};

export default useIsLoggedIn;
