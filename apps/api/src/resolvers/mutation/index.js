import user from "./user";
import category from "./category";
import expense from "./expense";
import income from "./income";

export default {
  ...user,
  ...category,
  ...expense,
  ...income,
};
