"use server";

import connectDb from "@/lib/database";
import { UserType, userSchema } from "@/lib/validation";
import User from "@/lib/database/model/User.model";
import { revalidatePath } from "next/cache";
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
    if (!user) throw new Error("Could not create user.");
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find();
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
    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
