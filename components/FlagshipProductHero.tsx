"use client";
import flagShipProductBg from "@/public/flagship-product-bg.png";
import flagShipProduct from "@/public/product-homepage.png";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useWindowSize } from "./BlogsClient";

export const FlagshipProductHero = () => {
  const windowWidth = useWindowSize();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      id="flagship-product"
      className="mt-0 flex h-[125vh] w-full flex-col items-center justify-center xs:-mt-40 sm:mt-32 md:h-screen lg:mt-96"
    >
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
        transition={{ delay: 0, duration: 0.25, type: "spring" }}
        className="flex w-full flex-col items-center justify-center gap-y-2"
      >
        <h2 className="text-center text-xl font-semibold text-black">
          Our Flagship Product - Superbio
        </h2>
      </motion.div>

      <motion.div
        initial={{ y: "100%", scale: 0 }}
        animate={
          isInView ? { y: 0, scale: windowWidth < 640 ? "85%" : "75%" } : { y: "100%", scale: 0 }
        }
        transition={{ delay: 0.1, duration: 1, type: "spring" }}
        className="relative mt-10 scale-100 sm:scale-90 md:-mt-10 md:scale-75"
      >
        <Image
          src={flagShipProductBg}
          className="absolute -top-10 -z-10 scale-110 object-cover sm:-top-16 md:-top-28"
          alt="background"
        />
        <Image
          src={flagShipProduct}
          className="main-card rounded-xl object-cover"
          alt="background"
        />
      </motion.div>
    </section>
  );
};
