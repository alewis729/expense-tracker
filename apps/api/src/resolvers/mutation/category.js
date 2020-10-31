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

  updateCategory: async (_, args, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    // There is an issue. Error is not thrown when Category is not found.
    return ctx.models.Category.findOneAndUpdate(
      { _id: args.id },
      args.input,
      { new: true, useFindAndModify: false },
      (err, doc) => {
        if (err) {
          throw new Error("Category not found.");
        }

        return doc;
      }
    );
    // let categoryexists = ctx.models.Category.findOne({ _id: args.id });

    // if (!categoryexists) {
    //   throw new error("category not found.");
    // }

    // categoryexists = {
    //   ...args.input
    // }

    // categoryexists.save();
  },

  removeCategory: async (_, { id }, ctx) => {
    if (!ctx.user) {
      throw new Error("User not found.");
    }

    return ctx.models.Category.findOneAndDelete({ _id: id });
  },
};
