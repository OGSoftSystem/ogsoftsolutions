import NavItems from "./NavItems";
import { cn } from "@/lib/utils";

const MobileNav = ({ toggled }: { toggled: boolean }) => {
  return (
    <div
      className={cn("hidden", {
        "block absolute top-[64px] right-0 w-6/12 bg-gradient-to-br from-zinc-300 to-zinc-100 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-700 rounded-md items-end z-50  p-4":
          toggled,
      })}
    >
      <NavItems />
    </div>
  );
};

export default MobileNav;
