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

    if (!category.user.equals(ctx.user.id)) {
      throw new Error("Invalid User.");
    }

    return ctx.models.Expense.create({
      name: args.input.name,
      description: args.input.description,
      amount: args.input.amount,
      date: args.input.date,
      category: args.input.categoryId,
      user: ctx.user.id,
    });
  },
};
