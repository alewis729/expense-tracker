export { userFields, categoryFields, expenseFields } from "./fragments";

export { GET_CATEGORY, GET_CATEGORIES } from "./queries/categoryQueries";
export { GET_EXPENSE, GET_EXPENSES } from "./queries/expenseQueries";
export { GET_INCOME, GET_INCOME_SOURCES } from "./queries/incomeQueries";
export {
  IS_LOGGED_IN,
  GET_ME,
  GET_USER,
  GET_USERS,
} from "./queries/userQueries";

export {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
} from "./mutations/categoryMutations";
export {
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  REMOVE_EXPENSE,
} from "./mutations/expenseMutations";
export {
  ADD_INCOME,
  UPDATE_INCOME,
  REMOVE_INCOME,
} from "./mutations/incomeMutations";
export { REGISTER, LOGIN, AUTH_GOOGLE } from "./mutations/userMutations";
