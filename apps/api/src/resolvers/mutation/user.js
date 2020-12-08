import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateGoogle } from "../../lib/passport";
import { isEmpty } from "lodash";

export default {
  register: async (_, args, ctx) => {
    if (isEmpty(args.input.password)) {
      throw new Error("Password was not provided.");
    }
    const password = await bcrypt.hash(args.input.password, 10);
    const userExists = await ctx.models.User.exists({
      email: args.input.email,
    });

    if (userExists) {
      throw new Error(
        "There is already a registered user with the given email."
      );
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
  login: async (_, args, ctx) => {
    const user = await ctx.models.User.findOne({ email: args.input.email });

    if (!user) {
      throw new Error("The user with the provided email is not registered.");
    }

    if (isEmpty(args.input.password)) {
      throw new Error("Password was not provided.");
    }

    if (isEmpty(user.password)) {
      throw new Error("Account was created with google authentication.");
    }

    const passwordMatch = await bcrypt.compare(
      args.input.password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("The password entered is incorrect.");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return { token, me: user };
  },
  authGoogle: async (_, args, ctx) => {
    ctx.req.body = {
      ...ctx.req.body,
      access_token: args.input.accessToken,
    };

    try {
      const { data, info } = await authenticateGoogle(ctx.req, ctx.res);

      if (data) {
        let user = await ctx.models.User.findOne({
          "social.googleProvider.id": data.profile.id,
        });

        if (!user) {
          user = await ctx.models.User.create({
            name:
              data.profile.displayName ||
              `${data.profile.familyName} ${data.profile.givenName}`,
            email: data.profile.emails[0].value,
            "social.googleProvider": {
              id: data.profile.id,
              token: args.input.accessToken,
            },
          });
        }

        if (user) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
          return {
            token: token,
            me: user,
          };
        }
      }

      if (info) {
        switch (info.code) {
          case "ETIMEDOUT":
            throw new Error("Failed to reach Google: Try Again.");
          default:
            throw new Error("Something went wrong.");
        }
      }
      throw new Error("Server error.");
    } catch (error) {
      return error;
    }
  },
};
