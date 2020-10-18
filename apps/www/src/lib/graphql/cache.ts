import { InMemoryCache, ReactiveVar } from "@apollo/client";

const isClient = typeof window !== "undefined";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
      },
    },
  },
});

export const isLoggedInVar: ReactiveVar<
  string | boolean | null
> = cache.makeVar(isClient ? localStorage.getItem("token") : null);
