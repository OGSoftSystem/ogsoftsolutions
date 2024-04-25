"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="w-full h-screen justify-center flex items-center">
      <div className="flex flex-col items-center  justify-center p-6 rounded-md gap-2">
        <h2 className="heading-text">Oops, something went wrong</h2>
        <p className="p-text max-w-[40ch]">{error.message}</p>
        <Button
          size="lg"
          className="bg-APP_BTN_BLUE hover:bg-blue-700 dark:text-white"
          onClick={() => reset()}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Error;
