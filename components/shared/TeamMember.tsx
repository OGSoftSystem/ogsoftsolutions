import { cn } from "@/lib/utils";
import Image from "next/image";
import { TeamMemberProps } from "@/type/type";

const TeamMember = ({
  _id,
  photo,
  fullName,
  position,
  detail,
}: TeamMemberProps) => {
  return (
    <div className="relative cursor-pointer group overflow-hidden rounded-md max-h-[280px] min-h-[280px] shadow-lg w-fit">
      <Image
        src={photo}
        width={300}
        height={300}
        alt="team member"
        className="object-contain"
      />

      <div className="absolute left-0 bottom-0 w-full md:w-[60%] z-10 md:h-[90px] bg-white p-2 space-y-1 group-hover:inset-0 group-hover:w-full group-hover:h-full transition-all duration-300 ease-in group-hover:bg-black/70">
        <p className="poppins text-sm font-semibold text-zinc-950 group-hover:text-zinc-100">
          {fullName}
        </p>

        <p
          className={cn(
            "hidden group-hover:block text-zinc-100 text-light nunito text-[0.5rem] leading-6 font-light group-hover:text-zinc-100 "
          )}
        >
          {detail}
        </p>

        <p className="text-[12px] leading-[1rem] text-muted-foreground group-hover:text-zinc-100 group-hover:hidden">
          {position}
        </p>
      </div>
    </div>
  );
};

export default TeamMember;

export const TeamSkeleton = () => {
  return (
    <div className="relative cursor-pointer overflow-hidden rounded-md max-h-[280px] min-h-[280px] shadow-lg animate-pulse">
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

export const ZimTeamMember = async ({
  _id,
  photo,
  fullName,
  position,
  detail,
}: TeamMemberProps) => {
  return (
    <div className="relative cursor-pointer group overflow-hidden rounded-md max-h-[280px] min-h-[280px] shadow-lg">
      <Image
        src={photo}
        width={250}
        height={300}
        alt="team member"
        className="object-contain"
      />

      <div className="absolute left-0 bottom-0 w-full z-10 md:h-[90px] bg-white p-2 space-y-1 group">
        <p className="poppins text-sm font-semibold text-zinc-950">
          {fullName.trim()}
        </p>

        {/* <p
          className={cn(
            "hidden group-hover:block text-zinc-100 text-light nunito text-[0.5rem] leading-6 font-light group-hover:text-zinc-100 "
          )}
        >
          {detail}
        </p> */}

        <p className="text-[12px] leading-[1rem] text-muted-foreground group-hover:text-zinc-900">
          {position}
        </p>
      </div>
    </div>
  );
};
