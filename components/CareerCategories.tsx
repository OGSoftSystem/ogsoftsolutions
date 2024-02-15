"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { X, XCircle } from "lucide-react";
import { jobs } from "@/constants/career";
import Link from "next/link";

const CareerCategories = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setShowModal(true)}
        size="lg"
        className="bg-APP_BTN_BLUE text-white"
      >
        Explore Categories
      </Button>
      {showModal ? (
        <div className="w-full flex flex-col h-[calc(100vh-45vh)] rounded-md bg-black/10 z-10 shadow-md absolute inset-x-0 inset-y-0 p-2">
          <X
            className="w-8 h-8 self-end text-white cursor-pointer"
            onClick={() => setShowModal(false)}
          />
          <div className="self-center w-11/12 md:w-8/12 flex flex-col items-center bg-APP_BTN_BLUE rounded-md z-20">
            <h3 className="text-center text-xl md:text-3xl poppins text-gray-300 p-2">
              Available Categories
            </h3>
            <ul className="flex flex-col gap-4 my-4">
              {jobs.map((item) => {
                return (
                  <li
                    className="text-gray-300 hover:text-gray-400 ease-in duration-300 cursor-pointer nunito"
                    key={item.ref}
                  >
                    <Link href={`/career/openings/${item.job}`}>{item.job}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CareerCategories;
