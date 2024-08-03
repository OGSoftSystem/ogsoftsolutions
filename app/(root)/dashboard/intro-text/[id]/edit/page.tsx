import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import { IntoTextSchemaType } from "@/type/type";
import { findIntroTextById } from "@/lib/actions/intro.action";
import IntroForm from "@/app/(root)/dashboard/intro-text/_components/IntroForm";

const EditPage = async ({ params: { id } }: { params: { id: string } }) => {
  const text: IntoTextSchemaType = await findIntroTextById(id);

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText
        title="Introduction Text"
        description="Edit Introduction Text"
      />

      <div className="w-full flex justify-center">
        <IntroForm type="Update" introText={text} />
      </div>
    </MaxWidthContainer>
  );
};

export default EditPage;
