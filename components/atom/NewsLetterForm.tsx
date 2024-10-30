"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { newsLetterSchema, EmailFormFieldType } from "@/lib/validation";
import { addEmailAddress } from "@/lib/actions/news-letter.action";

import { MotionForm } from "./Motion";
import Link from "next/link";
import { Metadata } from "next";
import CustomButton from "../shared/CustomButton";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/message";

export const metadata: Metadata = {
  title: "Privacy Policy",
};
const NewsLetterForm = () => {
  const form = useForm<EmailFormFieldType>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: { email: "", hasAgreed: false },
  });

  const { toast } = useToast();
  const onSubmit = async (data: EmailFormFieldType) => {
    if (!data.hasAgreed && !data.email) return;

    try {
      const success = await addEmailAddress(data);
      if (success) {
        toast({
          title: SUCCESS_TOAST,
          description: "Sign up successful",
          variant: "default",
        });
        form.reset();
      } else {
        toast({
          title: ERROR_TOAST,
          description: "Sign up unsuccessful",
          variant: "destructive",
        });
      }
    } catch (e) {
      throw e;
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <Form {...form}>
        <MotionForm
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center space-y-3 justify-center"
          animate={{
            y: [200, 0],
          }}
          transition={{ duration: 0.3, ease: "easeIn" }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center justify-center ">
                <FormControl>
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="youremail@email.com"
                    className="w-full p-4 py-5 focus:border-blue-500/50 md:w-[400px] border-[1px] border-zinc-300 bg-white shadow-md hover:bg-gray-100 cursor-pointer dark:bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasAgreed"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center justify-center ">
                <FormControl>
                  <div className="flex space-x-2 items-center">
                    <Checkbox
                      disabled={form.formState.isSubmitting}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <p className="p-text">I agree to be emailed</p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link
            href={"/privacy"}
            className="text-center w-full mt-4 hover:text-APP_BTN_BLUE hover:underline p-text"
          >
            Privacy policy
          </Link>
          <CustomButton
            submitting={form.formState.isSubmitting}
            showSpinner={true}
            title="Subscribe"
            variant="shine"
          />
        </MotionForm>
      </Form>
    </div>
  );
};

export default NewsLetterForm;
