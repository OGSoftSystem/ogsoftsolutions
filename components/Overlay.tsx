"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PublicationProps } from "@/lib/validation";

const Overlay = ({imageUrl, title, detail}:PublicationProps) => {
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCloseModal(true);
    }, 60000);
  }, []);

  return (
    <div
      className={cn(
        "animate-in grid grid-cols-1 lg:grid-cols-2 absolute top-0 right-0 bottom-0 left-0 z-50 bg-white/80 dark:bg-black/50 items-center",
        closeModal && "hidden"
      )}
    >
      <div className="w-full h-[500px] md:h-full lg:w-[800px] relative">
        <Image
          src={imageUrl}
          alt="banner"
          fill
          className="object-contain"
        />
      </div>

      <div className="p-6 lg:pr-20 md:p-0 z-50 flex flex-col items-center  -mt-28 sm:-mt-24 md:-mt-44">
        <h1 className="text-3xl text-APP_BTN_BLUE dark:text-white text-center font-bold mb-4">
          {title}
        </h1>
        <p className="p-text hidden lg:block">
          {detail}
        </p>
        <Button
          onClick={() => setCloseModal(true)}
          className="btn bg-APP_BTN_BLUE mt-4 text-white md:w-20 lg:self-start"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Overlay;
