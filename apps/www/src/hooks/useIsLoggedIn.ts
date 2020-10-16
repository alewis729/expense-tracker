import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "@expense-tracker/graphql";

const useIsLoggedIn = options => {
  const { data } = useQuery(IS_LOGGED_IN, options);
  const isClient = typeof window !== "undefined";

  return (isClient && data.isLoggedIn) || false;
};

export default useIsLoggedIn;
