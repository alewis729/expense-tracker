import gql from "graphql-tag";

import { userFields, categoryFields, expenseFields } from "./fragments";

export const REGISTER = gql`
  mutation REGISTER($addUserInput: AddUserInput!) {
    register(input: $addUserInput) {
      token
      me {
        ...userFields
      }
    }
  }
  ${userFields}
`;

export const LOGIN = gql`
  mutation LOGIN($loginUserInput: LoginUserInput!) {
    login(input: $loginUserInput) {
      token
      me {
        ...userFields
      }
    }
  }
  ${userFields}
`;

export const ADD_CATEGORY = gql`
  mutation ADD_CATEGORY($addCategoryInput: AddCategoryInput!) {
    addCategory(input: $addCategoryInput) {
      ...categoryFields
    }
  }
  ${categoryFields}
`;

export const REMOVE_CATEGORY = gql`
  mutation REMOVE_CATEGORY($id: ID!, $withUser: Boolean = false) {
    removeCategory(id: $id) {
      ...categoryFields
      user @include(if: $withUser) {
        ...userFields
      }
    }
  }
  ${categoryFields}
  ${userFields}
`;

export const ADD_EXPENSE = gql`
  mutation ADD_EXPENSE(
    $addExpenseInput: AddExpenseInput!
    $withUser: Boolean = false
    $withCategory: Boolean = false
  ) {
    addExpense(input: $addExpenseInput) {
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
  ${categoryFields}
  ${userFields}
`;

export const REMOVE_EXPENSE = gql`
  mutation REMOVE_EXPENSE(
    $id: ID!
    $withUser: Boolean = false
    $withCategory: Boolean = false
  ) {
    removeExpense(id: $id) {
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
  ${categoryFields}
  ${userFields}
`;
