import { isEmpty, map } from "lodash";
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
  const timeline = getTimeline(dates);

  return { expenses, incomes, timeline };
};

export default {
  expenses: async (_, __, ctx) => {
    const { expenses, timeline } = await getData(ctx);

    return isEmpty(timeline)
      ? []
      : getPayments({ payments: expenses, timeline });
  },
  incomes: async (_, __, ctx) => {
    const { incomes, timeline } = await getData(ctx);

    return isEmpty(timeline)
      ? []
      : getPayments({ payments: incomes, timeline });
  },
};
