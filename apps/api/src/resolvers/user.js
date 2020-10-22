export default {
  categories: (obj, __, ctx) => ctx.models.Category.find({ user: obj.id }),
  expenses: (obj, __, ctx) => ctx.models.Expense.find({ user: obj.id }),
};
