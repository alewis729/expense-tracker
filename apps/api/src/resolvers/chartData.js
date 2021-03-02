import { map } from "lodash";
import { getTimeline, getPayments } from "../utils";

const getData = async ctx => {
  const expenses = await ctx.models.Expense.find({ user: ctx.user.id })
    .sort({ date: 1 })
    .populate("category", ["name", "color"]);
  const incomes = await ctx.models.Income.find({ user: ctx.user.id })
    .sort({ date: 1 })
    .populate("category", ["name", "color"]);
  const dates = [
    ...map(expenses, ({ date }) => date),
    ...map(incomes, ({ date }) => date),
  ];

  return { expenses, incomes, dates };
};

export default {
  expenses: async (_, __, ctx) => {
    const { expenses, dates } = await getData(ctx);
    const timeline = getTimeline(dates);

    return getPayments({ payments: expenses, timeline });
  },
  incomes: async (_, __, ctx) => {
    const { incomes, dates } = await getData(ctx);
    const timeline = getTimeline(dates);

    return getPayments({ payments: incomes, timeline });
  },
};
