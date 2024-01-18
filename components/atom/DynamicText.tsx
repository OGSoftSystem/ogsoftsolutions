"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Hospital Management",
  "Unified Payment",
  "Secure Services",
  "Quality output",
];

const DynamicText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="w-full md:-mt-20">
      <h1 className="text-[1.70rem] sm:text-4xl md:text-5xl lg:leading-[4.5rem] poppins-heading leading-[2.5rem] gradient-text">
        Meet Africa&apos;s finest in <br />
        <TextTransition
          springConfig={presets.wobbly}
          className={cn("text-blue-800")}
        >
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </h1>
    </div>
  );
};

export default DynamicText;
