import { Schema, models, model, Model, Document } from "mongoose";

interface IEmail extends Document {
  email: string;
  hasAgreed: boolean;
}
const newsLetterSchema = new Schema<IEmail>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    hasAgreed: { type: Boolean, required: true, default: false },
  },

  { timestamps: true }
);

const NewsLetterEmail =
  models.NewsLetterEmail || model("NewsLetterEmail", newsLetterSchema);

export default NewsLetterEmail as Model<IEmail>;
