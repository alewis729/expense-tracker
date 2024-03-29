import { gql } from "apollo-server";

export default gql`
  # User & Authentication
  type User implements Node {
    id: ID!
    name: String!
    email: EmailAddress!
    categories: [Category!]!
    expenses: [Expense!]!
    incomes: [Income!]!
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

  # Chart data types
  type ChartCategory {
    id: ID
    name: String!
    color: String
    amounts: [NonNegativeFloat]!
  }

  type Payment {
    currencyCode: String!
    categories: [ChartCategory]
  }

  type ChartDataItem {
    year: Int!
    months: [Int!]!
    payments: [Payment]!
  }

  type Timeline {
    year: Int!
    months: [Int!]!
  }

  type ChartData {
    timeline: [Timeline]
    defaultCurrency: String!
    hasExpenses: Boolean!
    hasIncome: Boolean!
    expenses: [ChartDataItem]
    incomes: [ChartDataItem]
  }

  # GQL
  type Query {
    me: User!
    user(id: ID!): User!
    users: [User!]!
    category(id: ID!): Category!
    categories: [Category!]!
    expense(id: ID!): Expense!
    expenses: [Expense!]!
    filterExpenses(input: FilterInput): [Expense]!
    income(id: ID!): Income!
    incomes: [Income!]!
    filterIncomes(input: FilterInput): [Income]!
    chartData: ChartData!
  }

  type Mutation {
    register(input: AddUserInput!): AuthPayload!
    login(input: LoginUserInput!): AuthPayload!
    addCategory(input: AddCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    removeCategory(id: ID!): Category!
    addExpense(input: AddExpenseInput!): Expense!
    addExpenses(input: AddExpensesInput!): [Expense!]!
    updateExpense(id: ID!, input: UpdateExpenseInput!): Expense!
    removeExpense(id: ID!): Expense!
    addIncome(input: AddIncomeInput!): Income!
    addIncomes(input: AddIncomesInput!): [Income!]!
    updateIncome(id: ID!, input: UpdateIncomeInput!): Income!
    removeIncome(id: ID!): Income!
    authGoogle(input: AuthInput!): AuthPayload!
  }
`;
