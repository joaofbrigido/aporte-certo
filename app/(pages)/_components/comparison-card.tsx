"use client";

import { AnimateContent } from "@/app/components/shared/animate-content";
import { cn } from "@/app/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";

export const ComparisonCard = ({
  highline,
  title,
  list,
}: {
  highline?: boolean;
  title: string;
  list: string[];
}) => {
  return (
    <AnimateContent
      config={{
        className: cn(
          "border-2 text-white p-6 rounded-2xl space-y-8 border-stone-500",
          highline && "border-primary"
        ),
      }}
    >
      <div className="flex justify-between gap-4 items-center">
        <h4 className="font-bold text-2xl">{title}</h4>
        {highline ? (
          <CircleCheck size={28} className="text-primary" />
        ) : (
          <CircleX size={28} className="text-stone-400" />
        )}
      </div>

      <ul className="space-y-2">
        {list.map((item, idx) => (
          <li
            key={`comparison-item-${idx}`}
            className="list-disc ml-6 font-normal text-white/90"
          >
            {item}
          </li>
        ))}
      </ul>
    </AnimateContent>
  );
};
