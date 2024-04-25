"use server";

import connectDb from "@/lib/database";
import Post from "@/lib/database/model/Post.model";
import {
  CommentProps,
  PostCommentSchema,
  PostProps,
  PostSchema,
} from "@/lib/validation";
import { PostType } from "@/type/type";
import { revalidatePath } from "next/cache";
import Comment from "../database/model/Comment.model";
import mongoose from "mongoose";
import { handleError } from "../utils";

type Prop = Omit<PostType, "date" | "likes" | "disLikes" | "comments">;

export const createPost = async (data: PostProps): Promise<PostType | any> => {
  const parsedData = PostSchema.safeParse(data);

  if (!parsedData.success) return;
  try {
    await connectDb();

    const post = await Post.create(parsedData.data);
    revalidatePath("/blog");
    return {
      id: post._id.toString(),
      author: post.author,
      photo: post.photo,
      title: post.title,
      subTitle: post.subTitle,
      body: post.body,
      date: post.date,
      likes: post.likes,
      disLikes: post.disLikes,
      category: post.category,
      comments: post.comments,
    };
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const fetchPosts = async () => {
  try {
    await connectDb();
    const posts = await Post.find();
    if (!posts) throw new Error("No post found.");
    revalidatePath("/blog");
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const findPostById = async (id: string): Promise<any> => {
  try {
    await connectDb();
    if (!mongoose.Types.ObjectId.isValid(id))
      return new Error(`Post with ${id} does not exist`);

    const post = await Post.findOne({ _id: id });

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const updatePost = async (data: Prop) => {
  try {
    await connectDb();
    await Post.findByIdAndUpdate(
      { _id: data._id },
      {
        $set: {
          photo: data.photo,
          title: data.title,
          subTitle: data.subTitle,
          body: data.body,
          category: data.category,
        },
      },
      { new: true }
    );
    revalidatePath("/blog");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const deletePost = async (id: string) => {
  try {
    await connectDb();

    // Retrieve comments associated with the post
    const comments = await Comment.find({ postId: id });

    // Remove comments associated with the post from the Comment collection
    await Comment.deleteMany({ postId: id });

    // Update the post by pulling the comments
    await Post.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          comments: { $in: comments.map((comment) => comment._id) },
        },
      },
      { new: true }
    );

    // Delete the post itself
    await Post.findByIdAndDelete(id);

    revalidatePath("/blog");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const addComment = async (data: CommentProps) => {
  // get the comment text and record post id

  try {
    await connectDb();

    const parsedData = PostCommentSchema.safeParse(data);
    if (!parsedData.success) return;

    //  Create a new comment
    const comment = await Comment.create({
      text: data.text,
      postId: data.postId,
    });

    //  Find the post by Id and push and update to the comment
    await Post.findByIdAndUpdate(
      { _id: data.postId },
      {
        $push: {
          comments: comment,
        },
      },
      { new: true }
    );
    revalidatePath(`/blog/post/${data.postId}`);
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};


export const getRelatedPosts = async (author: string) => {
  try {
    await connectDb();

    const relatedPost = await Post.find({
      $and: [{ author }],
    })
      .sort({ timeStamp: "desc" })
      .select("title");

    return JSON.parse(JSON.stringify(relatedPost));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
