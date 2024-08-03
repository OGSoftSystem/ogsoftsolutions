import { Schema, Document, Model, models, model } from "mongoose";

export interface IPub extends Document {
  imageUrl: string;
  title: string;
  detail: string;
  live: boolean;
}
const PublicationSchema = new Schema<IPub>(
  {
    imageUrl: { type: String },

    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
    },

    detail: {
      type: String,
      required: [true, "detail is required"],
    },
    live: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Publication =
  models.Publication || model("Publication", PublicationSchema);
export default Publication as Model<IPub>;
