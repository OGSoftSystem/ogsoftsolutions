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
import CustomCarousel from "./CustomCarousel";
import Link from "next/link";

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
          <div className="w-full md:w-[70%] lg:-mt-24 rounded-md p-4">
            <Link href="/zimbabwe" className="cursor-pointer">
              <span className="text-blue-500 font-poppins-regular">visit </span>
              <span className="text-APP_BTN_BLUE font-poppins-mid">
                ZIMBABWE
              </span>
            </Link>
            <DynamicText />
          </div>

          <Suspense fallback={<TextSkeleton />}>
            <FetchIntroductionText />
          </Suspense>

          <CallToAction />

          <div className="xxs:absolute xxs:right-5 xxs:bottom-5 xxs:mt-10 md:mt-0">
            <div className="rounded-md w-full xxs:self-end xxs:w-[300px] md:w-[250px] flex-col space-x-2 p-2 intro-text-bg">
              <Suspense fallback={<ReviewSkeleton />}>
                <CustomCarousel>
                  <FetchAnimatedReviews />
                </CustomCarousel>
              </Suspense>
            </div>
          </div>
        </div>

        <Image
          src="/xmas3.png"
          fill
          alt="xmas-flower"
          priority
          // sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-contain object-right"
        />
        <Image
          src="/logo.png"
          fill
          alt="ogsoft-logo"
          priority
          sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-contain object-right hidden sm:block"
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
