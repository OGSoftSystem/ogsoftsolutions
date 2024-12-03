import { cn } from "@/lib/utils";
import { CustomReviewSchemaType } from "@/type/type";
import Image from "next/image";

const CustomerRemark = ({ logo, info, remark }: CustomReviewSchemaType) => {
  return (
    <section className="flex flex-col space-y-1 cursor-pointer h-fit lg:h-[198px] lg:relative p-2">
      <div className="w-full flex items-center space-x-2">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden relative bg-white dark:bg-gray-800">
          <Image
            src={logo}
            fill
            alt="customer logo"
            className="object-contain"
          />
        </div>

        <div className="flex-1">
          <p className="poppins text-sm font-semibold dark:text-gray-300">
            {info}
          </p>
        </div>
      </div>
      <span className="text-xs text-center">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</span>
      <p className="text-xl font-bold text-muted-foreground leading-tight">“</p>
      <p
        className={cn(
          "font-nunito-300 text-muted-foreground leading-tight tracking-tight text-left text-[0.9rem] self-start"
        )}
      >
        {remark}
      </p>

    </section>
  );
};

export default CustomerRemark;
