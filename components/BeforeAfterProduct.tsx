"use client";
import afterProductBg from "@/public/after-product-bg.png";
import afterProduct from "@/public/after-product.png";
import beforeProduct from "@/public/before-product.png";
import { motion, useInView } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { FeatureCard } from "./FeatureCard";

export const BeforeAfterProduct = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      className="mt-72 flex h-[175vh] w-full flex-col items-center justify-center gap-y-10 px-6 xs:mt-[30rem] xs:px-10 sm:mt-[30rem] sm:gap-x-2 sm:px-24 md:mt-0 md:h-[200vh] md:flex-row md:gap-x-4 md:gap-y-0 md:px-16 lg:h-screen lg:px-24 xl:mt-auto xl:gap-x-8"
    >
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ delay: 0.125, duration: 1, type: "spring" }}
        className="flex h-full w-full flex-col justify-center gap-y-14 md:w-1/2"
      >
        <div className="flex flex-col justify-center gap-y-2">
          <h3 className="text-xl font-semibold sm:whitespace-nowrap">Before - Superbio</h3>
          <p className="text-base font-medium leading-7 tracking-tight text-neutral-400">
            Before Superbio, influencer data management was manual, tedious, and lacked AI
            assistance.
          </p>
        </div>
        <div className="main-card relative aspect-[4/3] w-full rounded-md bg-white">
          <Image
            src={beforeProduct}
            alt="before-product"
            className="absolute left-[15%] top-1/4 z-10 h-full border border-black object-cover object-left-top"
          />
          <Image
            src={beforeProduct}
            alt="before-product"
            className="absolute h-full rounded-md object-cover object-left-top blur-[1px]"
          />
        </div>
        <FeatureCard
          className="bg-neutral-300 text-black"
          title="feature 1"
          description="Enhanced Data Organization: Superbio provides a centralized platform for efficiently organizing influencer data, reducing manual efforts and ensuring data integrity."
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ delay: 0.25, duration: 1, type: "spring" }}
        className="h-fit w-fit"
      >
        <ArrowRightIcon className="size size-14 rotate-90 md:block md:rotate-0" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ delay: 0.375, duration: 1, type: "spring" }}
        className="flex h-full w-full flex-col justify-center gap-y-14 md:w-1/2"
      >
        <div className="flex flex-col justify-center gap-y-2">
          <h3 className="text-xl font-semibold sm:whitespace-nowrap">After - Superbio</h3>
          <p className="text-base font-medium leading-7 tracking-tight text-neutral-400">
            With Superbio, influencer data management is streamlined, efficient, and AI-powered.
          </p>
        </div>
        <div className="main-card relative aspect-[4/3] w-full rounded-md bg-white">
          <Image
            src={afterProduct}
            alt="after-product"
            className="absolute left-[15%] top-1/4 z-10 h-full border border-black object-cover object-left-top"
          />
          <Image
            src={afterProductBg}
            alt="after-product-bg"
            className="absolute h-full rounded-md object-cover object-left-top blur-[1px]"
          />
        </div>
        <FeatureCard
          className="bg-neutral-300 text-black"
          title="feature 2"
          description="Advanced AI Assistance: Superbio utilizes AI algorithms to analyze influencer data, providing valuable insights and recommendations for optimizing campaign strategies and maximizing ROI."
        />
      </motion.div>
    </section>
  );
};
