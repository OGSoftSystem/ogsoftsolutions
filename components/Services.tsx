import { services } from "@/constants/services";
import React from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import Image from "next/image";
import { cn } from "@/lib/utils";
import PageHeadingText from "./shared/PageHeadingText";
import { CustomLink } from "./shared/CustomButton";

const Services = () => {
  const cardStyle = "p-6 rounded-md border";
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText
        title="Our Services"
        description="Get familiar with our top-notch services."
      />

      <div className="w-full flex flex-col space-y-4 flex-1">
        <div className="flex-1 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
          <div className={cn("flex-[0.4] bg-APP_BTN_BLUE/5", cardStyle)}>
            <Image
              src={services[0].imgPath}
              width={100}
              height={100}
              alt={services[0].title}
            />

            <h2 className="box-heading my-2">{services[0].title}</h2>
            <p className="p-text lg:text-justify">{services[0].desc}</p>
          </div>

          <div className={cn("flex-[0.6] bg-APP_BTN_BLUE/10", cardStyle)}>
            <Image
              src={services[1].imgPath}
              width={100}
              height={100}
              alt={services[1].title}
            />

            <h2 className="box-heading my-2">{services[1].title}</h2>
            <p className="p-text lg:text-justify">{services[1].desc}</p>
          </div>
        </div>

        <div
          className={cn(
            "flex-1 md:flex md:items-center md:space-x-4 bg-APP_BTN_BLUE/15",
            cardStyle
          )}
        >
          <Image
            src={services[2].imgPath}
            width={100}
            height={100}
            alt={services[2].title}
          />

          <h2 className="box-heading my-2">{services[2].title}</h2>
          <p className="p-text max-w-[65ch] lg:text-justify">
            {services[2].desc}
          </p>
        </div>

        <CustomLink
          title="Request A Demo"
          href="/contact-us"
          variant="default"
          className="bg-APP_BTN_BLUE flex self-center"
        />
      </div>
    </MaxWidthContainer>
  );
};

export default Services;
