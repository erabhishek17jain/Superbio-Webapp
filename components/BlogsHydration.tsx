"use client";

import { motion, useInView } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlogsClient } from "./BlogsClient";
import { Skeleton } from "./ui/skeleton";

export const BlogsHydration = () => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section
        ref={ref}
        id="blogs"
        className="relative flex w-full flex-col items-center justify-center gap-5 px-6 xs:px-12 sm:px-8 md:px-12 lg:px-16"
      >
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "100%" }}
          transition={{ delay: 0, duration: 0.5, type: "spring" }}
          className="mr-auto flex w-full flex-col gap-y-3"
        >
          <h3 className="text-xl font-semibold text-black">Our blogs</h3>
          <p className="text-md w-full font-medium text-neutral-500 sm:w-3/4 lg:w-3/5 xl:w-1/2">
            Maxwell&apos;s equations—the foundation of classical electromagnetism—describe light as
            a wave that moves
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "100%" }}
          transition={{ delay: 0, duration: 0.25, type: "spring" }}
          className="grid w-full grid-cols-1 gap-x-4 sm:grid-cols-2 md:gap-x-10 xl:grid-cols-3"
        >
          <BlogCard />
        </motion.div>
        <div className="flex gap-x-4">
          <Skeleton className="rounded-none border bg-black px-5 hover:bg-black hover:opacity-85">
            <ArrowLeftIcon className="size-5" />
          </Skeleton>
          <Skeleton className="rounded-none border bg-black px-5 hover:bg-black hover:opacity-85">
            <ArrowRightIcon className="size-5" />
          </Skeleton>
        </div>
      </section>
    );
  }

  return <BlogsClient />;
};

export const BlogCard = () => {
  return (
    <Skeleton className="group col-span-1 flex w-full flex-col gap-y-5 rounded p-6 transition-all">
      <Skeleton className="aspect-[5/4] w-full border-2 contrast-75"></Skeleton>
      <Skeleton className="h-32 w-full contrast-[0.85]">
        <Skeleton className="text-sm font-medium uppercase"></Skeleton>
        <Skeleton className="text-xs capitalize"></Skeleton>
        <Skeleton className="mt-2 text-[0.7rem]"></Skeleton>
        <Skeleton className="mt-auto flex gap-x-2 p-0 text-xs font-medium uppercase hover:opacity-85"></Skeleton>
      </Skeleton>
    </Skeleton>
  );
};
