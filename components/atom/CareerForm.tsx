"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { CareerType, careerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { createCareer } from "@/lib/actions/career.actions";

type CareerFormProps = {
  type: "Create" | "Update";
  career?: CareerType;
};
const CareerForm = ({ type, career }: CareerFormProps) => {
  const form = useForm<CareerType>({
    defaultValues: career
      ? {
          ...career,
          createdAt: new Date(career.createdAt),
          updatedAt: new Date(career.updatedAt),
        }
      : { title: "", description: "" },
    resolver: zodResolver(careerSchema),
  });

  const onSubmit = async (data: CareerType) => {
    if (type === "Create") {
      try {
        const newCareer = await createCareer(data, "/career");
        if (newCareer?.error) {
          toast(newCareer.error);
        }
      } catch (error) {}
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CareerForm;
