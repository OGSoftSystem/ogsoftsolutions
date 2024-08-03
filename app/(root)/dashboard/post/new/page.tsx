import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import PostForm from "../_components/PostForm";

const NewPublicationPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Post" description="Share a post" />

      <div className="w-full flex justify-center">
        <PostForm type="Create" />
      </div>
    </MaxWidthContainer>
  );
};

export default NewPublicationPage;
