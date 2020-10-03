import faker from "faker/locale/en";
import { MockList } from "apollo-server";
import { mocks as mocksScalars } from "graphql-scalars";

export default {
  ...mocksScalars,

  AuthPayload: () => ({
    token: faker.random.uuid(),
  }),

  ResetPayload: () => ({
    statusCode: 202,
    body: "",
  }),

  User: () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }),

  Query: () => ({
    users: () => new MockList([10, 20]),
    restaurants: () => new MockList([8, 10]),
  }),
};
