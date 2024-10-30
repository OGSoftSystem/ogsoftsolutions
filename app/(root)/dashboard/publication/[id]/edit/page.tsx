import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import PublicationForm from "../../_components/PublicationForm";
import { findPublicationById } from "@/lib/actions/publication.actions";
import { PublicationSchemaType } from "@/type/type";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const publication: PublicationSchemaType = await findPublicationById(id);
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Publication" description="Edit publication" />

      <PublicationForm type="Update" publication={publication} />
    </MaxWidthContainer>
  );
};

export default EditPage;
