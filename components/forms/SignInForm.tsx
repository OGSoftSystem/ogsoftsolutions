"use client";

import InputField from "@/components/atom/InputField";
import Spinner from "@/components/atom/Spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { SignInType, userSignInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/message";

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<SignInType>({
    resolver: zodResolver(userSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const onSubmit = async (data: SignInType) => {

    const { email, password } = data;

    try {
      if (!email || !password) throw new Error("Provide your credentials");

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast({
          title: ERROR_TOAST,
          description: res.error,
          variant: "destructive",
        });

        return;
      }

      toast({
        title: SUCCESS_TOAST,
        description: "Signed In.",
        variant: "default",
      });

      form.reset();
      router.replace("/");
    } catch (e) {

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
            control={form.control}
            showIcon={true}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            variant="default"
            className="bg-APP_BTN_BLUE w-full text-white"
          >
            Sign in with credentials{" "}
            {form.formState.isSubmitting && <Spinner />}
          </Button>

          <Link
            className={cn(
              "w-full",
              { "cursor-not-allowed": form.formState.isSubmitting },
              buttonVariants({ variant: "ghost" })
            )}
            href="/auth/sign-up"
          >
            <p
              className={cn("text-zinc-950 dark:text-white", {
                "cursor-not-allowed": form.formState.isSubmitting,
              })}
            >
              Sign up
            </p>
          </Link>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
