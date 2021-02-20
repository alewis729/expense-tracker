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

export const GET_INCOME_SOURCES = gql`
  query GET_INCOME_SOURCES(
    $withUser: Boolean = false
    $withCategory: Boolean = false
  ) {
    incomeSources {
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
