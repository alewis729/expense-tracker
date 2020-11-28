import { print } from "graphql";
import { gql } from "apollo-server";
import {
  LOGIN,
  REGISTER,
  AUTH_GOOGLE,
  GET_USER,
  GET_USERS,
} from "@expense-tracker/graphql";

const query = gql`
  ${LOGIN}
  ${REGISTER}
  ${AUTH_GOOGLE}
  ${GET_USER}
  ${GET_USERS}
`;

const variables = {
  id: "1",
  email: "alfred@google.com",
  googleAuthInput: {
    accessToken: "1",
  },
  addUserInput: {
    name: "Bill",
    email: "bill@google.com",
    password: "123456",
  },
  loginUserInput: {
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
