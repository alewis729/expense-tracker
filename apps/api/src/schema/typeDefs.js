import { gql } from "apollo-server";

export default gql`
  type User implements Node {
    id: ID!
    name: String!
    email: EmailAddress!
    categories: [Category!]!
    expenses: [Expense!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthPayload {
    token: String!
    me: User!
  }

  type Category implements Node {
    id: ID!
    name: String!
    color: String!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Expense implements Node {
    id: ID!
    name: String!
    description: String!
    amount: NonNegativeFloat!
    currencyCode: String!
    date: DateTime!
    user: User!
    category: Category!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Income implements Node {
    id: ID!
    name: String!
    description: String!
    amount: NonNegativeFloat!
    currencyCode: String!
    date: DateTime!
    user: User!
    category: Category!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    me: User!
    user(id: ID!): User!
    users: [User!]!
    category(id: ID!): Category!
    categories: [Category!]!
    expense(id: ID!): Expense!
    expenses: [Expense!]!
    income(id: ID!): Income!
    incomeSources: [Income!]!
  }

  type Mutation {
    register(input: AddUserInput!): AuthPayload!
    login(input: LoginUserInput!): AuthPayload!
    addCategory(input: AddCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    removeCategory(id: ID!): Category!
    addExpense(input: AddExpenseInput!): Expense!
    updateExpense(id: ID!, input: UpdateExpenseInput!): Expense!
    removeExpense(id: ID!): Expense!
    addIncome(input: AddIncomeInput!): Income!
    updateIncome(id: ID!, input: UpdateIncomeInput!): Income!
    removeIncome(id: ID!): Income!
    authGoogle(input: AuthInput!): AuthPayload!
  }
`;
