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
    <h1 className="text-4xl 3xs:text-5xl xxs:text-[3.5rem] xxs:leading-[2.9rem] sm:text-6xl sm:leading-[3.5rem] md:text-6xl md:leading-[3.5rem] lg:text-7xl lg:leading-[4rem] font-poppins leading-[2.5rem] gradient-text md:mb-10 lg:mb-2">
      Meet Africa&apos;s finest in <br />
      <TextTransition
        springConfig={presets.wobbly}
        className={cn("text-blue-800")}
      >
        {TEXTS[index % TEXTS.length]}
      </TextTransition>
    </h1>
  );
};

export default DynamicText;
