"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { addComment } from "@/lib/actions/post.action";
import { CommentType } from "@/type/type";
import { CommentProps, PostCommentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "./Spinner";

import { useToast } from "@/hooks/use-toast";
import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/message";
import RichTextEditor from "../shared/RichTextEditor";

const CommentForm = ({ postId }: { postId: string }) => {
  const form = useForm<CommentProps>({
    resolver: zodResolver(PostCommentSchema),
    defaultValues: {
      text: "",
      postId: postId,
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Omit<CommentType, "id">) => {
    try {
      await addComment(data);
      toast({
        title: SUCCESS_TOAST,
        description: "Comment added",
        variant: "default",
      });

      form.reset();
    } catch (error) {
      toast({
        title: ERROR_TOAST,
        description: "Failed to add comment",
        variant: "destructive",
      });

      throw error;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-10/12 lg:w-9/12"
      >
        <FormField
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add comment</FormLabel>
              <FormControl>
                <RichTextEditor
                  fieldValue={field.value}
                  onChange={field.onChange}
                  placeholder="Write your post."
                  className="h-[50px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2 mt-16 mb-4">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            variant="secondary"
            className="bg-APP_BTN_BLUE hover:bg-blue-700 text-white"
          >
            Comment {form.formState.isSubmitting ? <Spinner /> : null}
          </Button>

          <Button
            disabled={form.formState.isSubmitting}
            type="reset"
            variant="ghost"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
