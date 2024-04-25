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
    <Accordion type="single" collapsible>
      {QAndA.map((ques: QA) => (
        <AccordionItem key={ques.question} value={ques.answer}>
          <AccordionTrigger
            onClick={() => {
              setSelected(ques);
            }}
          >
            <p className={cn("text-3xl font-[700]")}>{ques.question}</p>
          </AccordionTrigger>
          {/* If the current question is selected, show its answer */}
          {selected === ques && (
            <AccordionContent>
              <p
                className={cn("font-cambay text-blue-600 font-[400] leading-8")}
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
