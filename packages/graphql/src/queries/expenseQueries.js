import gql from "graphql-tag";

import { userFields, categoryFields, expenseFields } from "../fragments";

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

export const FILTER_EXPENSES = gql`
  query FILTER_EXPENSES(
    $filterInput: FilterInput!
    $withCategory: Boolean = false
  ) {
    filterExpenses(input: $filterInput) {
      ...expenseFields
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${expenseFields}
  ${categoryFields}
`;
