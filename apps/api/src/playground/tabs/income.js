import { print } from "graphql";
import { gql } from "apollo-server";
import {
  GET_INCOME,
  GET_INCOMES,
  ADD_INCOME,
  UPDATE_INCOME,
  REMOVE_INCOME,
} from "@expense-tracker/graphql";

const query = gql`
  ${GET_INCOME}
  ${GET_INCOMES}
  ${ADD_INCOME}
  ${UPDATE_INCOME}
  ${REMOVE_INCOME}
`;

const variables = {
  id: "1",
  withUser: false,
  withCategory: true,
  addIncomeInput: {
    name: "Freelance project XYZ",
    currencyCode: "USD",
    amount: 750,
    categoryId: "1",
    date: new Date(),
  },
  updateIncomeInput: {
    name: "Beers 2",
  },
};

const headers = {
  Authorization: "Bearer xyz",
};

export default {
  endpoint: "/",
  query: print(query),
  name: "income",
  variables: JSON.stringify(variables, null, "\t"),
  headers,
};
