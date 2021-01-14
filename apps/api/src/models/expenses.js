import DataLoader from "dataloader";
import { models, model, Schema } from "mongoose";
import encrypt from "mongoose-encryption";

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currencyCode: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

expenseSchema.plugin(encrypt, {
  secret: process.env.ENCRYPTION_SECRET,
  encryptedFields: ["name", "description", "currencyCode", "amount"],
});

const Expense = models.Expense || model("Expense", expenseSchema);
export const expenseLoader = new DataLoader(expenseIds =>
  Expense.find({ _id: { $in: expenseIds } }).execute()
);
export default Expense;
