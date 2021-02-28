import { map } from "lodash";
import { getTimeline, getPaymentsPerYear } from "../utils";

const getData = async ctx => {
  const expenses = await ctx.models.Expense.find({ user: ctx.user.id })
    .sort({ date: 1 })
    .populate("category", ["name"]);
  const incomes = await ctx.models.Income.find({ user: ctx.user.id })
    .sort({ date: 1 })
    .populate("category", ["name"]);
  const dates = [
    ...map(expenses, ({ date }) => date),
    ...map(incomes, ({ date }) => date),
  ];

  return { expenses, incomes, dates };
};

export default {
  expensesPerYear: async (_, __, ctx) => {
    const { expenses, dates } = await getData(ctx);
    const timeline = getTimeline(dates);

    return getPaymentsPerYear({ payments: expenses, timeline });
  },
  incomesPerYear: async (_, __, ctx) => {
    const { incomes, dates } = await getData(ctx);
    const timeline = getTimeline(dates);

    return getPaymentsPerYear({ payments: incomes, timeline });
  },
};
