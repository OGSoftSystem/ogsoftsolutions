import MaxWidthContainer from "@/components/MaxWidthContainer";
import { ClientType } from "@/type/type";
import { Metadata } from "next";
import { findClient } from "@/lib/actions/client.action";
import ClientForm from "../../_components/ClientForm";
import PageHeadingText from "@/components/shared/PageHeadingText";

export const metadata: Metadata = {
  title: "Edit Client",
};

const ClientPage = async ({ params: { id } }: { params: { id: string } }) => {
  const client: ClientType = await findClient(id);

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Edit Client" description="Edit client details" />
      <div className="w-full sm:w-9/12 md:w-7/12 lg:w-6/12 mx-auto flex flex-col space-y-2">
        <ClientForm client={client} type="Update" />
      </div>
    </MaxWidthContainer>
  );
};

export default ClientPage;
