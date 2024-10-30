"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import InputField from "@/components/atom/InputField";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { PostProps, PostSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";

import Spinner from "@/components/atom/Spinner";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/lib/actions/post.action";
import { FormType, postInitialValues } from "@/constants/defualtValues";
import { PostType } from "@/type/type";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/message";

type PostFormProps = {
  type: FormType;
  post?: PostType;
};
const PostForm = ({ type, post }: PostFormProps) => {
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<PostProps>({
    resolver: zodResolver(PostSchema),
    defaultValues: post ? { ...post } : postInitialValues,
  });

  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PostProps) => {
    if (type === "Create") {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        data.photo = imgRes[0].url;

        try {
          await createPost({
            photo: data.photo,
            author: data.author,
            title: data.title,
            subTitle: data.subTitle,
            category: data.category,
            body: data.body,
          });

          toast({
            title: SUCCESS_TOAST,
            description: "Post added successfully",
            variant: "default",
          });

          router.push("/blog");
        } catch (error) {
          toast({
            title: ERROR_TOAST,
            description: "Failed to add post",
            variant: "destructive",
          });
          throw error;
        }
      }
    }

    if (type === "Update") {
      const blob = data.photo;

      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          data.photo = imgRes[0].url;
        }
      }

      try {
        await updatePost({
          _id: post?._id as string,
          photo: data.photo,
          title: data.title,
          subTitle: data.subTitle,
          category: data.category,
          author: data.author,
          body: data.body,
        });

        toast({
          title: SUCCESS_TOAST,
          description: "Post updated",
          variant: "default",
        });
        router.push("/blog");
      } catch (error) {
        throw error;
      }
    }
    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-10/12"
      >
        <Card className="flex flex-col space-y-2">
          <CardHeader>
            <CardTitle className="py-2">{type} Post</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-2">
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="team_photo"
                        width={40}
                        height={40}
                        priority
                        className="rounded-full object-contain"
                      />
                    ) : (
                      <Image
                        src="/logo.png"
                        alt="profile_icon"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    )}
                  </FormLabel>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Add post cover"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <InputField
              name="title"
              label="Title"
              control={form.control}
              placeholder="Enter post title"
              type="text"
            />

            <InputField
              name="subTitle"
              label="Sub title"
              control={form.control}
              placeholder="Enter post subtitle"
              type="text"
            />
            <InputField
              name="author"
              label="Author"
              control={form.control}
              placeholder="Enter name of author"
              type="text"
            />

            <Controller
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <div className="w-full flex space-x-2">
                    <p className="text-muted-foreground p-text">Category</p>
                    <select
                      onChange={field.onChange}
                      className="border-none w-[100px] text-sm text-white bg-blue-800 rounded-full px-2"
                    >
                      <option value="general">General</option>
                      <option value="tech">Tech</option>
                      <option value="business">Business</option>
                      <option value="health">Health</option>
                    </select>
                  </div>
                );
              }}
            />

            <FormField
              name="body"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="p-text text-muted-foreground">
                    Body
                  </FormLabel>
                  <FormControl>
                    <div className="h-[300px]">
                      <RichTextEditor
                        fieldValue={field.value}
                        onChange={field.onChange}
                        placeholder="Write your post."
                        className="h-[250px]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              variant="secondary"
              className="bg-APP_BTN_BLUE hover:bg-blue-700 text-white"
            >
              {type} {form.formState.isSubmitting ? <Spinner /> : null}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default PostForm;
