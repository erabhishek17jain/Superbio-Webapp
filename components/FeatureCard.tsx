"use client";
import { cn } from "@/lib/utils";
import { ChevronUpIcon } from "lucide-react";
import { HTMLAttributes } from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

export const FeatureCard = ({ title, description, className }: FeatureCardProps) => {
  return (
    <div
      className="w-full"
      style={{
        boxShadow: "0px 14px 36.400001525878906px 0px #0604180F",
      }}
    >
      <div
        className={cn(
          "flex w-full items-center bg-black px-8 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-200",
          className,
        )}
      >
        {title}
        <ChevronUpIcon className="ml-auto" />
      </div>
      <p className="w-full bg-white p-5 text-left text-sm tracking-wide md:px-8">{description}</p>
    </div>
  );
};
