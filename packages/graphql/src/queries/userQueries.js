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

export const GET_USER = gql`
  query GET_USER(
    $id: ID!
    $withCategories: Boolean = false
    $withExpenses: Boolean = false
  ) {
    user(id: $id) {
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

export const GET_USERS = gql`
  query GET_USERS(
    $withCategories: Boolean = false
    $withExpenses: Boolean = false
  ) {
    users {
      ...userFields
      categories @include(if: $withCategories) {
        ...categoryFields
      }
      expenses @include(if: $withExpenses) {
        ...expenseFields
      }
    }
  }
  ${userFields}
  ${categoryFields}
  ${expenseFields}
`;
