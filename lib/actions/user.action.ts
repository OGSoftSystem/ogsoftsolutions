"use server";

import connectDb from "@/lib/database";
import { UserType, userSchema } from "@/lib/validation";
import User from "@/lib/database/model/User.model";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleError } from "../utils";
import { isValidObjectId } from "mongoose";

export const createUser = async (data: UserType) => {
  const validatedUser = userSchema.safeParse(data);

  if (!validatedUser.success) {
    throw new Error(`${validatedUser.error?.errors}`);
  }

  try {
    await connectDb();

    const isExist = await User.findOne({ email: data.email });
    if (isExist) throw new Error("Email already exists");

    const user = await User.create(data);
    if (user) {
      revalidatePath("/dashboard/users");
      revalidateTag("users");
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find().select("_id name email role");
    if (!users) throw new Error("No user found.");

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const makeAdmin = async (id: string) => {
  if (!isValidObjectId(id)) throw new Error("Invalid object id");
  try {
    await connectDb();

    const user = await User.findById(id);
    if (!user) throw new Error("No user found.");

    const updatedUser = await User.findOneAndUpdate(
      { _id: id.toString() },
      {
        $set: {
          role: user.role === "user" ? "admin" : "user",
        },
      },
      { new: true }
    );
    if (updatedUser) {
      revalidatePath("/dashboard/users");
      revalidateTag("users");
    }

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const deleteUser = async (id: string) => {
  if (!isValidObjectId(id)) throw new Error("Invalid object id");
  try {
    await connectDb();

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("No user found.");

    revalidatePath("/dashboard/users");
    revalidateTag("users");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
