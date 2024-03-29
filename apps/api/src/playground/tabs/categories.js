import { print } from "graphql";
import { gql } from "apollo-server";
import {
  GET_CATEGORY,
  GET_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
} from "@expense-tracker/graphql";

const query = gql`
  ${GET_CATEGORY}
  ${GET_CATEGORIES}
  ${ADD_CATEGORY}
  ${UPDATE_CATEGORY}
  ${REMOVE_CATEGORY}
`;

const variables = {
  id: "1",
  withUser: false,
  addCategoryInput: {
    name: "Groceries",
    color: "red",
  },
  updateCategoryInput: {
    name: "Groceries 2",
    color: "green",
  },
};

const headers = {
  Authorization: "Bearer xyz",
};

export default {
  endpoint: "/",
  query: print(query),
  name: "categories",
  variables: JSON.stringify(variables, null, "\t"),
  headers,
};
