import CareerPublicationForm from "../_components/CareerPublicationForm";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";

const NewPublicationPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Career Publication" description="Make a career publication" />

      <CareerPublicationForm type="Create" />
    </MaxWidthContainer>
  );
};

export default NewPublicationPage;
