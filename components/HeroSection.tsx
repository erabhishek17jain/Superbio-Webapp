"use client";
import { HeroSectionFeatures } from "@/constants";
import { scrollToElementById } from "@/lib/utils";
import productShowcase from "@/public/product-homepage.png";
import { motion, useInView } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { RefObject, useRef } from "react";

export const HeroLeft = ({ parentRef }: { parentRef: RefObject<HTMLElement> }) => {
  const isInView = useInView(parentRef, { once: true });
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "-100%" }}
      transition={{ delay: 0.5, duration: 1, type: "spring" }}
      className="z-10 flex flex-col gap-y-4 text-left md:w-1/2"
    >
      <div className="flex flex-col">
        <p className="text-2xl sm:whitespace-nowrap">
          Enabling<span className="font-semibold"> Growth </span>
          for
        </p>
        <p className="text-2xl sm:whitespace-nowrap">
          <span className="font-semibold">Influencer Marketing Agencies</span>
          <br /> with tech and AI Solutions
        </p>
      </div>
      <button
        onClick={() => scrollToElementById("flagship-product")}
        className="mt-8 flex w-fit items-center gap-x-2 border border-black bg-black px-10 py-3 text-sm font-semibold uppercase text-white shadow-xl shadow-border drop-shadow-sm transition-colors hover:bg-white hover:text-black"
      >
        Explore Our Solutions
        <ArrowRightIcon size={16} />
      </button>
      <div className="mt-10 flex gap-x-4">
        <div className="flex flex-col gap-y-4">
          <button
            disabled
            className="col-span-1 flex min-w-fit items-center whitespace-nowrap bg-white px-5 py-3 text-left text-sm font-medium shadow-xl shadow-border drop-shadow-sm"
          >
            <Image src={HeroSectionFeatures[0].icon} className="mr-2 h-4 w-4" alt="icon" />
            {HeroSectionFeatures[0].name}
          </button>
          <button
            disabled
            className="col-span-1 flex min-w-fit items-center whitespace-nowrap bg-white px-5 py-3 text-left text-sm font-medium shadow-xl shadow-border drop-shadow-sm"
          >
            <Image src={HeroSectionFeatures[1].icon} className="mr-2 h-4 w-4" alt="icon" />
            {HeroSectionFeatures[1].name}
          </button>
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            disabled
            className="col-span-1 flex min-w-fit items-center whitespace-nowrap bg-white px-5 py-3 text-left text-sm font-medium shadow-xl shadow-border drop-shadow-sm"
          >
            <Image src={HeroSectionFeatures[2].icon} className="mr-2 h-4 w-4" alt="icon" />
            {HeroSectionFeatures[2].name}
          </button>
          <button
            disabled
            className="col-span-1 flex min-w-fit items-center whitespace-nowrap bg-white px-5 py-3 text-left text-sm font-medium shadow-xl shadow-border drop-shadow-sm"
          >
            <Image src={HeroSectionFeatures[3].icon} className="mr-2 h-4 w-4" alt="icon" />
            {HeroSectionFeatures[3].name}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="flex items-center justify-between pb-6 pt-0 pl-1 text-center">
      <HeroLeft parentRef={ref} />
      <motion.div
        initial={{ opacity: 0, x: "100%", y: "50%" }}
        animate={
          isInView ? { opacity: 1, x: "45%", y: "20%" } : { opacity: 0, x: "100%", y: "-20%" }
        }
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className="hidden h-[83vh] md:block"
      >
        <Image
          src={productShowcase}
          alt="right-hero-Image"
          className="main-card rotate-[-15deg] scale-150 object-cover lg:scale-125"
        />
      </motion.div>
    </section>
  );
};
