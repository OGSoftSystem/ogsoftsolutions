import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import ClientForm from "../_components/ClientForm";

const NewPublicationPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Clients" description="Add A Client" />

      <ClientForm type="Create" />
    </MaxWidthContainer>
  );
};

export default NewPublicationPage;
