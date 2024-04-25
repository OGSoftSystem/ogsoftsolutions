"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { X, XCircle } from "lucide-react";
import { jobs } from "@/constants/career";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { MotionDiv } from "./atom/Motion";

const CareerCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex gap-4">
        <Button
          onClick={() => setShowModal(true)}
          size="lg"
          className="bg-APP_BTN_BLUE text-white"
        >
          Explore
        </Button>

        <Button
          asChild
          variant="ghost"
          className={cn("hidden", {
            block:
              session?.user?.role === "admin" ||
              session?.user?.role === "super-admin",
          })}
        >
          <Link href="/career/create">Create</Link>
        </Button>
      </div>
      {showModal ? (
        <MotionDiv
          className="w-full flex flex-col h-[calc(100vh-60vh)] rounded-md bg-black/10 z-10 shadow-md absolute inset-x-0 inset-y-0 p-2"
          animate={{ y: [100, 0] }}
          transition={{ duration: 0.3 }}
        >
          <X
            className="w-8 h-8 self-end text-white cursor-pointer"
            onClick={() => setShowModal(false)}
          />
          <div className="self-center w-11/12 md:w-8/12 flex flex-col items-center bg-APP_BTN_BLUE rounded-md z-20">
            <h3 className="text-center text-xl md:text-3xl poppins text-gray-300 p-2">
              Available Categories
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
              {jobs.map((item) => {
                return (
                  <li
                    className="text-gray-300 hover:text-gray-400 ease-in duration-300 cursor-pointer nunito"
                    key={item.ref}
                  >
                    <Link href={`/career/openings/${item.job}`}>
                      {item.job}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </MotionDiv>
      ) : null}
    </div>
  );
};

export default CareerCategories;
