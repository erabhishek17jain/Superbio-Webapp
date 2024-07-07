"use client";
import { WhySuperbioList, WhySuperbioListProps } from "@/constants";
import { scrollToElementById } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const WhyCard = ({ title, icon, text }: WhySuperbioListProps) => {
  return (
    <div className="why-box group col-span-1 flex flex-col gap-y-2 border border-black p-10 pb-4">
      <div className="flex items-center gap-x-2 group-hover:invert">
        <Image src={icon} alt="logo" className="h-10 w-10" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-pretty text-lg font-medium text-gray-500 group-hover:text-gray-200">
        {text}
      </p>
      <div className="mt-10 flex w-full items-center justify-end gap-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:invert">
        <button
          onClick={() => scrollToElementById("contact-us")}
          className="text-sm font-semibold uppercase"
        >
          Contact Us
        </button>
        <ArrowRightIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export const WhySuperbio = () => {
  return (
    <section
      id="why-LOQO ai"
      className="mt-[30rem] flex h-screen flex-col justify-center lg:mt-40"
    >
      <div className="flex flex-col gap-y-2 xl:w-1/2">
        <h2 className="text-3xl font-semibold">Why Choose LOQO ai?</h2>
        <p className="text-pretty text-lg font-medium text-gray-500">
          Maxwell&apos;s equations—the foundation of classical electromagnetism—describe light as a
          wave that moves
        </p>
      </div>
      <div className="mt-20 grid grid-cols-1 gap-14 md:grid-cols-2">
        {WhySuperbioList.slice(0, 4).map((why: WhySuperbioListProps, index) => (
          <WhyCard key={index} {...why} />
        ))}
      </div>
    </section>
  );
};
