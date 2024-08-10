import CareerCategories from "@/components/CareerCategories";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import Link from "next/link";

const CareerPage = () => {
  return (
    <MaxWidthContainer className="paddingY relative">
      <div>
        <h1 className="main-heading">Our journey</h1>
        <h3 className="main-desc">You can be one of us.</h3>
      </div>

      <div>
        {/* <div className="w-full flex flex-col items-center md:items-start">
          <h1 className="gradient-text poppins-heading text-3xl md:text-4xl lg:text-5xl">
            Join The Team
          </h1>
          <p className="nunito leading-8 lg:text-[1.15rem] lg:leading-9 my-4 text-muted-foreground dark:text-APP_BTN_BLUE text-center md:text-left">
            Be on the lookout. You just might be hired next!
          </p>
          <CareerCategories />
        </div> */}

        <p className="text-green-500 font-bold text-center">LIVE NOW!</p>
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full h-[500px] md:w-[400px] md:h-[400px] lg:w-[800px] lg:h-[600px] overflow-hidden">
            <Image
              src={"/hire.jpeg"}
              fill
              priority
              alt="hire_banner "
              className="object-contain"
            />
          </div>

          <div className="bg-APP_BTN_BLUE/5 p-4 rounded-md mt-8 md:mt-12">
            <div className="w-full md:max-w-prose mt-2">
              <p className="heading-text md:text-center">
                Engagement Officer Job
              </p>
              <br />
              <p className="p-text">
                Description: OGSoft Solutions Ltd seeks a dynamic and
                results-oriented individual to fill the role of Engagement
                Officer. The successful candidate will be responsible for
                fostering and maintaining strong relationships with clients and
                stakeholders. This role requires excellent interpersonal skills,
                a deep understanding of Healthcare industry, and a proven
                ability to build and manage relationships. <br />
                <br />
                Key Responsibilities: <br />
                •⁠ ⁠Develop and implement engagement strategies aligned with
                organizational goals.
                <br />
                •⁠ ⁠Build and maintain strong relationships with
                clients/partners - Identify opportunities for collaboration and
                partnership. - Track and report on engagement activities and
                metrics. <br />
                •⁠ ⁠Develop and implement a social media strategy to increase
                followers, engagement, and brand awareness, including creating
                and curating content, managing social media campaigns,
                monitoring analytics, and responding to comments and messages in
                a timely and professional manner.
              </p>
              <br />
              <span className="mt-2 p-text">
                Interested Candidates, &nbsp;
                <Link
                  href={"https://forms.gle/19cMtGL1i5d1HVTV7"}
                  className="underline text-APP_BTN_BLUE"
                  target="_blank"
                >
                  please click the link to fill the form
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* <Image
          src="/team.png"
          fill
          priority
          alt="company-logo"
          className="object-contain object-right -z-10"
        /> */}
      </div>
    </MaxWidthContainer>
  );
};

export default CareerPage;
