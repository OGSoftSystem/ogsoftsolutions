import { cn } from "@/lib/utils";
import Image from "next/image";
import EditTab from "./EditTab";
import { TeamMemberProps } from "@/type/type";
import Link from "next/link";

const TeamMember = async ({
  _id,
  photo,
  fullName,
  position,
  detail,
}: TeamMemberProps) => {
  return (
    <Link
      href={`/dashboard/team/${_id}/edit`}
      className="relative cursor-pointer group overflow-hidden rounded-md max-h-[310px] min-h-[310px] shadow-lg"
    >
      <Image
        src={photo}
        width={400}
        height={330}
        alt="team member"
        className="object-contain"
      />

      <div className="absolute left-0 bottom-0 w-full md:w-[60%] z-10 md:h-[90px] bg-white p-2 space-y-1 group-hover:inset-0 group-hover:w-full group-hover:h-full transition-all duration-300 ease-in group-hover:bg-black/70">
        <p className="poppins text-sm font-semibold text-zinc-950 group-hover:text-zinc-100">
          {fullName}
        </p>

        <p
          className={cn(
            "hidden group-hover:block text-zinc-100 text-light nunito text-[0.6rem] leading-6 font-light group-hover:text-zinc-100 "
          )}
        >
          {detail}
        </p>

        <p className="text-[12px] leading-[1rem] text-muted-foreground group-hover:text-zinc-100 group-hover:hidden">
          {position}
        </p>
      </div>
      {/* <EditTab href={`/dashboard/team/${_id}`} /> */}
    </Link>
  );
};

export default TeamMember;

export const TeamSkeleton = () => {
  return (
    <div className="relative cursor-pointer overflow-hidden rounded-md max-h-[310px] min-h-[310px] shadow-lg animate-pulse">
      <div className="h-[300px] w-[400px] bg-gray-300" />

      <div className="absolute left-0 bottom-0 w-full md:w-[60%] z-10 md:h-[90px] bg-gray-100 p-2 space-y-1 group-hover:inset-0 group-hover:w-full group-hover:h-full transition-all duration-300 ease-in group-hover:bg-black/70">
        <p className="poppins text-sm font-semibold text-zinc-950 group-hover:text-zinc-100"></p>

        <p
          className={cn(
            "hidden group-hover:block text-zinc-100 text-light nunito text-[1rem] leading-6 font-light group-hover:text-zinc-100 "
          )}
        ></p>

        <p className="text-[12px] leading-[1rem] text-muted-foreground group-hover:text-zinc-100 group-hover:hidden"></p>
      </div>
      <div className="w-full bg-gray-400" />
    </div>
  );
};
