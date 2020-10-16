import gql from "graphql-tag";

import { userFields } from "./fragments";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_ME = gql`
  query GET_ME {
    me {
      ...userFields
    }
  }
  ${userFields}
`;
