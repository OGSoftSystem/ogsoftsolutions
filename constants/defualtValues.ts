import { boolean } from "zod";

export const clientInitialValues = {
  logo: "",
  info: "",
  remark: "",
};

export const teamInitialValues = {
  photo: "",
  fullName: "",
  position: "",
  detail: "",
  // live: boolean,
};

export const postInitialValues = {
  photo: "",
  title: "",
  subTitle: "",
  category: "general",
  author: "",
  body: "",
};

export type FormType = "Create" | "Update";

export const initialPublication = {
  title: "",
  imageUrl: "",
  detail: "",
};
