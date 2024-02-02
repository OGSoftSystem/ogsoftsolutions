import { PostType } from "@/type/type";
import { type ClassValue, clsx } from "clsx";
import { cache } from "react";
import { twMerge } from "tailwind-merge";
import { findPostById } from "./actions/post.action";
import { findTeamMember } from "./actions/issue.action";
import { findClient } from "./actions/client.action";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function sliceText(text: string, endValue: number): string {
  if (text.length > endValue) {
    return text.slice(0, endValue) + "...";
  } else {
    return text;
  }
}

