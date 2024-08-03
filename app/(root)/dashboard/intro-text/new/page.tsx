import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import IntroForm from "../_components/IntroForm";

const NewPublicationPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText
        title="Introduction"
        description="Create An Intro Text"
      />

      <div className="w-full flex justify-center">
        <IntroForm type="Create" />
      </div>
    </MaxWidthContainer>
  );
};

export default NewPublicationPage;
