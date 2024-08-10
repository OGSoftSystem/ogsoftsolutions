import DynamicText from "./atom/DynamicText";
import CallToAction from "./atom/CallToAction";
import { Suspense } from "react";
import TextSkeleton from "./atom/TextSkeleton";
import MaxWidthContainer from "./MaxWidthContainer";
import Image from "next/image";
import Overlay from "./Overlay";
import {
  ClientType,
  IntoTextSchemaType,
  PublicationSchemaType,
} from "@/type/type";
import IntroCard from "./atom/IntroCard";
import { IntroCardSkeleton, ReviewSkeleton } from "./shared/Skeletons";
import {
  cachedClientReview,
  cachedIntroText,
  cachedPublication,
} from "@/lib/cache";
import CustomerRemark from "./atom/CustomerRemark";
import { CarouselDiv } from "./atom/CarouselDiv";
import CustomCarousel from "./CustomCarousel";

/**
 * This component renders the hero page
 * @returns
 */

// pt-[25px] sm:pt-[50px] md:pt-0
const Hero = () => {
  return (
    <section className="relative">
      <Suspense
        fallback={
          <>
            <IntroCardSkeleton />
          </>
        }
      >
        <FetchPublication />
      </Suspense>

      <MaxWidthContainer className="flex flex-col md:flex-row xxs:h-[calc(100vh-80px)] md:mt-[60px] md:mb-[40px] lg:mt-0 w-full lg:items-center relative paddingY xxs:mb-5 2xl:h-[calc(100vh-55vh)]">
        <div className="w-full flex flex-col md:items-start gap-8 md:pr-8 z-10">
          <div className="w-full lg:-mt-24">
            <DynamicText />
          </div>

          <Suspense fallback={<TextSkeleton />}>
            <FetchIntroductionText />
          </Suspense>

          <CallToAction />

          <div className="xxs:absolute xxs:right-5 xxs:bottom-5 xxs:mt-10 md:mt-0">
            <div className="rounded-md w-full xxs:self-end xxs:w-[300px] md:w-[250px] flex-col space-x-2 p-2 bg-gradient-to-tr from-zinc-200 via-blue-50/80 to-zinc-100 dark:bg-gradient-to-tr dark:from-[#020817] dark:via-blue-900/80 dark:to-zinc-900">
              <Suspense fallback={<ReviewSkeleton />}>
                <CustomCarousel>
                  <FetchAnimatedReviews />
                </CustomCarousel>
              </Suspense>
            </div>
          </div>
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

async function FetchPublication() {
  const publications: PublicationSchemaType[] = await cachedPublication();
  const currentPublication = publications.find(
    (item: PublicationSchemaType, index: number) =>
      item.live && item ? index === publications.length - 1 : null
  );

  if (!currentPublication) return;

  return (
    <Overlay
      title={currentPublication?.title as string}
      imageUrl={currentPublication?.imageUrl as string}
      detail={currentPublication?.detail as string}
    />
  );
}

async function FetchIntroductionText() {
  const res: IntoTextSchemaType[] = await cachedIntroText();
  const currentText = res.find((item) => item.live);

  if (!currentText) return "No Introduction Text";
  return <IntroCard text={currentText?.text as string} />;
}

async function FetchAnimatedReviews() {
  const customerReview: ClientType[] = await cachedClientReview();

  const eligibleClients = customerReview.filter(
    (cus) => cus.hasLogo === true && cus.live
  );

  if (!eligibleClients.length) return "No client review.";

  return eligibleClients.map((review: any) => (
    <CustomerRemark
      key={review._id}
      _id={review._id}
      logo={review.logo}
      info={review.info}
      remark={review.remark}
      hasLogo={review.hasLogo}
    />
  ));
}
