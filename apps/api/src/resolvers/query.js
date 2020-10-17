export default {
  me: (_, __, ctx) => {
    if (!ctx.user) {
      throw new Error("User could not be found.");
    }

    return ctx.user;
  },
  category: (_, { id }, ctx) => ctx.models.Category.findOne({ _id: id }),
  categories: (_, __, ctx) => ctx.models.Category.find({}),
};
