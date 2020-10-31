export default {
  addExpense: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    return ctx.models.Expense.create({
      name: args.input.name,
      description: args.input.description,
      amount: args.input.amount,
      date: args.input.date,
      user: ctx.user.id,
    });
  },
};
