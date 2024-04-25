"use client";

import { deleteComment } from "@/lib/actions/comment.action";
import { XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import parse from "html-react-parser";
import { toast } from "react-toastify";

const SingleComment = ({ text, id }: { text: string; id: string }) => {
  const { data: session } = useSession();

  // This checks if the current user can delete comments
  const canDelete =
    session?.user?.role === "super-admin" || session?.user.role === "admin";

  const handleDeleteComment = async (): Promise<void> => {
    try {
      await deleteComment(id);
      toast.success("Comment deleted.");
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="bg-white dark:bg-transparent shadow-sm rounded-md p-4 my-4 w-fit relative">
      <p className="text-sm text-muted-foreground">{parse(text)}</p>

      {canDelete ? (
        <XCircle
          className="text-gray-700 absolute top-0 right-2 w-4 h-4 hover:text-red-500 cursor-pointer"
          onClick={handleDeleteComment}
        />
      ) : null}
    </div>
  );
};

export default SingleComment;
