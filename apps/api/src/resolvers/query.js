export default {
  me: (_, __, ctx) => {
    if (!ctx.user) {
      throw new Error("User could not be found.");
    }

    return ctx.user;
  },
};
