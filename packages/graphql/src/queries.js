import gql from "graphql-tag";

import { userFields } from "./fragments";

export const GET_ME = gql`
  query GET_ME {
    me {
      ...userFields
    }
  }
  ${userFields}
`;
