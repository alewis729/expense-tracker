import faker from "faker/locale/en";
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
};
