declare module '@expense-tracker/graphql' {
  export const IS_LOGGED_IN: DocumentNode;
  export const GET_ME: DocumentNode;
  export const GET_USER: DocumentNode;
  export const GET_USERS: DocumentNode;
  export const GET_CATEGORY: DocumentNode;
  export const GET_CATEGORIES: DocumentNode;
  export const GET_EXPENSE: DocumentNode;
  export const GET_EXPENSES: DocumentNode;
  export const GET_INCOME: DocumentNode;
  export const GET_INCOME_SOURCES: DocumentNode;

  export const LOGIN: DocumentNode;
  export const REGISTER: DocumentNode;
  export const AUTH_GOOGLE: DocumentNode;
  export const ADD_CATEGORY: DocumentNode;
  export const UPDATE_CATEGORY: DocumentNode;
  export const REMOVE_CATEGORY: DocumentNode;
  export const ADD_INCOME: DocumentNode;
  export const UPDATE_INCOME: DocumentNode;
  export const REMOVE_INCOME: DocumentNode;
}
