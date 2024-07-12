import DynamicText from "./atom/DynamicText";
import Introduction from "./atom/Introduction";
import CallToAction from "./atom/CallToAction";
import AnimatedReviews from "./atom/AnimatedReview";
import { Suspense } from "react";
import TextSkeleton from "./atom/TextSkeleton";
import MaxWidthContainer from "./MaxWidthContainer";
import Image from "next/image";
import Overlay from "./Overlay";

/**
 * This component renders the hero page
 * @returns
 */

// pt-[25px] sm:pt-[50px] md:pt-0
const Hero = () => {
  return (
    <section className="relative">
      <Overlay />

      <MaxWidthContainer className="flex flex-col md:flex-row xxs:h-[calc(100vh-80px)] md:mt-[60px] md:mb-[40px] lg:mt-0 w-full lg:items-center relative paddingY xxs:mb-5 2xl:h-[calc(100vh-55vh)]">
        <div className="w-full flex flex-col md:items-start gap-8 md:pr-8 z-10">
          <div className="w-full lg:-mt-24">
            <DynamicText />
          </div>

          <Suspense fallback={<TextSkeleton />}>
            <Introduction />
          </Suspense>

          <CallToAction />

          <Suspense fallback={<TextSkeleton />}>
            <div className="xxs:absolute xxs:right-5 xxs:bottom-5 xxs:mt-10 md:mt-0">
              <AnimatedReviews />
            </div>
          </Suspense>
        </div>

        <Image
          src="/logo.png"
          fill
          alt="ogsoft-logo"
          priority
          sizes="(min-width: 1360px) 1280px, calc(94.23vw + 17px)"
          className="object-contain object-right absolute"
        />
      </MaxWidthContainer>
    </section>
  );
};

export default Hero;
