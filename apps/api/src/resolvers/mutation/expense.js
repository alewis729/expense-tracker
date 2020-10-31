import { isEmpty, omit } from "lodash";

export default {
  addExpense: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const category = await ctx.models.Category.findOne({
      _id: args.input.categoryId,
    });

    if (!category) {
      throw new Error("Category not found.");
    }

    if (!category.user.equals(ctx.user.id)) {
      throw new Error("Invalid User.");
    }

    return ctx.models.Expense.create({
      name: args.input.name,
      description: args.input.description,
      amount: args.input.amount,
      date: args.input.date,
      category: args.input.categoryId,
      user: ctx.user.id,
    });
  },
  updateExpense: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const expense = await ctx.models.Expense.findOne({
      _id: args.id,
    });

    if (!expense) {
      throw new Error("Expense not found.");
    }

    if (!expense.user.equals(ctx.user.id)) {
      throw new Error("Invalid User.");
    }

    if (!isEmpty(args.input.categoryId)) {
      const category = await ctx.models.Category.findOne({
        _id: args.input.categoryId,
      });

      if (!category) {
        throw new Error("Category not found");
      }
    }

    await ctx.models.Expense.updateOne(
      { _id: expense.id },
      {
        ...omit(args.input, "categoryId"),
        category: args.input.categoryId
          ? args.input.categoryId
          : expense.category,
      }
    );

    return ctx.models.Expense.findOne({ _id: expense.id });
  },
  removeExpense: async (_, { id }, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const expense = await ctx.models.Expense.findOne({ _id: id });

    if (!expense) {
      throw new Error("Expense not found.");
    }

    if (!expense.user.equals(ctx.user.id)) {
      throw new Error("Invalid User.");
    }

    await ctx.models.Expense.deleteOne({ _id: id });

    return expense;
  },
};
