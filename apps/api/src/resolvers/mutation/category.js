export default {
  addCategory: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    return ctx.models.Category.create({
      name: args.input.name,
      color: args.input.color,
      user: ctx.user.id,
    });
  },
};
