import gql from "graphql-tag";

import { categoryFields, incomeFields } from "../fragments";

export const ADD_INCOME = gql`
  mutation ADD_INCOME(
    $addIncomeInput: AddIncomeInput!
    $withCategory: Boolean = false
  ) {
    addIncome(input: $addIncomeInput) {
      ...incomeFields
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${incomeFields}
  ${categoryFields}
`;

export const UPDATE_INCOME = gql`
  mutation UPDATE_INCOME(
    $id: ID!
    $updateIncomeInput: UpdateIncomeInput!
    $withCategory: Boolean = false
  ) {
    updateIncome(id: $id, input: $updateIncomeInput) {
      ...incomeFields
      category @include(if: $withCategory) {
        ...categoryFields
      }
    }
  }
  ${incomeFields}
  ${categoryFields}
`;

export const REMOVE_INCOME = gql`
  mutation REMOVE_INCOME($id: ID!) {
    removeIncome(id: $id) {
      ...incomeFields
    }
  }
  ${incomeFields}
`;
