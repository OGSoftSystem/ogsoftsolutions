"use server";

import connectDb from "@/lib/database";
import client from "@/lib/database/model/Client.model";
import { ClientField, AddClientSchema } from "@/lib/validation";
import { ClientType } from "@/type/type";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleError } from "../utils";

export const addClient = async (data: ClientField) => {
  const parsedData = AddClientSchema.safeParse(data);
  if (!parsedData.success) return;
  try {
    await connectDb();
    await client.create({ ...data });
    revalidatePath("/dashboard/client");
    revalidateTag("client-review");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
export const fetchClients = async () => {
  try {
    await connectDb();
    const clients = await client.find();
    return JSON.parse(JSON.stringify(clients));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const findClient = async (id: string) => {
  try {
    await connectDb();
    const singleClient = await client.findById(id);
    return JSON.parse(JSON.stringify(singleClient));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const updateClient = async (data: Omit<ClientType, "live">) => {
  try {
    await connectDb();
    await client.findByIdAndUpdate(
      { _id: data._id },
      {
        $set: {
          logo: data.logo,
          info: data.info,
          remark: data.remark,
        },
      },
      { new: true }
    );
    revalidatePath("/dashboard/client");
    revalidateTag("client-review");
  } catch (error) {
    throw error;
  }
};

export const toggleClient = async (clientId: string, live: boolean) => {
  try {
    await connectDb();
    await client.findByIdAndUpdate(
      clientId,
      {
        $set: {
          live,
        },
      },
      { new: true }
    );
    revalidatePath("/dashboard/client");
    revalidateTag("client-review");
  } catch (error) {
    throw error;
  }
};

export const deleteClient = async (id: string) => {
  try {
    await connectDb();
    await client.findByIdAndDelete(id);
    revalidatePath("/dashboard/client");
    revalidateTag("client-review");
  } catch (error) {
    throw error;
  }
};
