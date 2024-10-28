import React, { Suspense } from "react";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Metadata } from "next";
import { cachedTeamMembers } from "@/lib/cache";
import { TeamMemberProps } from "@/type/type";
import TeamMember, { TeamSkeleton } from "@/components/shared/TeamMember";

export const metadata: Metadata = {
  title: "About",
};

const About = () => {
  return (
    <section>
      <MaxWidthContainer className="paddingY">
        <>
          <h1 className="main-heading">A bit more about us</h1>
          <h3 className="main-desc">We epitomize excellent service.</h3>
          {/* Text */}
          <div className="md:flex md:gap-6">
            <div>
              <p className="p-text md:text-justify">
                Welcome to OGSoft Solutions Limited, where innovation meets
                expertise. We have been in operation across Africa for over 5
                years now. As trailblazers in the digital realm, we specialize
                in designing, implementing, and optimizing state-of-the-art web
                and mobile-based online systems. Our passionate team of skilled
                developers collaborates seamlessly to deliver solutions that
                redefine industry standards.
                <br />
                <br />
                At the heart of our success is a commitment to excellence.
                Partnering with seasoned developers, we not only meet but exceed
                expectations, creating world-class solutions tailored to your
                unique needs. Our focus extends beyond innovation to ensure
                efficient resource utilization and swift turnaround times,
                providing you with a competitive edge in the digital landscape.
              </p>
            </div>
            <div>
              <p className="p-text md:text-justify">
                Beyond the ordinary, our tech conferences are transformative
                experiences. Our goal is to create events that resonate,
                engaging audiences through captivating presentations, fostering
                thought-provoking discussions, and inspiring fresh ideas. Join
                us on a journey where excellence is not just a goal; it&apos;s a
                standard we live by. Let&apos;s shape the future together, where
                your success is our mission.
                <br />
                <br />
                Experience the OGSoft Solutions Limited difference — where
                cutting-edge technology meets unparalleled dedication. Elevate
                your digital journey with us, and discover the limitless
                possibilities that innovation, expertise, and commitment can
                bring to your business.
              </p>
            </div>
          </div>
        </>
        {/* Team */}
        <div className="p-4 my-4 lg:my-6">
          <h1 className="main-heading">Meet our team</h1>
          <h3 className="main-desc">
            We are team of experts in business and tech.
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cole-5 gap-4 my-8">
            <Suspense
              fallback={
                <>
                  <TeamSkeleton />
                  <TeamSkeleton />
                  <TeamSkeleton />
                  <TeamSkeleton />
                  <TeamSkeleton />
                  <TeamSkeleton />
                </>
              }
            >
              <TeamSuspense />
            </Suspense>
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
};

export default About;

async function TeamSuspense() {
  const teamMembers: TeamMemberProps[] = await cachedTeamMembers();

  const currentTeam = teamMembers.filter((member) => member.live);
  if (!currentTeam.length) {
    return <p className="p-text">No team member</p>;
  }

  return currentTeam.map((member: TeamMemberProps) => (
    <TeamMember
      key={member._id}
      _id={member._id}
      photo={member.photo}
      fullName={member.fullName}
      position={member.position}
      detail={member.detail}
      live={member.live}
      location={member.location}
    />
  ));
}
