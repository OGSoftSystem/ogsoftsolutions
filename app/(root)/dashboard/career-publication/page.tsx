import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CareerPublicationSchemaType } from "@/type/type";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  DeleteItem,
  EditItem,
  ToggleItemLive,
} from "./_components/CareerPublicationActions";
import PageHeadingText from "@/components/shared/PageHeadingText";
import { PublicationSkeleton } from "@/components/shared/Skeletons";
import { cachedCareerPublication } from "@/lib/cache";

const CareerPublicationsPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Career" description="View career publications" />

      <Link href={"/dashboard/career-publication/new"}>
        <PlusCircledIcon className="size-16 text-APP_BTN_BLUE" />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-4">
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

export default CareerPublicationsPage;

async function GetPublications() {
  const publications: CareerPublicationSchemaType[] =
    await cachedCareerPublication();
  if (!publications.length) return "No career publication.";
  return publications.map((item) => (
    <Card
      key={item._id}
      className="w-full md:min-w-[300px] md:max-w-[300px] p-4 flex flex-col items-center justify-center"
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

        {/* <Link href={item.link} target="_blank" className="text-xs mt-2">
          {item.link}
        </Link> */}
      </CardContent>
      <CardFooter className="flex space-x-2 items-center">
        <ToggleItemLive id={item._id} live={item.live} />
        <EditItem id={item._id} />
        <DeleteItem id={item._id} />
      </CardFooter>
    </Card>
  ));
}
