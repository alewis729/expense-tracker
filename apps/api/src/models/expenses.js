import DataLoader from "dataloader";
import { models, model, Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
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

const Expense = models.Expense || model("Expense", expenseSchema);
export const expenseLoader = new DataLoader(expenseIds =>
  Expense.find({ _id: { $in: expenseIds } }).execute()
);
export default Expense;
