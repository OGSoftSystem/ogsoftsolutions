import Board from "@/components/Board";
import DashboardTopItems from "@/components/atom/DashboardTopItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <section className="paddingY paddingX">
      {/* Top */}
      <DashboardTopItems />

      <Board />
      {/* <IntroCard /> */}
    </section>
  );
};

export default DashboardPage;
