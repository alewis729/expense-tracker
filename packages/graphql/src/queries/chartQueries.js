import gql from "graphql-tag";

import { chartDataFields, paymentsPerYearFields } from "../fragments";

// expensesPerMonth: Boolean
// expensesPerYear: Boolean
// incomePerMonth: Boolean
// incomePerYear: Boolean

export const GET_CHART_DATA = gql`
  query GET_CHART_DATA(
    $expensesPerYear: Boolean = false
    $incomePerYear: Boolean = false
  ) {
    chartData {
      ...chartDataFields
      expensesPerYear @include(if: $expensesPerYear) {
        ...paymentsPerYearFields
      }
      incomesPerYear @include(if: $incomePerYear) {
        ...paymentsPerYearFields
      }
    }
  }
  ${chartDataFields}
  ${paymentsPerYearFields}
`;
