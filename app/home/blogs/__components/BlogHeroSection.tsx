"use client";

import logo from "@/public/logo.svg";
import Image from "next/image";

const FEATURES = [
  {
    name: "Category 1",
    icon: logo,
  },
  {
    name: "Category 2",
    icon: logo,
  },
  {
    name: "Category 3",
    icon: logo,
  },
  {
    name: "Category 4",
    icon: logo,
  },
];

export const BlogHeroSection = () => {
  return (
    <section className="flex items-center justify-between py-10 pl-1 text-center">
      <div className="z-10 flex flex-col gap-y-4 text-left md:w-3/4">
        <div className="flex flex-col gap-y-4">
          <p className="text-2xl font-medium leading-[1.25] sm:whitespace-nowrap">Our blogs</p>
        </div>
        <p className="text-md text-pretty font-medium text-neutral-500">
          Stay informed with our latest articles on influencer marketing trends, tips, and case
          studies.
        </p>
        <div className="mr-auto mt-10 grid grid-cols-2 place-content-start gap-x-8 gap-y-4 md:grid-cols-4">
          <button className="hero-button col-span-1 flex w-fit min-w-fit items-center whitespace-nowrap bg-white px-5 py-3 text-left text-xs font-medium shadow-xl shadow-border drop-shadow-sm hover:invert">
            <Image src={FEATURES[0].icon} className="mr-2 h-4 w-4" alt="icon" />
            {FEATURES[0].name}
          </button>
          <button className="hero-button col-span-1 flex w-fit min-w-fit items-center whitespace-nowrap bg-white px-5 py-3 text-left text-xs font-medium shadow-xl shadow-border drop-shadow-sm hover:invert">
            <Image src={FEATURES[1].icon} className="mr-2 h-4 w-4" alt="icon" />
            {FEATURES[1].name}
          </button>
          <button className="hero-button col-span-1 flex w-fit min-w-fit items-center whitespace-nowrap bg-white px-5 py-3 text-left text-xs font-medium shadow-xl shadow-border drop-shadow-sm hover:invert">
            <Image src={FEATURES[2].icon} className="mr-2 h-4 w-4" alt="icon" />
            {FEATURES[2].name}
          </button>
          <button className="hero-button col-span-1 flex w-fit min-w-fit items-center whitespace-nowrap bg-white px-5 py-3 text-left text-xs font-medium shadow-xl shadow-border drop-shadow-sm hover:invert">
            <Image src={FEATURES[3].icon} className="mr-2 h-4 w-4" alt="icon" />
            {FEATURES[3].name}
          </button>
        </div>
      </div>
    </section>
  );
};
