import MaxWidthContainer from "@/components/MaxWidthContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ClientType } from "@/type/type";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";

import PageHeadingText from "@/components/shared/PageHeadingText";
import { IntroCardSkeleton } from "@/components/shared/Skeletons";
import {
  DeleteItem,
  EditItem,
  ToggleItemLive,
} from "./_components/ClientActions";
import { fetchClients } from "@/lib/actions/client.action";
import Image from "next/image";
import { cachedClientReview } from "@/lib/cache";

const ClientPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Clients" description="View Active Clients" />

      <Link href={"/dashboard/client/new"}>
        <PlusCircledIcon className="size-16 text-APP_BTN_BLUE" />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4 gap-4">
        <Suspense
          fallback={
            <>
              <IntroCardSkeleton />
            </>
          }
        >
          <GetClients />
        </Suspense>
      </div>
    </MaxWidthContainer>
  );
};

export default ClientPage;

async function GetClients() {
  const client: ClientType[] = await cachedClientReview();

  if (!client.length) return "No Client.";

  return client.map((item) => (
    <Card className="w-full p-4" key={item._id}>
      <CardTitle className="mb-4 text-center">Client</CardTitle>
      <CardDescription>{item.info}</CardDescription>
      <CardContent className="min-h-[100px]">
        <Image src={item.logo} width={100} height={80} alt="client" />
        <p className="line-clamp-2 text-xs mt-1">{item.remark}</p>
      </CardContent>
      <CardFooter className="flex space-x-2 items-center">
        <ToggleItemLive id={item._id} live={item.live} />
        <EditItem id={item._id} />
        <DeleteItem id={item._id} />
      </CardFooter>
    </Card>
  ));
}
