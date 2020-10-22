import { print } from "graphql";
import { gql } from "apollo-server";
import {
  GET_EXPENSE,
  GET_EXPENSES,
  ADD_EXPENSE,
} from "@expense-tracker/graphql";

const query = gql`
  ${GET_EXPENSE}
  ${GET_EXPENSES}
  ${ADD_EXPENSE}
`;

const variables = {
  id: "1",
  withUser: false,
  withCategory: false,
  addExpenseInput: {
    name: "Internet connection bill",
    categoryId: "1",
    amount: 125.75,
  },
};

const headers = {
  Authorization: "Bearer xyz",
};

export default {
  endpoint: "/",
  query: print(query),
  name: "expenses",
  variables: JSON.stringify(variables, null, "\t"),
  headers,
};
