import gql from "graphql-tag";

import { userFields, categoryFields, expenseFields } from "../fragments";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_ME = gql`
  query GET_ME(
    $withCategories: Boolean = false
    $withExpenses: Boolean = false
  ) {
    me {
      ...userFields
      categories @include(if: $withCategories) {
        ...categoryFields
      }
      expenses @include(if: $withExpenses) {
        ...expenseFields
        category {
          ...categoryFields
        }
      }
    }
  }
  ${userFields}
  ${categoryFields}
  ${expenseFields}
`;
