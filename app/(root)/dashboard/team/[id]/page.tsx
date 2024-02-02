import { TeamMemberProps } from "@/type/type";
import TeamForm from "@/components/atom/TeamForm";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Metadata } from "next";
import { fetchTeamMembers, findTeamMember } from "@/lib/actions/team.action";
import { cache } from "react";

type ParamsType = {
  params: { id: string };
};

// Dedupe request
const getTeamMemberById = cache(
  async (id: string): Promise<TeamMemberProps> => {
    return await findTeamMember(id);
  }
);

export const generateMetadata = async ({
  params: { id },
}: ParamsType): Promise<Metadata> => {
  const member: TeamMemberProps = await getTeamMemberById(id);

  return {
    title: `${member.fullName} - ${member.position}`,
    description: member.detail,
    openGraph: {
      images: member.photo,
    },
  };
};

export const generateStaticParams =async () => {
  const members: TeamMemberProps[] = await fetchTeamMembers();
  return members.map(({_id}) => ({id: _id}))
}

const TeamPage = async ({ params: {id} }: ParamsType) => {
  const member: TeamMemberProps = await getTeamMemberById(id);

  return (
    <MaxWidthContainer className="paddingY">
      <div className="w-full sm:w-9/12 md:w-7/12 lg:w-6/12 mx-auto flex flex-col space-y-2">
        <TeamForm member={member} type="Update" />
      </div>
    </MaxWidthContainer>
  );
};

export default TeamPage;
