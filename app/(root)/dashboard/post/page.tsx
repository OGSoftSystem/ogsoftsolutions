import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { PostType } from "@/type/type";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  DeleteItem,
  EditItem,
  ToggleItemLive,
} from "./_components/PostActions";
import PageHeadingText from "@/components/shared/PageHeadingText";
import { PublicationSkeleton } from "@/components/shared/Skeletons";
import { cachedPosts } from "@/lib/cache";
import { cleanText } from "@/lib/utils";

const PublicationsPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Blog Post" description="View Posts" />

      <Link href={"/dashboard/post/new"}>
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
          <GetPosts />
        </Suspense>
      </div>
    </MaxWidthContainer>
  );
};

export default PublicationsPage;

async function GetPosts() {
  const posts: PostType[] = await cachedPosts();

  if (!posts.length) return "No publication.";

  return posts.map((item) => (
    <Card
      key={item._id}
      className="w-full md:min-w-[200px] md:max-w-[200px] p-4 mt-4"
    >
      <CardTitle className="mb-4 text-center">{item.author}</CardTitle>
      <CardContent className="min-h-[150px]">
        <Image
          src={item.photo}
          alt={item.author}
          width={100}
          height={100}
          className="object-contain max-h-[60px]"
        />
        <p className="text-xs line-clamp-3">{cleanText(item.body)}</p>
      </CardContent>
      <CardFooter className="flex space-x-2 items-center">
        <ToggleItemLive id={item._id} live={item.live} />
        <EditItem id={item._id} />
        <DeleteItem id={item._id} />
      </CardFooter>
    </Card>
  ));
}
