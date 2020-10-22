export default {
  me: (_, __, ctx) => {
    if (!ctx.user) {
      throw new Error("User could not be found.");
    }

    return ctx.user;
  },
  user: (_, { id }, ctx) => ctx.models.User.findOne({ _id: id }),
  users: (_, __, ctx) => ctx.models.User.find({}),
  category: (_, { id }, ctx) => ctx.models.Category.findOne({ _id: id }),
  categories: (_, __, ctx) =>
    ctx.models.Category.find({ user: ctx.user.id }).sort({ date: -1 }),
  expense: (_, { id }, ctx) => ctx.models.Expense.findOne({ _id: id }),
  expenses: (_, __, ctx) =>
    ctx.models.Expense.find({ user: ctx.user.id }).sort({ date: -1 }),
};
