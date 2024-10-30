"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "easymde/dist/easymde.min.css";
import { createIntroText, updateIntroText } from "@/lib/actions/intro.action";

import { IntroTextField, IntroTextSchema } from "@/lib/validation";
import Spinner from "@/components/atom/Spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IntoTextSchemaType } from "@/type/type";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/message";

type FormType = {
  type: "Create" | "Update";
  introText?: IntoTextSchemaType;
};

const IntroForm = ({ type, introText }: FormType) => {
  const form = useForm<IntroTextField>({
    resolver: zodResolver(IntroTextSchema),
    defaultValues: introText
      ? { ...introText, text: introText.text }
      : { text: "" },
  });
  const router = useRouter();
  const { toast } = useToast();
  /**
   * Function to create introduction text
   * @param text string
   */
  const onSubmit = async (text: IntroTextField) => {
    try {
      if (type === "Create") {
        const newText = await createIntroText(text);
        if (newText) {
          toast({
            title: SUCCESS_TOAST,
            description: "Created text successfully",
            variant: "default",
          });
          router.replace("/dashboard/intro-text");
        } else {
          toast({
            title: ERROR_TOAST,
            description: "Error creating text",
            variant: "destructive",
          });
          return;
        }
      }

      if (type === "Update") {
        console.log("Calling update");

        let updatedText;

        if (introText) {
          updatedText = await updateIntroText(introText._id, text);
          console.log(updatedText);
        }
        if (updatedText) {
          toast({
            title: SUCCESS_TOAST,
            description: "updated text successfully",
            variant: "default",
          });
          router.push("/dashboard/intro-text");
        }
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="w-full h-18 md:w-5/12 lg:w-9/12 p-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card className="flex flex-col space-y-2">
            <CardHeader>
              <CardTitle>Add Introduction Text</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                name="text"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={10}
                          {...field}
                          placeholder="Enter an introduction text."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>

            <CardFooter>
              <div className="flex space-x-2 rounded-md">
                <Button type="submit" variant="default">
                  {type === "Create" ? "Create" : "Update"}{" "}
                  {form.formState.isSubmitting ? <Spinner /> : null}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default IntroForm;
