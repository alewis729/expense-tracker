import gql from "graphql-tag";

import { categoryFields, expenseFields } from "../fragments";

export const ADD_EXPENSE = gql`
  mutation ADD_EXPENSE(
    $addExpenseInput: AddExpenseInput!
    $withCategory: Boolean = false
  ) {
    addExpense(input: $addExpenseInput) {
      ...expenseFields
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${expenseFields}
  ${categoryFields}
`;

export const ADD_EXPENSES = gql`
  mutation ADD_EXPENSES(
    $addExpensesInput: AddExpensesInput!
    $withCategory: Boolean = false
  ) {
    addExpenses(input: $addExpensesInput) {
      ...expenseFields
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${expenseFields}
  ${categoryFields}
`;

export const UPDATE_EXPENSE = gql`
  mutation UPDATE_EXPENSE(
    $id: ID!
    $updateExpenseInput: UpdateExpenseInput!
    $withCategory: Boolean = false
  ) {
    updateExpense(id: $id, input: $updateExpenseInput) {
      ...expenseFields
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${expenseFields}
  ${categoryFields}
`;

export const REMOVE_EXPENSE = gql`
  mutation REMOVE_EXPENSE($id: ID!) {
    removeExpense(id: $id) {
      ...expenseFields
    }
  }
  ${expenseFields}
`;
