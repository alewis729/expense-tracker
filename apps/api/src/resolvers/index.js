import { resolvers as resolversScalars } from "graphql-scalars";

import User from "./user";
import Category from "./category";
import Expense from "./expense";
import Mutation from "./mutation";
import Query from "./query";

export default {
  ...resolversScalars,
  Node: {
    __resolveType() {
      return null;
    },
  },
  User,
  Category,
  Expense,
  Mutation,
  Query,
};
