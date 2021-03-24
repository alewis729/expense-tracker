import DataLoader from "dataloader";
import { models, model, Schema } from "mongoose";
import encrypt from "mongoose-encryption";

const incomeSchema = new Schema(
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

incomeSchema.plugin(encrypt, {
  secret: process.env.ENCRYPTION_SECRET,
  encryptedFields: ["name", "description", "currencyCode", "amount"],
});

const Income = models.Income || model("Income", incomeSchema);
export const incomeLoader = new DataLoader(incomeIds =>
  Income.find({ _id: { $in: incomeIds } }).execute()
);
export default Income;
