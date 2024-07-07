"use client";
import productAnalyticsLeft from "@/public/product-analytics-left.png";
import productAnalyticsRight from "@/public/product-analytics-right.png";
import productHomepage from "@/public/product-homepage.png";
import { useInView, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ContactUsForm } from "./ContactUsForm";

export const ContactUs = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      id="contact-us"
      className="-mt-28 xs:mt-0 flex h-3/5 w-full flex-col-reverse items-center justify-between overflow-hidden md:mt-32 sm:flex-row md:h-2/3 lg:h-3/5"
    >
      <ContactUsForm parentRef={ref} />
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className="relative hidden sm:block sm:w-1/3 md:w-1/2"
      >
        <ProductShowcase />
      </motion.div>
    </section>
  );
};

const ProductShowcase = () => {
  return (
    <div className="absolute -mt-20 hidden translate-x-[15%] translate-y-[15%] rotate-[-15deg] flex-col gap-y-7 sm:relative sm:flex md:mt-60">
      <div className="ml-auto flex w-full justify-end gap-x-4 sm:translate-x-24 md:translate-x-28 xl:translate-x-5">
        <Image
          src={productAnalyticsLeft}
          alt="product-image"
          className="main-card h-auto w-56 rounded-md"
        />
        <Image
          src={productAnalyticsRight}
          alt="product-image"
          className="main-card h-auto w-56 rounded-md"
        />
      </div>
      <div className="w-[20rem] md:w-[60rem]">
        <Image
          src={productHomepage}
          alt="product-image"
          className="main-card h-auto w-auto rounded-md"
        />
      </div>
    </div>
  );
};
