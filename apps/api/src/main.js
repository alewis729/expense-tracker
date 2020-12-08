require("dotenv").config();
import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import mocks from "./mocks";
import playground from "./playground";
import connect from "./lib/mongoose";
import {
  User,
  Category,
  Expense,
  userLoader,
  categoryLoader,
  expenseLoader,
} from "./models";

(async () => {
  await connect();
})();

const getUser = async tokenWithBearer => {
  try {
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(" ")[1];
      const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
      return await User.findOne({ _id: tokenVerify.userId });
    }
    return null;
  } catch (err) {
    return null;
  }
};

const isProduction = process.env.NODE_ENV === "production";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const tokenWithBearer = req ? req.headers.authorization : "";
    const user = await getUser(tokenWithBearer);

    return {
      user,
      models: { User, Category, Expense },
      loaders: { userLoader, categoryLoader, expenseLoader },
      req,
      res,
    };
  },
  mocks: process.env.MOCKS === "true" ? mocks : false,
  playground: !isProduction && playground,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
