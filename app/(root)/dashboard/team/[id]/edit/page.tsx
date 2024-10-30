import { TeamMemberProps } from "@/type/type";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Metadata } from "next";
import { findTeamMember } from "@/lib/actions/team.action";
import TeamForm from "../../_components/TeamForm";
import PageHeadingText from "@/components/shared/PageHeadingText";

export const metadata: Metadata = {
  title: "Edit Team Members",
};
const TeamPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  
  const id = (await params).id;
  const member: TeamMemberProps = await findTeamMember(id);

  return (
    <MaxWidthContainer className="paddingY">
      <div className="w-full sm:w-9/12 md:w-7/12 lg:w-6/12 mx-auto flex flex-col space-y-2">
        <PageHeadingText title="Edit Member" description="Edit Team Member" />

        <TeamForm member={member} type="Update" />
      </div>
    </MaxWidthContainer>
  );
};

export default TeamPage;
