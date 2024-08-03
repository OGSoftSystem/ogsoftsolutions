import PublicationForm from "../_components/PublicationForm";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";

const NewPublicationPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Publication" description="Make a publication" />

      <PublicationForm type="Create" />
    </MaxWidthContainer>
  );
};

export default NewPublicationPage;
