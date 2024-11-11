import { mission } from "@/constants/mission";
import { MissionProps } from "@/type/type";
import Image from "next/image";
import { MotionDiv } from "./atom/Motion";
import { Suspense } from "react";

export default function Vision() {
  return (
    <section className="paddingY paddingX">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-12">
        <Suspense
          fallback={
            <>
              <MissionSkeleton />
              <MissionSkeleton />
              <MissionSkeleton />
            </>
          }
        >
          <RenderMission />
        </Suspense>
      </div>
    </section>
  );
}

async function RenderMission() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mission.map((item) => (
    <MissionComp
      key={item.desc}
      imgPath={item.imgPath}
      title={item.title}
      desc={item.desc}
    />
  ));
}

const MissionComp = ({ imgPath, title, desc }: MissionProps) => {
  return (
    <MotionDiv
      className="w-full flex flex-col bg-white border-zinc-100 shadow-shinny dark:bg-transparent dark:border-blue-900 dark:hover:bg-gradient-to-br from-black to-zinc-900 hover:border-[0.5px] space-y-8 p-4 h-[330px] rounded-md cursor-pointer mb-6"
      whileInView={{
        y: [-100, 0],
        opacity: [0, 1],
      }}
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-28 h-24 overflow-hidden  self-center flex items-center justify-center">
        <Image
          src={imgPath}
          fill
          // width={112}
          // height={96}
          alt="mission statement"
          className="object-contain w-auto h-auto"
        />
      </div>

      <div className="space-y-4 text-center">
        <p className="poppins gradient-text font-semibold text-2xl">
          -{title}-
        </p>
        <p className="p-text">{desc}</p>
      </div>
    </MotionDiv>
  );
};

const MissionSkeleton = () => {
  return (
    <MotionDiv
      className="relative w-full flex flex-col bg-gray-200 h-48 animate-pulse"
      whileInView={{
        y: [-100, 0],
        opacity: [0, 1],
      }}
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="absolute bottom-0 bg-gray-300 w-full h-36 flex flex-col space-y-4">
        <div className="w-full h-10 bg-gray-200" />
        <div className=" w-full h-10 bg-gray-200" />
        <div className="w-full h-10 bg-gray-200" />
      </div>
    </MotionDiv>
  );
};
