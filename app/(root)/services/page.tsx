import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Metadata } from "next";
import Megatron from "./_components/Megatron";
import MegaCare from "./_components/MegaCare";
import Ogcoin from "./_components/Ogcoin";

export const metadata: Metadata = {
  title: "Services",
};
const page = () => {
  return (
    <section>
      <MaxWidthContainer className="paddingY">
        <Megatron />
        <MegaCare />
        <Ogcoin />
      </MaxWidthContainer>
    </section>
  );
};

export default page;
