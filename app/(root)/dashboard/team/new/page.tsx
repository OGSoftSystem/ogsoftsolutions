import TeamForm from "../_components/TeamForm";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";

const NewPublicationPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Publication" description="Make a publication" />

      <TeamForm type="Create" />
    </MaxWidthContainer>
  );
};

export default NewPublicationPage;
