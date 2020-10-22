import { gql } from "apollo-server";

export default gql`
  type User implements Node {
    id: ID!
    name: String!
    email: EmailAddress!
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
    description: String
    category: Category!
    amount: NonNegativeFloat!
    date: DateTime!
    user: User!
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
  }

  type Mutation {
    register(input: AddUserInput!): AuthPayload!
    login(input: LoginUserInput!): AuthPayload!
    addCategory(input: AddCategoryInput!): Category!
    removeCategory(id: ID!): Category!
    addExpense(input: AddExpenseInput!): Expense!
    removeExpense(id: ID!): Expense!
  }
`;
