"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { QAndA } from "@/constants/q-and-a";
import { cn } from "@/lib/utils";
import { QA } from "@/type/type";
import { useState } from "react";

const FaQAccordion = () => {
  const [selected, setSelected] = useState<QA | null>(null);

  return (
    <Accordion type="single" collapsible className="p-4">
      {QAndA.map((ques: QA) => (
        <AccordionItem key={ques.question} value={ques.answer}>
          <AccordionTrigger
            onClick={() => {
              setSelected(ques);
            }}
            className="bg-APP_BTN_BLUE/10 p-4 rounded-md my-1"
          >
            <p className={cn("text-[16px] font-nunito-regular")}>
              {ques.question}
            </p>
          </AccordionTrigger>
          {/* If the current question is selected, show its answer */}
          {selected === ques && (
            <AccordionContent>
              <p
                className={cn(
                  "text-blue-600 text-[1rem] font-nunito-regular leading-8"
                )}
              >
                {ques.answer}
              </p>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaQAccordion;
