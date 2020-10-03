import { print } from "graphql";
import { gql } from "apollo-server";
import {
  GET_ME,
  GET_USER,
  GET_USERS,
  REGISTER,
} from "@expense-tracker/graphql";

const query = gql`
  ${GET_ME}
  ${GET_USER}
  ${GET_USERS}
  ${REGISTER}
`;

const variables = {
  id: "1",
  email: "alfred@google.com",
  addUserInput: {
    name: "Bill",
    email: "bill@google.com",
    password: "123456",
  },
};

const headers = {
  Authorization: "Bearer xyz",
};

export default {
  endpoint: "/",
  query: print(query),
  name: "users",
  variables: JSON.stringify(variables, null, "\t"),
  headers,
};
