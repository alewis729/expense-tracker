import { isEmpty, map } from "lodash";
import { compareUserIds, getTimeline, filterPayments } from "../utils";

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
  filterExpenses: async (_, args, ctx) => {
    const expenses = await ctx.models.Expense.find({
      user: ctx.user.id,
    })
      .sort({ date: -1 })
      .populate("category", ["name"]);

    return filterPayments(expenses, args.input);
  },
  income: async (_, { id }, ctx) => {
    const income = await ctx.models.Income.findOne({ _id: id });

    compareUserIds(income.user, ctx.user.id);

    return income;
  },
  incomes: (_, __, ctx) => ctx.models.Income.find({ user: ctx.user.id }),
  filterIncomes: async (_, args, ctx) => {
    const incomes = await ctx.models.Income.find({
      user: ctx.user.id,
    })
      .sort({ date: -1 })
      .populate("category", ["name"]);

    return filterPayments(incomes, args.input);
  },
  chartData: async (_, __, ctx) => {
    const user = ctx.user.id;
    const expenses = await ctx.models.Expense.find({ user }).sort({ date: -1 });
    const incomes = await ctx.models.Income.find({ user }).sort({ date: -1 });
    const dates = [
      ...map(expenses, ({ date }) => date),
      ...map(incomes, ({ date }) => date),
    ];
    const timeline = getTimeline(dates);
    let defaultCurrency = "USD";

    if (!isEmpty(expenses)) {
      defaultCurrency = expenses[expenses.length - 1].currencyCode;
    } else if (!isEmpty(incomes)) {
      defaultCurrency = incomes[incomes.length - 1].currencyCode;
    }

    return {
      timeline,
      defaultCurrency,
      hasExpenses: !isEmpty(expenses),
      hasIncome: !isEmpty(incomes),
    };
  },
};
