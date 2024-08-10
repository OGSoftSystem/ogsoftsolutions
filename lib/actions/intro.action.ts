"use server";

import connectDb from "@/lib/database";
import IntroText from "@/lib/database/model/IntroText.model";
import { IntroTextField, IntroTextSchema } from "@/lib/validation";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleError } from "../utils";

export const createIntroText = async (text: IntroTextField) => {
  const validatedText = IntroTextSchema.safeParse(text);
  if (!validatedText.success) return;

  try {
    await connectDb();

    const newText = await IntroText.create(text);
    revalidatePath("/dashboard/intro-text");
    revalidateTag("intro-text");
    return JSON.parse(JSON.stringify(newText));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const fetchIntroText = async () => {
  try {
    await connectDb();

    const text = await IntroText.find();
    if (!text) throw new Error("No text found.");
    return JSON.parse(JSON.stringify(text));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const findIntroTextById = async (id: string) => {
  try {
    await connectDb();
    const text = await IntroText.findById(id);
    if (!text) throw new Error("No text found.");
    return JSON.parse(JSON.stringify(text));
  } catch (error) {
    throw error;
  }
};

export const updateIntroText = async (id: string, text: IntroTextField) => {
  try {
    await connectDb();

    const updatedText = await IntroText.findByIdAndUpdate(
      id,
      {
        $set: {
          text: text.text,
        },
      },
      { new: true }
    );
    if (updatedText) {
      revalidatePath("/dashboard/intro-text");
      revalidateTag("intro-text");
    }

    return JSON.parse(JSON.stringify(updatedText));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const toggleIntroText = async (textId: string, live: boolean) => {

  try {
    await connectDb();
    await IntroText.findByIdAndUpdate(
      textId,
      {
        $set: {
          live,
        },
      },
      { new: true }
    );
    revalidatePath("/dashboard/intro-text");
    revalidateTag("intro-text");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const deleteIntroText = async (id: string) => {
  try {
    await connectDb();

    await IntroText.findByIdAndDelete(id);

    revalidatePath("/dashboard/intro-text");
    revalidateTag("intro-text");
  } catch (error) {
    return { error: handleError(error) };
  }
};
