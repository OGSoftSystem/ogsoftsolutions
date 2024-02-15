import CareerCategories from "@/components/CareerCategories";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";

const CareerPage = () => {
  return (
    <MaxWidthContainer className="paddingY relative">
      <div>
        <h1 className="main-heading">Our journey</h1>
        <h3 className="main-desc">You can be one of us.</h3>
      </div>

      <div className="h-[400px] grid grid-cols-1 md:grid-cols-2 gap-4 items-baseline md:items-start relative mt-10 md:mt-24">
        <div className="w-full flex flex-col items-center md:items-start">
          <h1 className="gradient-text poppins-heading text-3xl md:text-4xl lg:text-5xl">
            Join The Team
          </h1>
          <p className="nunito leading-8 lg:text-[1.15rem] lg:leading-9 my-4 text-muted-foreground dark:text-APP_BTN_BLUE text-center md:text-left">
            Be on the lookout. You just might be hired next!
          </p>
          <CareerCategories />
        </div>

        <Image
          src="/team.png"
          fill
          priority
          alt="company-logo"
          className="object-contain object-right -z-10"
        />
      </div>
    </MaxWidthContainer>
  );
};

export default CareerPage;
