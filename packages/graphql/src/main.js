export { userFields, categoryFields, expenseFields } from "./fragments";

export { GET_CATEGORY, GET_CATEGORIES } from "./queries/categoryQueries";
export { GET_CHART_DATA } from "./queries/chartQueries";
export {
  GET_EXPENSE,
  GET_EXPENSES,
  FILTER_EXPENSES,
} from "./queries/expenseQueries";
export {
  GET_INCOME,
  GET_INCOMES,
  FILTER_INCOMES,
} from "./queries/incomeQueries";
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
  ADD_EXPENSES,
  UPDATE_EXPENSE,
  REMOVE_EXPENSE,
} from "./mutations/expenseMutations";
export {
  ADD_INCOME,
  ADD_INCOMES,
  UPDATE_INCOME,
  REMOVE_INCOME,
} from "./mutations/incomeMutations";
export { REGISTER, LOGIN, AUTH_GOOGLE } from "./mutations/userMutations";
