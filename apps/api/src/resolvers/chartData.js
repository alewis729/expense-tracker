import { map, reduce, find, findIndex, isEmpty, round } from "lodash";
import { getTimeline } from "../utils";

export default {
  expensesPerYear: async (_, __, ctx) => {
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
    const timeline = getTimeline(dates);

    return reduce(
      expenses,
      (arr, expense) => {
        const year = expense.date.getFullYear();
        const month = expense.date.getMonth();
        const timelineYear = find(timeline, obj => obj.year === year);
        const months = !isEmpty(timelineYear) ? timelineYear.months : [];
        const amounts = map(months, i => (i === month ? expense.amount : 0));
        const categoryLabel = expense.category.name;
        const existingYear = find(arr, obj => obj.year === year);
        const newExpense = {
          currencyCode: expense.currencyCode,
          categories: [
            { label: "All categories", amounts },
            { label: categoryLabel, amounts },
          ],
        };

        if (!isEmpty(existingYear)) {
          let existingExpense = find(
            existingYear.expenses,
            obj => obj.currencyCode === expense.currencyCode
          );

          if (!isEmpty(existingExpense)) {
            const existingCategory = find(
              existingExpense.categories,
              obj => obj.label === categoryLabel
            );
            const currentMonthIndex = findIndex(months, i => i === month);

            // update 'All categories' amounts
            existingExpense.categories[0].amounts = map(
              existingExpense.categories[0].amounts,
              (amount, i) =>
                i === currentMonthIndex
                  ? round(amount + expense.amount, 2)
                  : amount
            );

            if (!isEmpty(existingCategory)) {
              existingExpense.categories = map(
                existingExpense.categories,
                obj =>
                  obj.label === existingCategory.label
                    ? {
                        ...obj,
                        amounts: map(obj.amounts, (amount, i) =>
                          i === currentMonthIndex
                            ? round(amount + expense.amount, 2)
                            : amount
                        ),
                      }
                    : obj
              );

              return map(arr, obj =>
                obj.year === year
                  ? {
                      ...obj,
                      expenses: map(obj.expenses, exp =>
                        exp.currencyCode === existingExpense.currencyCode
                          ? existingExpense
                          : exp
                      ),
                    }
                  : obj
              );
            }

            // add new category
            existingExpense.categories.push({ label: categoryLabel, amounts });

            return map(arr, obj =>
              obj.year === year
                ? {
                    ...obj,
                    expenses: map(obj.expenses, exp =>
                      exp.currencyCode === existingExpense.currencyCode
                        ? existingExpense
                        : exp
                    ),
                  }
                : obj
            );
          }

          return map(arr, obj =>
            obj.year === year
              ? { ...obj, expenses: [...obj.expenses, newExpense] }
              : obj
          );
        }

        const newYear = {
          year,
          months,
          expenses: [newExpense],
        };

        return [...arr, newYear];
      },
      []
    );
  },
};
