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
  location: "",
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
export const initialCareerPublication = {
  title: "",
  imageUrl: "",
  detail: "",
  link: "",
};
