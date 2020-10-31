import gql from "graphql-tag";

import { userFields, categoryFields, expenseFields } from "./fragments";

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

export const GET_USER = gql`
  query GET_USER($id: ID!) {
    user(id: $id) {
      ...userFields
    }
  }
  ${userFields}
`;

export const GET_USERS = gql`
  query GET_USERS {
    users {
      ...userFields
    }
  }
  ${userFields}
`;

export const GET_CATEGORY = gql`
  query GET_CATEGORY($id: ID!, $withUser: Boolean = false) {
    category(id: $id) {
      ...categoryFields
      user @include(if: $withUser) {
        ...userFields
      }
    }
  }
  ${categoryFields}
  ${userFields}
`;

export const GET_CATEGORIES = gql`
  query GET_CATEGORIES($withUser: Boolean = false) {
    categories {
      ...categoryFields
      user @include(if: $withUser) {
        ...userFields
      }
    }
  }
  ${categoryFields}
  ${userFields}
`;

export const GET_EXPENSE = gql`
  query GET_EXPENSE(
    $id: ID!
    $withUser: Boolean = false
    $withCategory: Boolean = false
  ) {
    expense(id: $id) {
      ...expenseFields
      user @include(if: $withUser) {
        ...userFields
      }
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${expenseFields}
  ${userFields}
  ${categoryFields}
`;

export const GET_EXPENSES = gql`
  query GET_EXPENSES(
    $withUser: Boolean = false
    $withCategory: Boolean = false
  ) {
    expenses {
      ...expenseFields
      user @include(if: $withUser) {
        ...userFields
      }
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${expenseFields}
  ${userFields}
  ${categoryFields}
`;
