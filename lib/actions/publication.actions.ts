"use server";

import connectDb from "@/lib/database";
import { PublicationProps, publicationSchema } from "@/lib/validation";
import { PublicationSchemaType } from "@/type/type";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleError } from "../utils";
import Publication from "../database/model/publication.model";

export const createPublication = async (data: PublicationProps) => {
  const parsedData = publicationSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Incorrect fields");
  try {
    await connectDb();
    await Publication.create(parsedData.data);
    revalidatePath("/dashboard/publication");
    revalidateTag("publications");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
export const fetchPublications = async (): Promise<
  PublicationSchemaType | any
> => {
  try {
    await connectDb();
    const publications = await Publication.find();
    if (!publications) throw new Error("No publication found.");
    return JSON.parse(JSON.stringify(publications));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const findPublicationById = async (id: string) => {
  try {
    await connectDb();
    const publication = await Publication.findById(id);
    if (!publication) throw new Error("No publication found.");
    return JSON.parse(JSON.stringify(publication));
  } catch (error) {
    throw error;
  }
};
export const updatePublication = async (
  pubId: string,
  data: PublicationProps
) => {
  try {
    await connectDb();
    await Publication.findByIdAndUpdate(
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
    revalidatePath("/dashboard/publication");
    revalidateTag("publications");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
export const togglePublication = async (pubId: string, live: boolean) => {
  try {
    await connectDb();
    await Publication.findByIdAndUpdate(
      pubId,
      {
        $set: {
          live,
        },
      },
      { new: true }
    );
    revalidatePath("/dashboard/publication");
    revalidateTag("publications");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const deletePublication = async (id: string) => {
  try {
    await connectDb();
    await Publication.findByIdAndDelete(id);
    revalidatePath("/dashboard");
    revalidateTag("publications");
  } catch (error) {
    throw error;
  }
};
