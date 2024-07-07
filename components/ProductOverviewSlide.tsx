"use client";
import { FEATURES } from "@/constants";
import { cn } from "@/lib/utils";
import productBg from "@/public/flagship-product-bg.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { FeatureCard } from "./FeatureCard";
import { useInView, motion } from "framer-motion";

export const ProductOverviewSlide = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = (index: number) => {
    if (index >= currentIndex) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % FEATURES.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1) % FEATURES.length);
    }
  };

  return (<div 
      id="our-products" className="pt-10 pb-5 w-full px-6 sm:px-12 md:px-16 lg:px-24"><div className="flex flex-col gap-y-2 xl:w-1/2">
        <h2 className="text-xl font-semibold">Our Products</h2>
        <p className="text-pretty text-base font-medium text-gray-500">
          Unlock success with Superbio: where efficient data organization meets advanced AI
          assistance, empowering creators to thrive.
        </p>
      </div>
    <section
      ref={ref}
      className="relative flex w-full items-center justify-center sm:mt-[-14rem] sm:mb-[-18rem] my-[-20rem] xs:my-[-30rem] lg:-my-48"
    >
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={isInView ? { opacity: 1, x: "0%" } : { opacity: 0, x: "100%" }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className="flex w-full items-center justify-center sm:h-[100vh] md:h-[110vh] lg:h-[145vh] xl:h-[165vh]"
      >
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            onClick={() => handleNext(index)}
            className={cn(
              "absolute top-0 flex w-10/12 translate-y-1/2 cursor-pointer flex-col gap-y-20 transition-all duration-300 sm:w-3/5 lg:w-1/2",
              index === currentIndex && "translate-x-0 opacity-100",
              index === currentIndex - 1 && "translate-x-[-100%] scale-75 opacity-30",
              index === currentIndex + 1 && "translate-x-[100%] scale-75 opacity-30",
              index > currentIndex + 1 && "translate-x-[200%]",
              index < currentIndex - 1 && "translate-x-[-200%]",
            )}
          >
            <div className="relative">
              <Image
                src={productBg}
                className="absolute -top-7 -z-10 scale-110 object-cover xs:-top-10 md:-top-16"
                alt="background"
              />
              <Image
                src={feature.image}
                className="main-card rounded-md object-cover"
                alt="background"
              />
            </div>
            <FeatureCard title={feature.title} description={feature.description} />
          </div>
        ))}
      </motion.div>
    </section></div>
  );
};
