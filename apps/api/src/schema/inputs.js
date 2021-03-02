import { gql } from "apollo-server";

export default gql`
  input AddUserInput {
    name: String!
    email: EmailAddress!
    password: String!
  }

  input LoginUserInput {
    email: EmailAddress!
    password: String!
  }

  input AuthInput {
    accessToken: String!
  }

  input AddCategoryInput {
    name: String!
    color: String!
  }

  input UpdateCategoryInput {
    name: String
    color: String
  }

  input AddExpenseInput {
    name: String!
    description: String
    currencyCode: String!
    amount: NonNegativeFloat!
    categoryId: ID!
    date: DateTime
  }

  input AddExpensesInput {
    expenses: [AddExpenseInput!]!
  }

  input UpdateExpenseInput {
    name: String
    description: String
    currencyCode: String
    amount: NonNegativeFloat
    categoryId: ID
    date: DateTime
  }

  input AddIncomeInput {
    name: String!
    description: String
    currencyCode: String!
    amount: NonNegativeFloat!
    categoryId: ID!
    date: DateTime
  }

  input AddIncomesInput {
    incomes: [AddIncomeInput!]!
  }

  input UpdateIncomeInput {
    name: String
    description: String
    currencyCode: String
    amount: NonNegativeFloat
    categoryId: ID
    date: DateTime
  }
`;
