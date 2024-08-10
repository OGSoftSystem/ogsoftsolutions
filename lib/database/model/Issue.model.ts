import { Schema, Document, Model, models, model } from "mongoose";

interface ITIssue extends Document {
  name: string;
  email: string;
  issue: string;
  detail: string;
  ongoing: boolean;
}
const issueSchema = new Schema<ITIssue>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "full name is required"],
    },
    issue: {
      type: String,
      required: [true, "position is required"],
    },
    detail: {
      type: String,
      required: [true, "detail is required"],
    },
    ongoing: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Issue = models.Issue || model("Issue", issueSchema);
export default Issue as Model<ITIssue>;
