"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IssueType, issueSchema } from "@/lib/validation";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import Spinner from "./Spinner";
import InputField from "./InputField";
import { Textarea } from "../ui/textarea";
import { createIssue } from "@/lib/actions/issue.action";
import { useRouter } from "next/navigation";
import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/message";
import { useToast } from "@/hooks/use-toast";

const JiraForm = () => {

  const router = useRouter();
  const form = useForm<IssueType>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      name: "",
      email: "",
      issue: "",
      detail: "",
    },
  });
  const { toast } = useToast();
  const submitForm = async (data: IssueType) => {
    try {
      await createIssue(data);
      toast({
        title: SUCCESS_TOAST,
        description: "Issue raised successful",
        variant: "default",
      });
      router.push("/");

      form.reset();
    } catch (error) {
      toast({
        title: ERROR_TOAST,
        description: "Failed to raise issue",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="w-full md:w-[350px] lg:w-[400px]"
        >
          <Card>
            <CardHeader>
              <CardTitle>Issue Form</CardTitle>
              <CardDescription className="text-muted-foreground">
                Create a JIRA ticket.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid w-full items-center gap-2">
                <InputField
                  name="name"
                  type="text"
                  control={form.control}
                  label="Name"
                  placeholder="full name"
                />
                <InputField
                  name="email"
                  type="email"
                  control={form.control}
                  label="Email"
                  placeholder="Email"
                />
                <InputField
                  name="issue"
                  type="text"
                  control={form.control}
                  label="Issue"
                  placeholder="Enter issue title"
                />

                <FormField
                  name="detail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        Detail
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-APP_BTN_BLUE text-white"
              >
                Submit {form.formState.isSubmitting && <Spinner />}
              </Button>
              <Button
                disabled={form.formState.isSubmitting}
                type="reset"
                onClick={() => form.reset()}
                variant="ghost"
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default JiraForm;
