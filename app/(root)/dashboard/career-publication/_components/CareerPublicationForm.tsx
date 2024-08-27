"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputField from "@/components/atom/InputField";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import {
  CareerPublicationProps,
  careerPublicationSchema,
  PublicationProps,
  publicationSchema,
} from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  FormType,
  initialCareerPublication,
} from "@/constants/defualtValues";

import Spinner from "@/components/atom/Spinner";

import { CareerPublicationSchemaType } from "@/type/type";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { createCareerPublication, deleteCareerPublication, updateCareerPublication } from "@/lib/actions/career.actions";

type Props = {
  type: FormType;
  publication?: CareerPublicationSchemaType;
};

const CareerPublicationForm = ({ type, publication }: Props) => {
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<CareerPublicationProps>({
    resolver: zodResolver(careerPublicationSchema),
    defaultValues: publication
      ? {
          ...publication,
          title: publication.title,
          imageUrl: publication.imageUrl,
          detail: publication.detail,
          link: publication.link,
        }
      : initialCareerPublication,
  });

  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

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

  const onSubmit = async (data: CareerPublicationProps) => {
    if (type === "Create") {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        data.imageUrl = imgRes[0].url;

        try {
          await createCareerPublication({
            title: data.title,
            imageUrl: data.imageUrl,
            detail: data.detail,
            link: data.link,
          });

          toast.success("Publication added successfully");
          router.push("/");
        } catch (error) {
          toast.error("Failed to add publication");
          throw error;
        }
      }
    }

    if (type === "Update") {
      const blob = data.imageUrl;

      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          data.imageUrl = imgRes[0].url;
        }
      }

      await updateCareerPublication(publication?._id as string, {
        title: data.title,
        imageUrl: data.imageUrl,
        detail: data.detail,
        link: data.link,
      });

      toast.success("Career Publication updated");
      router.push("/");
    }
    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <Card className="flex flex-col space-y-2">
          <CardHeader>
            <CardTitle className="py-2">{type} Career Publication</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-2">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="photo"
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
                      placeholder="Add team photo"
                      className="account-form_image-input"
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
              placeholder="Enter title"
              type="text"
            />

            <FormField
              name="detail"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="p-tex text-muted-foreground">
                    Detail
                  </FormLabel>
                  <FormControl>
                    <div className="h-[300px]">
                      <RichTextEditor
                        fieldValue={field.value}
                        onChange={field.onChange}
                        placeholder="Write your publication."
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="link"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="p-tex text-muted-foreground">
                    Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Write your publication."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
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

export default CareerPublicationForm;
