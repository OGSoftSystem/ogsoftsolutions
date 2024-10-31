"use server";

import connectDb from "@/lib/database";
import NewsLetterEmail from "@/lib/database/model/NewsLetter.model";
import { EmailFormFieldType, newsLetterSchema } from "@/lib/validation";
import { revalidatePath, revalidateTag } from "next/cache";
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

export const addEmailAddress = async (
  data: EmailFormFieldType
): Promise<{ success: boolean; isExist: boolean }> => {
  const validatedEmail = newsLetterSchema.safeParse(data);

  if (!validatedEmail.success) return { success: false, isExist: false };

  try {
    await connectDb();
    const exists = await NewsLetterEmail.findOne({
      email: validatedEmail.data.email.toLowerCase(),
    });

    if (exists) {
      return { success: false, isExist: true };
    }

    const newEmail = await NewsLetterEmail.create({
      email: validatedEmail.data.email.toLowerCase(),
      hasAgreed: validatedEmail.data.hasAgreed,
    });

    if (newEmail) {
      revalidatePath("/dashboard/emails");
      revalidateTag("news-letter");
    }

    return { success: true, isExist: false };
  } catch (error) {
    return { success: false, isExist: false };
  }
};

export const fetchNewLettersEmails = async () => {
  try {
    await connectDb();
    const letter = await NewsLetterEmail.find();
    if (!letter) throw new Error("No news letter found.");
    return JSON.parse(JSON.stringify(letter));
  } catch (error) {
    return { error: handleError(error) };
  }
};
