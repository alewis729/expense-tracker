import { forEach, isDate, isEmpty, omit } from "lodash";
import { compareUserIds } from "../../utils";
import mongoose from "mongoose";
import { Expense } from "../../models";

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

    compareUserIds(category.user, ctx.user.id);

    return ctx.models.Expense.create({
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
  addExpenses: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const expenseIds = await Promise.all(
      args.input.expenses.map(async obj => {
        const categoryId = !isEmpty(obj.categoryId)
          ? obj.categoryId.split("-")[0]
          : null;
        const isValidId = mongoose.Types.ObjectId.isValid(categoryId);

        if (!isValidId) {
          throw new Error(`Category id '${categoryId}' isn't a valid id.`);
        }

        const category = await ctx.models.Category.findOne({
          _id: categoryId,
        });

        if (!category) {
          throw new Error(`Category not found for: '${obj.name}'`);
        }

        compareUserIds(category.user, ctx.user.id);

        const expense = new Expense({
          name: obj.name,
          description: !isEmpty(obj.description) ? obj.description : "",
          currencyCode: obj.currencyCode,
          amount: obj.amount,
          date: isDate(obj.date) ? obj.date : new Date(),
          category: categoryId,
          user: ctx.user.id,
        });

        await expense.save(err => {
          if (err) {
            throw new Error(
              "Something went wrong while saving expenses to the database."
            );
          }
        });

        return expense._id;
      })
    );

    return await ctx.models.Expense.find({
      _id: { $in: expenseIds },
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

    compareUserIds(expense.user, ctx.user.id);

    let updatedExpenseFields = omit(args.input, "categoryId");

    if (!isEmpty(args.input.categoryId)) {
      const category = await ctx.models.Category.findOne({
        _id: args.input.categoryId,
      });

      if (!category) {
        throw new Error("Category not found");
      }

      compareUserIds(category.user, ctx.user.id);

      updatedExpenseFields.category = args.input.categoryId;
    }

    forEach(updatedExpenseFields, (value, key) => {
      if (expense[key] !== value) {
        expense[key] = value;
      }
    });

    await expense.save();
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

    compareUserIds(expense.user, ctx.user.id);

    await ctx.models.Expense.deleteOne({ _id: id });

    return expense;
  },
};
