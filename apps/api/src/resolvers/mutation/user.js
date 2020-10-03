import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  register: async (_, args, ctx) => {
    const password = await bcrypt.hash(args.input.password, 10);
    const userExists = await ctx.models.User.exists({
      email: args.input.email,
    });

    if (userExists) {
      throw new Error("This user is already registered.");
    }

    const user = await ctx.models.User.create({
      name: args.input.name,
      email: args.input.email,
      password,
      resetToken: null,
      resetTokenExpiry: null,
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return { token, me: user };
  },
};
