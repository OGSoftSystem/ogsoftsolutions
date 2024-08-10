import { StaticImageData } from "next/image";

export interface MissionProps {
  imgPath: StaticImageData | string;
  title: string;
  desc: string;
}
export interface ServiceProps extends MissionProps {
  className?: string;
}

export type ReviewProps = {
  logo: StaticImageData | string;
  info: string;
  remark: string;
};

export type QA = {
  question: string;
  answer: string;
};

export type CountryProps = {
  id: number;
  wikiDataId: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
};

export type Countries = CountryProps[];

export type TeamMemberProps = {
  _id: string;
  photo: string;
  fullName: string;
  position: string;
  detail: string;
  live: boolean;
};

export type ClientType = {
  _id: string;
  logo: string;
  info: string;
  remark: string;
  hasLogo?: boolean;
  live: boolean;
};

export type PostType = {
  _id: string;
  author: string;
  photo: string;
  title: string;
  subTitle: string;
  body: string;
  date: string;
  likes: number;
  disLikes: number;
  category: string;
  comments: any[];
  live: boolean;
};

// EMAIL
export interface IMailOption {
  // Email schema
  from: string;
  // to?: string;
  subject: string;
  text?: string;
  html?: string; // optional parameter
}

export type CommentType = {
  id: string;
  text: string;
  postId: string;
};

export type PublicationSchemaType = {
  _id: string;
  imageUrl: string;
  title: string;
  detail: string;
  live: boolean;
};
export type CustomReviewSchemaType = {
  _id: string;
  logo: string;
  info: string;
  remark: string;
  hasLogo: boolean;
};
export type IntoTextSchemaType = { _id: string; text: string; live: boolean };

export type IssueSchemaType = {
  _id: string;
  name: string;
  email: string;
  issue: string;
  detail: string;
  ongoing: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export type UserSchemaType = {
  _id: string;
  name: string;
  email: string;
  role: string;
};
