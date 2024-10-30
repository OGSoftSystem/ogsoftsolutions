"use client";

import { CustomLink } from "../shared/CustomButton";

const CallToAction = () => {
  return (
    <div className="flex flex-col xxs:flex-row gap-4 items-center xxs:self-start">
      <CustomLink
        title="Megatron for free"
        href="https://megatronhms.com/#!/home/start"
        target="_blank"
        className="bg-APP_BTN_BLUE hover:bg-blue-700"
        variant="gooeyLeft"
      />

      <CustomLink
        title="Contact Us &rarr;"
        href="#footer"
        className=" bg-blue-500 hover:bg-blue-400 "
        variant="gooeyRight"
      />
    </div>
  );
};

export default CallToAction;
