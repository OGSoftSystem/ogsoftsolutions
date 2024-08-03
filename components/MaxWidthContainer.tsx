import { cn } from "@/lib/utils";
import React from "react";

const MaxWidthContainer = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <div
      id={id}
      className={cn("size-full px-4 md:px-6 lg:px-8 mx-auto max-w-screen-xl", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthContainer;
