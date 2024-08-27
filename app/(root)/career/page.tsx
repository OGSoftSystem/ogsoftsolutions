import MaxWidthContainer from "@/components/MaxWidthContainer";
import { cachedCareerPublication } from "@/lib/cache";
import { cleanText } from "@/lib/utils";
import { CareerPublicationSchemaType } from "@/type/type";
import Image from "next/image";
import Link from "next/link";

const CareerPage = async () => {
  return (
    <MaxWidthContainer className="paddingY">
      <div>
        <h1 className="main-heading">Join The team</h1>
        <h3 className="main-desc">You can be one of us.</h3>
      </div>

      <FetchCareerPublications />
    </MaxWidthContainer>
  );
};

export default CareerPage;

async function FetchCareerPublications() {
  const careerPublication: CareerPublicationSchemaType[] =
    await cachedCareerPublication();

  const currentPublication: CareerPublicationSchemaType[] =
    careerPublication.filter((item) => (item ? item.live : []));

  if (!currentPublication.length) return <Startup />;

  return currentPublication.map((item) => (
    <>
      <p className="text-green-500 font-bold text-center">LIVE NOW!</p>
      <div key={item._id} className="w-full flex flex-col items-center">
        <div className="relative w-full h-[500px] md:w-[400px] md:h-[400px] lg:w-[800px] lg:h-[600px] overflow-hidden">
          <Image
            src={item.imageUrl}
            fill
            priority
            alt="hire_banner "
            className="object-contain"
          />
        </div>

        <div className="bg-APP_BTN_BLUE/5 p-4 rounded-md mt-8 md:mt-12">
          <div className="w-full md:max-w-prose mt-2">
            <p className="heading-text md:text-center">{item.title}</p>
            <br />
            <p className="p-text">{cleanText(item.detail)}</p>
            <br />
            <span className="mt-2 p-text">
              Interested Candidates, &nbsp;
              <Link
                href={item.link}
                className="underline text-APP_BTN_BLUE "
                target="_blank"
              >
                please click on this link.
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  ));
}

function Startup() {
  return (
    <div className="w-full h-[50vh] lg:h-[70vh] flex flex-col lg:flex-row lg:justify-between items-center">
      <div>
        <h1 className="gradient-text poppins-heading text-2xl md:text-3xl lg:text-4xl mt-8">
          No opening at the moment.
        </h1>
        <p className="nunito leading-8 lg:text-[1.15rem] lg:leading-9 my-4 text-muted-foreground dark:text-APP_BTN_BLUE text-center lg:text-left">
          Please check again later.
        </p>
        {/* <CareerCategories /> */}
      </div>

      <div className="relative w-[200px] h-[200px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px]">
        <Image
          src="/team.png"
          fill
          priority
          alt="company-logo"
          className="object-contain object-right -z-10"
        />
      </div>
    </div>
  );
}
