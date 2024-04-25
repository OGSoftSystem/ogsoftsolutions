"use server";

import Comment from "../database/model/Comment.model";
import { revalidatePath } from "next/cache";
import connectDb from "../database";
import { handleError } from "../utils";

export const findCommentById = async (id: string) => {
  try {
    await connectDb();

    const foundComment = await Comment.findOne({ _id: id });
    if (!foundComment) throw new Error("Comment not found.");
    return JSON.parse(JSON.stringify(foundComment));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const findCommentsByPostId = async (postId: string) => {
  try {
    await connectDb();

    const comments = (await Comment.find().sort({ createdAt: "desc" })).filter(
      (comment) =>
        comment ? comment.postId.toString() === postId.toString() : null
    );

    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const findComments = async () => {
  try {
    await connectDb();

    return await Comment.find({});
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const deleteComment = async (id: string) => {
  try {
    await connectDb();

    await Comment.findByIdAndDelete(id);
    revalidatePath(`/blog/post/`);
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
