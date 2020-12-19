import { print } from "graphql";
import { gql } from "apollo-server";
import {
  GET_EXPENSE,
  GET_EXPENSES,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  REMOVE_EXPENSE,
} from "@expense-tracker/graphql";

const query = gql`
  ${GET_EXPENSE}
  ${GET_EXPENSES}
  ${ADD_EXPENSE}
  ${UPDATE_EXPENSE}
  ${REMOVE_EXPENSE}
`;

const variables = {
  id: "1",
  withUser: false,
  withCategory: true,
  addExpenseInput: {
    name: "Beers",
    description: "Test",
    amount: 10,
    categoryId: "1",
    date: "1992-10-09T00:00:00Z",
  },
  updateExpenseInput: {
    name: "Beers 2",
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
