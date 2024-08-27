"use server";

import connectDb from "@/lib/database";
import {
  CareerPublicationProps,
  careerPublicationSchema,
} from "@/lib/validation";
import { CareerPublicationSchemaType } from "@/type/type";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleError } from "../utils";
import Career from "../database/model/Career.model";

export const createCareerPublication = async (data: CareerPublicationProps) => {
  const parsedData = careerPublicationSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Incorrect fields");
  try {
    await connectDb();
    await Career.create(parsedData.data);
    revalidatePath("/dashboard/career-publication");
    revalidateTag("career-publication");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const fetchCareerPublications = async (): Promise<
  CareerPublicationSchemaType | any
> => {
  try {
    await connectDb();
    const publications = await Career.find();
    if (!publications) throw new Error("No publication found.");
    return JSON.parse(JSON.stringify(publications));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const findCareerPublicationById = async (id: string) => {
  try {
    await connectDb();
    const publication = await Career.findById(id);
    if (!publication) throw new Error("No publication found.");
    return JSON.parse(JSON.stringify(publication));
  } catch (error) {
    throw error;
  }
};
export const updateCareerPublication = async (
  pubId: string,
  data: CareerPublicationProps
) => {
  try {
    await connectDb();
    await Career.findByIdAndUpdate(
      pubId,
      {
        $set: {
          title: data.title,
          imageUrl: data.imageUrl,
          detail: data.detail,
        },
      },
      { new: true }
    );
    revalidatePath("/dashboard/career-publication");
    revalidateTag("career-publication");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
export const toggleCareerPublication = async (id: string, live: boolean) => {

  try {
    await connectDb();
    await Career.findByIdAndUpdate(
      id,
      {
        $set: {
          live,
        },
      },
      { new: true }
    );
    revalidatePath("/dashboard/career-publication");
    revalidateTag("career-publication");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const deleteCareerPublication = async (id: string) => {
  try {
    await connectDb();
    await Career.findByIdAndDelete(id);
    revalidatePath("/dashboard/career-publication");
    revalidateTag("career-publication");
  } catch (error) {
    throw error;
  }
};
