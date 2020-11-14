exports.checkSameUser = (object, ctx) => {
  if (!object.user.equals(ctx.user.id)) {
    throw new Error("Invalid user");
  }
};
