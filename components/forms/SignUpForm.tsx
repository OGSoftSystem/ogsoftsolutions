"use client";

import InputField from "@/components/atom/InputField";
import Spinner from "@/components/atom/Spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { userSchema, UserType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { createUser } from "@/lib/actions/user.action";
import { useToast } from "@/hooks/use-toast";
import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/message";

const SignUpForm = () => {
  const router = useRouter();

  const { toast } = useToast();
  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserType) => {
    try {
      const newUser = await createUser(data);

      if (newUser) {
        toast({
          title: SUCCESS_TOAST,
          description: "User successfully created.",
          variant: "default",
        });

        form.reset();
        router.replace("/auth/sign-in");
      }
    } catch (e) {
      toast({
        title: ERROR_TOAST,
        description: "Creating user unsuccessful.",
        variant: "destructive",
      });

      throw e;
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-8/12 md:w-6/12 lg:4/12 flex flex-col items-center gap-3 "
        >
          <InputField
            name="name"
            label="Name"
            placeholder="Enter your name"
            type="text"
            control={form.control}
          />

          <InputField
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="text"
            control={form.control}
          />

          <InputField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            showIcon={true}
            control={form.control}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            variant="default"
            // disable={form.formState.isSubmitting}
            className="bg-APP_BTN_BLUE w-full text-white"
          >
            Sign up with credentials{" "}
            {form.formState.isSubmitting && <Spinner />}
          </Button>

          <Link
            className={cn(
              "w-full",
              { "cursor-not-allowed": form.formState.isSubmitting },
              buttonVariants({ variant: "ghost" })
            )}
            href="/auth/sign-in"
          >
            <p className="text-zinc-950 dark:text-white">Sign in</p>
          </Link>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
