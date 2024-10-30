"use client";

import InputField from "@/components/atom/InputField";
import Spinner from "@/components/atom/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { sendEmailToContact } from "@/lib/actions/contact.actions";
import { ContactFormSchema, ContactFormSchemaProps } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/message";

const ContactForm = () => {
  const initialValue = {
    name: "",
    email: "",
    phone: "",
    title: "",
    message: "",
  };

  const form = useForm<ContactFormSchemaProps>({
    defaultValues: initialValue,
    resolver: zodResolver(ContactFormSchema),
  });

  const { toast } = useToast();

  const onSubmitForm = async (data: ContactFormSchemaProps) => {
    try {
      const success = await sendEmailToContact(data);
      if (!success) {
        toast({
          title: ERROR_TOAST,
          description: "Could send message. Try again shortly. Thanks",
          variant: "destructive",
        });
      }
      toast({
        title: SUCCESS_TOAST,
        description: "Message sent. We will reach you shortly. Thanks",
        variant: "default",
      });
    } catch (error) {
      throw error;
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
        <InputField
          control={form.control}
          label="Full name"
          name="name"
          placeholder="Enter full name"
          type="text"
        />

        <InputField
          control={form.control}
          label="Email"
          name="email"
          placeholder="Enter email address"
          type="email"
        />

        <InputField
          control={form.control}
          label="Phone"
          name="phone"
          placeholder="Enter phone number"
          type="text"
        />
        <InputField
          control={form.control}
          label="Title"
          name="title"
          placeholder="Enter title"
          type="text"
        />

        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel className="text-muted-foreground">
                  Message
                  <Textarea placeholder="Message" rows={8} {...field} />
                </FormLabel>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-APP_BTN_BLUE text-white">
          {form.formState.isSubmitting ? <Spinner /> : "Send"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
