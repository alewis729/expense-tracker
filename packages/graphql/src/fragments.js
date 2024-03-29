import gql from "graphql-tag";

export const userFields = gql`
  fragment userFields on User {
    id
    name
    email
  }
`;

export const categoryFields = gql`
  fragment categoryFields on Category {
    id
    name
    color
  }
`;

export const expenseFields = gql`
  fragment expenseFields on Expense {
    id
    name
    description
    currencyCode
    amount
    date
  }
`;

export const incomeFields = gql`
  fragment incomeFields on Income {
    id
    name
    description
    currencyCode
    amount
    date
  }
`;

export const chartDataFields = gql`
  fragment chartDataFields on ChartData {
    timeline {
      year
      months
    }
    defaultCurrency
    hasExpenses
    hasIncome
  }
`;

export const chartDataItemFields = gql`
  fragment chartDataItemFields on ChartDataItem {
    year
    months
    payments {
      currencyCode
      categories {
        id
        name
        color
        amounts
      }
    }
  }
`;
