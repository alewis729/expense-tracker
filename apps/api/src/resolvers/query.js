import { compareUserIds } from "../utils";

export default {
  me: (_, __, ctx) => {
    if (!ctx.user) {
      throw new Error("User could not be found.");
    }

    return ctx.user;
  },
  user: (_, { id }, ctx) => ctx.models.User.findOne({ _id: id }),
  users: (_, __, ctx) => ctx.models.User.find({}),
  category: async (_, { id }, ctx) => {
    const category = await ctx.models.Category.findOne({ _id: id });

    compareUserIds(category.user, ctx.user.id);

    return category;
  },
  categories: (_, __, ctx) => ctx.models.Category.find({ user: ctx.user.id }),
  expense: async (_, { id }, ctx) => {
    const expense = await ctx.models.Expense.findOne({ _id: id });

    compareUserIds(expense.user, ctx.user.id);

    return expense;
  },
  expenses: (_, __, ctx) => ctx.models.Expense.find({ user: ctx.user.id }),
};
