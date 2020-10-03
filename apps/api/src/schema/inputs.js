import { gql } from "apollo-server";

export default gql`
  input AddUserInput {
    name: String!
    email: EmailAddress!
    password: String!
  }
`;
