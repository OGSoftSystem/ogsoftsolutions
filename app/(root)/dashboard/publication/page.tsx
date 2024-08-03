import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { PublicationSchemaType } from "@/type/type";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  DeleteItem,
  EditItem,
  ToggleItemLive,
} from "./_components/PublicationActions";
import PageHeadingText from "@/components/shared/PageHeadingText";
import { PublicationSkeleton } from "@/components/shared/Skeletons";
import { cachedPublication } from "@/lib/cache";

const PublicationsPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Publications" description="View publications" />

      <Link href={"/dashboard/publication/new"}>
        <PlusCircledIcon className="size-16 text-APP_BTN_BLUE" />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
        <Suspense
          fallback={
            <>
              <PublicationSkeleton />
              <PublicationSkeleton />
              <PublicationSkeleton />
              <PublicationSkeleton />
              <PublicationSkeleton />
            </>
          }
        >
          <GetPublications />
        </Suspense>
      </div>
    </MaxWidthContainer>
  );
};

export default PublicationsPage;

async function GetPublications() {
  const publications: PublicationSchemaType[] = await cachedPublication();
  if (!publications.length) return "No publication.";
  return publications.map((item) => (
    <Card
      key={item._id}
      className="w-full md:min-w-[200px] md:max-w-[200px] p-4"
    >
      <CardTitle className="mb-4 text-center">{item.title}</CardTitle>
      <CardContent className="min-h-[150px]">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={100}
          height={100}
          className="object-cover"
        />
      </CardContent>
      <CardFooter className="flex space-x-2 items-center">
        <ToggleItemLive id={item._id} live={item.live} />
        <EditItem id={item._id} />
        <DeleteItem id={item._id} />
      </CardFooter>
    </Card>
  ));
}
