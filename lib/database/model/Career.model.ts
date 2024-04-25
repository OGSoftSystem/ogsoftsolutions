import { Schema, Document, Model, models, model } from "mongoose";

interface ICareer extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
const careerSchema = new Schema<ICareer>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "info is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Career = models?.Career || model("Career", careerSchema);
export default Career as Model<ICareer>;
