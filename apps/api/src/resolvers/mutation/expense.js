import { isEmpty, omit } from "lodash";
import { checkSameUser } from "../../middleware";

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

    checkSameUser(category, ctx);

    return ctx.models.Expense.create({
      name: args.input.name,
      description: !isEmpty(args.input.description)
        ? args.input.description
        : null,
      amount: args.input.amount,
      date: !isEmpty(args.input.date) ? args.input.date : new Date(),
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

    checkSameUser(expense, ctx);

    let updatedExpenseFields = omit(args.input, "categoryId");

    if (!isEmpty(args.input.categoryId)) {
      const category = await ctx.models.Category.findOne({
        _id: args.input.categoryId,
      });

      if (!category) {
        throw new Error("Category not found");
      }

      checkSameUser(category, ctx);

      updatedExpenseFields.category = args.input.categoryId;
    }

    await ctx.models.Expense.updateOne(
      { _id: expense.id },
      updatedExpenseFields
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

    checkSameUser(expense, ctx);

    await ctx.models.Expense.deleteOne({ _id: id });

    return expense;
  },
};
