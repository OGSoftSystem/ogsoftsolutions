import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { TeamMemberProps } from "@/type/type";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  DeleteItem,
  EditItem,
  ToggleItemLive,
} from "./_components/TeamActions";
import PageHeadingText from "@/components/shared/PageHeadingText";
import { PublicationSkeleton } from "@/components/shared/Skeletons";
import { fetchTeamMembers } from "@/lib/actions/team.action";

const PublicationsPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Team Members" description="View Team Members" />

      <Link href={"/dashboard/publication/new"} className="w-fit bg-red-300">
        <PlusCircledIcon className="size-16 text-APP_BTN_BLUE" />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
  const teamMembers: TeamMemberProps[] = await fetchTeamMembers();
  if (!teamMembers.length) return "No publication.";
  return teamMembers.map((item) => (
    <Card
      key={item._id}
      className="w-full md:min-w-[200px] md:max-w-[200px] p-4 mt-4"
    >
      <CardTitle className="mb-4 text-center">{item.fullName}</CardTitle>
      <CardContent className="min-h-[150px]">
        <Image
          src={item.photo}
          alt={item.fullName}
          width={100}
          height={100}
          className="object-contain max-h-[60px]"
        />
        <p className="text-xs line-clamp-3">{item.detail}</p>
      </CardContent>
      <CardFooter className="flex space-x-2 items-center">
        <ToggleItemLive id={item._id} live={item.live} />
        <EditItem id={item._id} />
        <DeleteItem id={item._id} />
      </CardFooter>
    </Card>
  ));
}
