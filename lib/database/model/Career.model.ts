import { Schema, Document, Model, models, model } from "mongoose";

interface ICareer extends Document {
  imageUrl: string;
  title: string;
  detail: string;
  link: string;
  live: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const careerSchema = new Schema<ICareer>(
  {
    imageUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    detail: {
      type: String,
      required: [true, "detail is required"],
    },
    link: {
      type: String,
    },
    live: {
      type: Boolean,
      default: false,
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
