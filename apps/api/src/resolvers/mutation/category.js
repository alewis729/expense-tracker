import { compareUserIds } from "../../utils";

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
  updateCategory: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const category = await ctx.models.Category.findOne({ _id: args.id });

    if (!category) {
      throw new Error("Category not found.");
    }

    compareUserIds(category.user, ctx.user.id);

    await ctx.models.Category.updateOne({ _id: category.id }, args.input);

    return ctx.models.Category.findOne({ _id: category.id });
  },
  removeCategory: async (_, { id }, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    const category = await ctx.models.Category.findOne({ _id: id });

    if (!category) {
      throw new Error("Category not found.");
    }

    compareUserIds(category.user, ctx.user.id);

    await ctx.models.Category.deleteOne({ _id: id });

    return category;
  },
};
