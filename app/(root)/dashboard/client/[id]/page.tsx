import MaxWidthContainer from "@/components/MaxWidthContainer";
import ClientForm from "@/components/atom/ClientForm";
import { ClientType } from "@/type/type";
import { Metadata } from "next";
import { fetchClients, findClient } from "@/lib/actions/client.action";
import { cache } from "react";

type ParamsType = {
  params: { id: string };
};

const getClientById = cache(async (id: string): Promise<ClientType> => {
  return await findClient(id);
});

export const generateMetadata = async ({
  params: { id },
}: ParamsType): Promise<Metadata> => {
  const client: ClientType = await getClientById(id);

  return {
    title: client.info,
    description: client.remark,
    openGraph: {
      images: client.logo,
    },
  };
};

export const generateStaticParams = async () => {
  const clients: ClientType[] = await fetchClients();
  return clients.map(({ _id }) => ({id: _id}));
};

const ClientPage = async ({ params:{id}}: ParamsType) => {
  const client: ClientType = await getClientById(id);

  return (
    <MaxWidthContainer className="paddingY">
      <div className="w-full sm:w-9/12 md:w-7/12 lg:w-6/12 mx-auto flex flex-col space-y-2">
        <ClientForm client={client} type="Update" />
      </div>
    </MaxWidthContainer>
  );
};

export default ClientPage;
