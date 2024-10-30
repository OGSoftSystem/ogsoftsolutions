import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Spinner from "../atom/Spinner";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CustomButton = ({
  submitting,
  title,
  showSpinner,
  variant,
}: {
  submitting: boolean;
  title: string;
  showSpinner: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "gooeyLeft"
    | "gooeyRight"
    | "shine"
    | "expandIcon"
    | "ringHover"
    | "linkHover1"
    | "linkHover2"
    | null
    | undefined;
}) => {
  return (
    <Button
      disabled={submitting}
      variant={variant ? variant : "default"}
      type="submit"
      className="bg-APP_BTN_BLUE  text-white hover:bg-APP_BTN_BLUE/90 w-full md:w-[200px] btn uppercase"
    >
      {title} {submitting && showSpinner && <Spinner />}
    </Button>
  );
};

export default CustomButton;

export const CustomLink = ({
  title,
  href,
  target,
  className,
  variant,
}: {
  title: string;
  href: string;
  target?: string;
  className?: string;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "gooeyLeft"
    | "gooeyRight"
    | "shine"
    | null
    | undefined;
}) => {
  const style =
    "rounded-md uppercase w-full xxs:w-[220px] sm:w-[220px] md:w-[230] lg:w-[240px] cursor-pointer text-white";

  return (
    <Link
      className={cn(
        style,
        buttonVariants({
          variant: variant,
          size: "lg",
          className: `btn dark:text-white ${className}`,
        })
      )}
      href={href}
      target={target}
    >
      {title}
    </Link>
  );
};
