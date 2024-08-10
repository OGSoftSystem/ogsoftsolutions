import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import { PublicationSkeleton } from "@/components/shared/Skeletons";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { IssueSchemaType } from "@/type/type";
import React, { Suspense } from "react";
import {
  DeleteItem,
  // EditItem,
  ToggleOngoing,
} from "./_components/IssueActions";
import { Separator } from "@/components/ui/separator";
import { cachedIssues } from "@/lib/cache";
const page = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Issue" description="View Issues" />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <GetTIssues />
        </Suspense>
      </div>
    </MaxWidthContainer>
  );
};

export default page;

async function GetTIssues() {
  const issues: IssueSchemaType[] = await cachedIssues();

  return issues.map((issue) => (
    <Card
      key={issue._id}
      className="w-full md:w-[300px] p-4 mt-4"
    >
      <CardTitle className="mb-4 text-center text-sm">{issue.issue}</CardTitle>
      <CardContent className="min-h-[150px]">
        <p className="text-xs">{issue.detail}</p>

        <Separator className="mt-4" />
        <div>
          <p>Reporter:</p>
          <p className="text-xs line-clamp-3">Name: {issue.name}</p>
          <p className="text-xs line-clamp-3">Email: {issue.email}</p>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex space-x-2 issues-center">
        <ToggleOngoing id={issue._id} ongoing={issue.ongoing} />
        {/* <EditItem id={issue._id} /> */}
        <DeleteItem id={issue._id} />
      </CardFooter>
    </Card>
  ));
}
