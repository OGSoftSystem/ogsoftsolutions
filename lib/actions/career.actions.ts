"use server";

import { revalidatePath } from "next/cache";
import connectDb from "../database";
import Career from "../database/model/Career.model";
import { handleError } from "../utils";
import { CareerType } from "../validation";

export const createCareer = async (data: CareerType, path: string) => {
  try {
    await connectDb();
    const newCareer = await Career.create(data);
    if (!newCareer) throw new Error("Could not create career.");
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newCareer));
  } catch (error) {
    return { error: handleError(error) };
  }
};
