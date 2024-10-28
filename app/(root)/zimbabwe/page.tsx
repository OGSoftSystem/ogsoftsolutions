import MaxWidthContainer from "@/components/MaxWidthContainer";
import { TeamSkeleton, ZimTeamMember } from "@/components/shared/TeamMember";
import { fetchTeamMembers } from "@/lib/actions/team.action";
import { TeamMemberProps } from "@/type/type";
import { Metadata } from "next";
import Image from "next/image";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Zim Team",
};
const ZimPage = () => {
  return (
    <div className="w-full">
      <div className="w-full relative bg-APP_BTN_BLUE/5 h-[400px] flex items-center justify-center">
        <Image
          src={"/3.png"}
          fill
          alt="bg-pattern"
          className="object-cover -z-10"
          priority
        />

        <div className="flex flex-col space-y-2 md:space-y-0 text-center">
          <span className="text-xl nunito">Welcome to </span>
          <span className="text-3xl poppins">OGSOFT SOLUTIONS</span>
          <h1 className="uppercase gradient-text poppins-heading text-6xl md:text-7xl lg:text-9xl">
            ZIMBABWE
          </h1>
        </div>
      </div>

      <MaxWidthContainer className="flex flex-col items-center justify-center py-10">
        <div>
          <p className="max-w-[80ch] p-text mb-8">
            As a leading provider of innovative digital solutions, OGSoft
            Solutions is dedicated to transforming healthcare services across
            Africa. Our Megatron hospital management system is revolutionizing
            patient care and operational efficiency, while our OgCoin token is
            paving the way for a more secure, accessible, and affordable digital
            payment ecosystem. With a strong foundation in Zimbabwe, we&apos;re
            proud to be at the forefront of Africa&apos;s digital revolution.
          </p>
        </div>

        <h1 className="main-heading">The ZIM Team</h1>
        <h3 className="main-desc">Business heads in Zimbabwe.</h3>

        <div className="grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-2 lg:grid-cols-3 md:gap-16">
          <Suspense
            fallback={
              <>
                <TeamSkeleton />
                <TeamSkeleton />
                <TeamSkeleton />
              </>
            }
          >
            <FetchZimTeam />
          </Suspense>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default ZimPage;

async function FetchZimTeam() {
  const team: TeamMemberProps[] = await fetchTeamMembers();

  const zimTeam = team.filter(
    (member) =>
      member.location === "malaysia" ||
      member.location === "zimbabwe" ||
      member.fullName === "Temitope Quadri" ||
      member.fullName === "Jessica Agbala"
  );

  return zimTeam.map((t) => (
    <ZimTeamMember
      key={t._id}
      _id={t._id}
      detail={t.detail}
      fullName={t.fullName}
      live={t.live}
      location={t.location}
      photo={t.photo}
      position={t.position}
    />
  ));
}
