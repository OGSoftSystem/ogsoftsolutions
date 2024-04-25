"use server";

import connectDb from "@/lib/database";
import NewsLetterEmail from "@/lib/database/model/NewsLetter.model";
import { EmailFormFieldType, newsLetterSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";

// type Success = {
//   success: boolean,
//   data: object;
// }
// type Failure = {
//   success: false,
//   message: string;
// }
// type ExpectedReturn = Success | Failure;

export const addEmailAddress = async (email: EmailFormFieldType) => {
  const validatedEmail = newsLetterSchema.safeParse(email);
  if (!validatedEmail.success) return new Error("Email already exists");
  try {
    await connectDb();
    const exists = await NewsLetterEmail.findOne({
      email: validatedEmail.data,
    });

    if (exists) {
      throw new Error("Email already exits");
    }

    await NewsLetterEmail.create({ email: validatedEmail.data });
    revalidatePath("/");
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const fetchNewLetters = async () => {
  try {
    await connectDb();
    const letter = await NewsLetterEmail.find();
    if (!letter) throw new Error("No news letter found.");
    return JSON.parse(JSON.stringify(letter));
  } catch (error) {
    return { error: handleError(error) };
  }
};
