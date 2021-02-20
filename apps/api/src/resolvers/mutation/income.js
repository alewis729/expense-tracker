import { forEach, isDate, isEmpty, omit } from "lodash";
import { compareUserIds } from "../../utils";

export default {
  addIncome: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const category = await ctx.models.Category.findOne({
      _id: args.input.categoryId,
    });

    if (!category) {
      throw new Error("Category not found.");
    }

    compareUserIds(category.user, ctx.user.id);

    return ctx.models.Income.create({
      name: args.input.name,
      description: !isEmpty(args.input.description)
        ? args.input.description
        : "",
      currencyCode: args.input.currencyCode,
      amount: args.input.amount,
      date: isDate(args.input.date) ? args.input.date : new Date(),
      category: args.input.categoryId,
      user: ctx.user.id,
    });
  },
  updateIncome: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    let income = await ctx.models.Income.findOne({
      _id: args.id,
    });

    if (!income) {
      throw new Error("Income not found.");
    }

    compareUserIds(income.user, ctx.user.id);

    let updatedIncomeFields = omit(args.input, "categoryId");

    if (!isEmpty(args.input.categoryId)) {
      const category = await ctx.models.Category.findOne({
        _id: args.input.categoryId,
      });

      if (!category) {
        throw new Error("Category not found");
      }

      compareUserIds(category.user, ctx.user.id);

      updatedIncomeFields.category = args.input.categoryId;
    }

    forEach(updatedIncomeFields, (value, key) => {
      if (income[key] !== value) {
        income[key] = value;
      }
    });

    await income.save();
    return ctx.models.Income.findOne({ _id: income.id });
  },
  removeIncome: async (_, { id }, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const income = await ctx.models.Income.findOne({ _id: id });

    if (!income) {
      throw new Error("Income not found.");
    }

    compareUserIds(income.user, ctx.user.id);

    await ctx.models.Income.deleteOne({ _id: id });

    return income;
  },
};
