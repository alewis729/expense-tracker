import gql from "graphql-tag";

import { chartDataFields, chartDataItemFields } from "../fragments";

export const GET_CHART_DATA = gql`
  query GET_CHART_DATA(
    $withExpenses: Boolean = false
    $withIncomes: Boolean = false
  ) {
    chartData {
      ...chartDataFields
      expenses @include(if: $withExpenses) {
        ...chartDataItemFields
      }
      incomes @include(if: $withIncomes) {
        ...chartDataItemFields
      }
    }
  }
  ${chartDataFields}
  ${chartDataItemFields}
`;
