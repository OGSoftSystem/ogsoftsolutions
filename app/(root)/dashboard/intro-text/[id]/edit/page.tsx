import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import { IntoTextSchemaType } from "@/type/type";
import IntroEditForm from "@/components/atom/IntroEditForm";
import { findIntroTextById } from "@/lib/actions/intro.action";

const EditPage = async ({ params: { id } }: { params: { id: string } }) => {
  const text: IntoTextSchemaType = await findIntroTextById(id);

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText
        title="Introduction Text"
        description="Edit Introduction Text"
      />

      <IntroEditForm />
    </MaxWidthContainer>
  );
};

export default EditPage;
