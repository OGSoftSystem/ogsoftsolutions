import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { IntoTextSchemaType } from "@/type/type";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";

import PageHeadingText from "@/components/shared/PageHeadingText";
import { IntroCardSkeleton } from "@/components/shared/Skeletons";
import {
  DeleteItem,
  EditItem,
  ToggleItemLive,
} from "../intro-text/_components/IntroTextActions";
import { cachedIntroText } from "@/lib/cache";
import { fetchIntroText } from "@/lib/actions/intro.action";

const IntroTextPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText
        title="Introduction Text"
        description="View landing page introduction text"
      />

      <Link href={"/dashboard/intro-text/new"}>
        <PlusCircledIcon className="size-16 text-APP_BTN_BLUE" />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-y-4 md:space-y-0 mt-4 md:gap-4">
        <Suspense
          fallback={
            <>
              <IntroCardSkeleton />
            </>
          }
        >
          <GetIntroText />
        </Suspense>
      </div>
    </MaxWidthContainer>
  );
};

export default IntroTextPage;

async function GetIntroText() {
  const introText: IntoTextSchemaType[] = await fetchIntroText();

  if (!introText.length) return "No Introduction Text.";

  return introText.map((item) => (
    <Card className="w-full p-4" key={item._id}>
      {/* <CardTitle className="mb-4 text-center">{item.title}</CardTitle> */}
      <CardContent className="line-clamp-5 text-xs">{item.text}</CardContent>

      <CardFooter className="flex space-x-2 items-center pt-4">
        <ToggleItemLive id={item._id} live={item.live} />
        <EditItem id={item._id} />
        <DeleteItem id={item._id} />
      </CardFooter>
    </Card>
  ));
}
