"use client";

import { WhySuperbioList, WhySuperbioListProps } from "@/constants";
import { cn } from "@/lib/utils";
import { useInView, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import { Button } from "./ui/button";

const LENGTH = WhySuperbioList.length;

const WhyCard = ({
  title,
  icon,
  text,
  parentRef,
  index,
}: WhySuperbioListProps & { parentRef: RefObject<HTMLElement>; index: number }) => {
  const isInView = useInView(parentRef, { once: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "100%" }}
      transition={{ delay: 0.075 * index, duration: 0.5, type: "spring" }}
      className="why-box group group col-span-1 flex h-[40vh] w-[80%] flex-col justify-between gap-y-5 border border-black px-6 py-12 xs:w-[65%] sm:h-[60vh] sm:w-5/12 lg:w-2/6 xl:w-[30%]"
    >
      <div className="flex items-center gap-x-2 group-hover:invert">
        <Image src={icon} alt="logo" className="h-12 w-12" />
      </div>
      <div className="flex flex-col gap-y-3">
        <h3 className="text-xl font-semibold group-hover:text-white">{title}</h3>
        <p className="text-pretty text-sm font-medium text-gray-500 group-hover:text-gray-200">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export const WhySuperbioNew = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const ref = useRef(null);
  const prevSlide = () => {
    if (currentIndex > 1) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const nextSlide = () => {
    if (currentIndex < LENGTH) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  return (
    <section
      ref={ref}
      id="why-LOQO ai"
      className="pt-10 pb-5 flex h-[75vh] flex-col justify-center sm:h-screen"
    >
      <div className="flex flex-col gap-y-2 xl:w-1/2">
        <h2 className="text-xl font-semibold">Why Choose LOQO ai?</h2>
        <p className="text-pretty text-base font-medium text-gray-500">
          Unlock success with Superbio: where efficient data organization meets advanced AI
          assistance, empowering creators to thrive.
        </p>
      </div>
      <div
        className="relative mt-20 flex w-full gap-14"
        onTouchStart={(e) => {
          touchStartX.current = e.changedTouches[0].screenX;
        }}
        onTouchMove={(e) => {
          touchEndX.current = e.changedTouches[0].screenX;
        }}
        onTouchEnd={() => {
          const xAxisMovement = touchStartX.current - touchEndX.current;
          if (xAxisMovement > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }}
      >
        {WhySuperbioList.map((why: WhySuperbioListProps, index) => (
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-300",
              index === currentIndex - 1 &&
                "translate-x-[0%] xs:translate-x-[0%]  sm:translate-x-[0%] lg:translate-x-[0%]",
              index === currentIndex &&
                "translate-x-[90%] xs:translate-x-[70%]  sm:translate-x-[50%] lg:translate-x-[35%]",
              index === currentIndex + 1 &&
                "translate-x-[180%] xs:translate-x-[140%]  sm:translate-x-[100%] lg:translate-x-[70%]",
              index < currentIndex - 1 &&
                "translate-x-[-180%] xs:translate-x-[-140%]  sm:translate-x-[-100%] lg:translate-x-[-70%]",
              index > currentIndex + 1 &&
                "translate-x-[300%] xs:translate-x-[240%]  sm:translate-x-[180%] lg:translate-x-[105%]",
              index > currentIndex + 2 && "hidden",
            )}
            key={index}
          >
            <WhyCard {...why} index={index} parentRef={ref} />
          </div>
        ))}
      </div>
      <div className="relative z-50 mt-auto flex w-full items-center justify-center gap-x-4">
        <Button
          variant="ghost"
          size="default"
          className="rounded-none border border-black bg-black text-white hover:bg-black hover:text-white hover:opacity-85"
          onClick={prevSlide}
          disabled={currentIndex === 1}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-none border border-black bg-black text-white hover:bg-black hover:text-white hover:opacity-85"
          onClick={nextSlide}
          disabled={currentIndex === WhySuperbioList.length}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </section>
  );
};
