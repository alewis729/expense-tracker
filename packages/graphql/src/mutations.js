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

export const UPDATE_CATEGORY = gql`
  mutation UPDATE_CATEGORY(
    $id: ID!
    $updateCategoryInput: UpdateCategoryInput!
  ) {
    updateCategory(id: $id, input: $updateCategoryInput) {
      ...categoryFields
    }
  }
  ${categoryFields}
`;

export const REMOVE_CATEGORY = gql`
  mutation REMOVE_CATEGORY($id: ID!) {
    removeCategory(id: $id) {
      ...categoryFields
    }
  }
  ${categoryFields}
`;

export const ADD_EXPENSE = gql`
  mutation ADD_EXPENSE($addExpenseInput: AddExpenseInput!) {
    addExpense(input: $addExpenseInput) {
      ...expenseFields
    }
  }
  ${expenseFields}
`;
