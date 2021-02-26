import gql from "graphql-tag";

import { userFields, categoryFields, incomeFields } from "../fragments";

export const GET_INCOME = gql`
  query GET_INCOME(
    $id: ID!
    $withUser: Boolean = false
    $withCategory: Boolean = false
  ) {
    income(id: $id) {
      ...incomeFields
      user @include(if: $withUser) {
        ...userFields
      }
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${incomeFields}
  ${userFields}
  ${categoryFields}
`;

export const GET_INCOMES = gql`
  query GET_INCOMES(
    $withUser: Boolean = false
    $withCategory: Boolean = false
  ) {
    incomes {
      ...incomeFields
      user @include(if: $withUser) {
        ...userFields
      }
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${incomeFields}
  ${userFields}
  ${categoryFields}
`;
