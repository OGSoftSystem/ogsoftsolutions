import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import parse from "html-react-parser";
import { ERROR_TOAST } from "@/constants/message";

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

export const handleError = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = `${ERROR_TOAST}, please try again`;
  }

  return message;
};

export const cleanText = (text: string) => {
  return text ? parse(text) : "";
};
