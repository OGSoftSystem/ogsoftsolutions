import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import { CareerPublicationSchemaType } from "@/type/type";
import CareerPublicationForm from "../../_components/CareerPublicationForm";
import { findCareerPublicationById } from "@/lib/actions/career.actions";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const publication: CareerPublicationSchemaType =
    await findCareerPublicationById(id);
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText
        title="Career Publication"
        description="Edit career publication"
      />

      <CareerPublicationForm type="Update" publication={publication} />
    </MaxWidthContainer>
  );
};

export default EditPage;
