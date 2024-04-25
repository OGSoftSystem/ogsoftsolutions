"use server";

import connectDb from "@/lib/database";
import Issue from "@/lib/database/model/Issue.model";
import { IssueType, issueSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import sendEmail from "../mail";
import { handleError } from "../utils";

export const createIssue = async (data: IssueType) => {
  const parsedData = issueSchema.safeParse(data);
  if (!parsedData.success) return;
  try {
    await connectDb();

    if (!(data.name || data.email || data.issue || data.detail)) {
      throw new Error("Fields can not be empty.");
    }

    sendEmail({
      from: parsedData.data.email,
      subject: parsedData.data.issue,
      text: parsedData.data.detail,
    });

    await Issue.create({ ...parsedData.data });
  } catch (error) {
    throw error;
  }
};

export const fetchIssues = async () => {
  try {
    await connectDb();
    const issue = await Issue.find();
    if (!issue) throw new Error("No issue found.");
    return JSON.parse(JSON.stringify(issue));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const findTeamMember = async (id: string) => {
  try {
    await connectDb();
    const issue = await Issue.findById(id);
    if (!issue) throw new Error("No issue found.");
    return JSON.parse(JSON.stringify(issue));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const deleteIssue = async (id: string) => {
  try {
    await connectDb();
    await Issue.findByIdAndDelete(id);
    revalidatePath("/dashboard");
  } catch (error) {
    return { error: handleError(error) };
  }
};
