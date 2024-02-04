import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <MaxWidthContainer className="flex flex-col items-center h-screen justify-center gap-4">
        <h3 className="heading-text">Page Not Found.</h3>
        <div className="flex flex-col items-center mt-6">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="OGsoft-logo"
            className="object-contain"
          />
          <p className="text-[14px] text-muted-foreground sm:p-text">
            Sorry, The page you requested does not exist!
          </p>
        </div>
        <Button variant="ghost">
          <Link
            href="/"
            aria-label="Home link"
            className="p-2 text-black dark:text-white rounded-md"
          >
            Go Back
          </Link>
        </Button>
      </MaxWidthContainer>
    </>
  );
};

export default NotFoundPage;
