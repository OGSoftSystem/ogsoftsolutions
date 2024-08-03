import DashboardTopItems from "@/components/atom/DashboardTopItems";
import { DASHBOARD_NAVS } from "@/constants/dashboard-items";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <section className="paddingY paddingX ">
      <DashboardTopItems />

      {/* Dashboard Icons */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 ">
        <div className="grid items-center grid-cols-3 md:flex md:flex-wrap md:space-x-4 dark:bg-transparent">
          {DASHBOARD_NAVS.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.title}
                className="flex flex-col items-center my-2"
              >
                <div
                  className={cn(
                    "hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center justify-center cursor-pointer hover:size-20 hover:rounded-full p-2"
                  )}
                >
                  {
                    <item.Icon className="size-16 text-blue-900 dark:text-blue-100" />
                  }
                </div>
                <p className="p-text text-base">{item.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
