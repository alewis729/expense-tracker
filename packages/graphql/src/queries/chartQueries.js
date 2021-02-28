import gql from "graphql-tag";

import { chartDataFields, paymentsPerYearFields } from "../fragments";

// expensesPerMonth: Boolean
// incomePerMonth: Boolean

export const GET_CHART_DATA = gql`
  query GET_CHART_DATA(
    $expensesPerYear: Boolean = false
    $incomesPerYear: Boolean = false
  ) {
    chartData {
      ...chartDataFields
      expensesPerYear @include(if: $expensesPerYear) {
        ...paymentsPerYearFields
      }
      incomesPerYear @include(if: $incomesPerYear) {
        ...paymentsPerYearFields
      }
    }
  }
  ${chartDataFields}
  ${paymentsPerYearFields}
`;
