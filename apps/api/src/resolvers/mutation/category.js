export default {
  addCategory: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const categoryExists = await ctx.models.Category.exists({
      name: args.input.name,
      user: ctx.user.id,
    });

    if (categoryExists) {
      throw new Error("There is already a category with the given name.");
    }

    return ctx.models.Category.create({
      name: args.input.name,
      color: args.input.color,
      user: ctx.user.id,
    });
  },
  removeCategory: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const category = await ctx.models.Category.findOne({ _id: args.id });

    if (!category) {
      throw new Error("Category object not found.");
    }

    if (!category.user.equals(ctx.user.id)) {
      throw new Error("Invalid user.");
    }

    await ctx.models.Category.deleteOne({ _id: args.id });

    return category;
  },
};
