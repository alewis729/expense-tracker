import { ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import { cache } from "./cache";
import typeDefs from "./typeDefs";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const client = ({ initialState }) => {
  const httpLink = createUploadLink({
    uri: process.env.API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache.restore(initialState || {}),
    connectToDevTools: process.env.NODE_ENV !== "production",
    typeDefs,
    resolvers: {},
  });
};

export default client;
