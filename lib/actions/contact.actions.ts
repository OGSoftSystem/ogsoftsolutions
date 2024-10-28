"use server";

import sendEmail from "../mail";
import { ContactFormSchema, ContactFormSchemaProps } from "../validation";

export const sendEmailToContact = async (data: ContactFormSchemaProps) => {
  const parsedData = ContactFormSchema.safeParse(data);
  if (!parsedData.success) return;

  try {
    sendEmail({
      from: parsedData.data.email,
      subject: parsedData.data.title,
      text: `
      ${parsedData.data.name} with phone: ${parsedData.data.phone} dropped a message:
      ${parsedData.data.message}`,
    });

    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};
