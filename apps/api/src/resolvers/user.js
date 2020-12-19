export default {
  categories: (obj, __, ctx) =>
    ctx.models.Category.find({ user: obj.id }).sort({ date: -1 }),
  expenses: (obj, __, ctx) =>
    ctx.models.Expense.find({ user: obj.id }).sort({ date: -1 }),
};
