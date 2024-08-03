"use server";

import connectDb from "@/lib/database";
import TeamMember from "@/lib/database/model/Team.model";
import { TeamField, TeamSchema } from "@/lib/validation";
import { TeamMemberProps } from "@/type/type";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleError } from "../utils";

export const addTeamMember = async (data: TeamField) => {
  const parsedData = TeamSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Incorrect fields");
  try {
    await connectDb();
    await TeamMember.create({ ...data });
    revalidatePath("/dashboard/team");
    revalidateTag("team-members");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
export const fetchTeamMembers = async () => {
  try {
    await connectDb();
    const members = await TeamMember.find();
    if (!members) throw new Error("No member found.");
    return JSON.parse(JSON.stringify(members));
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const findTeamMember = async (id: string): Promise<TeamMemberProps> => {
  try {
    await connectDb();
    const member = await TeamMember.findById(id);
    if (!member) throw new Error("No member found.");
    return JSON.parse(JSON.stringify(member));
  } catch (error) {
    throw error;
  }
};
export const updateTeamMember = async (data: Omit<TeamMemberProps, "live">) => {
  try {
    await connectDb();
    await TeamMember.findByIdAndUpdate(
      { _id: data._id },
      {
        $set: {
          photo: data.photo,
          fullName: data.fullName,
          position: data.position,
          detail: data.detail,
        },
      },
      { new: true }
    );
     revalidatePath("/dashboard/team");
     revalidateTag("team-members");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};

export const toggleTeamMember = async (id: string, live: boolean) => {
  try {
    await connectDb();
    await TeamMember.findByIdAndUpdate(
      id,
      {
        $set: {
          live,
        },
      },
      { new: true }
    );
     revalidatePath("/dashboard/team");
     revalidateTag("team-members");
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
export const deleteTeamMember = async (id: string) => {
  try {
    await connectDb();
    await TeamMember.findByIdAndDelete(id);
     revalidatePath("/dashboard/team");
     revalidateTag("team-members");
  } catch (error) {
    throw error;
  }
};
