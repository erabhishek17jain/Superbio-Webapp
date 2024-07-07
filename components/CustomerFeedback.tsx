"use client";
import { CustomerFeedbackList, CustomerFeedbackListProps } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useInView, motion } from "framer-motion";

// spring
export const CustomerFeedback = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      id="customer-feedback"
      className="mt-40 flex xs:h-[120vh] w-full items-center justify-center px-6 sm:mt-60 sm:h-screen sm:px-12 md:mt-0 md:px-16 lg:mt-60 lg:px-24"
    >
      <div className="flex w-full flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "100%" }}
          transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          className="mb-40 flex w-full flex-col items-center gap-y-2 text-center lg:w-3/5"
        >
          <h2 className="whitespace-nowrap text-xl font-semibold">Customer Feedback</h2>
        </motion.div>
        <div className="flex w-full items-center justify-center">
          <FeedbackCardSlider parentRef={ref} />
        </div>
      </div>
    </section>
  );
};

const FeedbackCardSlider = ({ parentRef }: { parentRef: RefObject<HTMLElement> }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const isInView = useInView(parentRef, { once: true });
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === CustomerFeedbackList.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? CustomerFeedbackList.length - 1 : prev - 1));
  };

  return (
    <div className="flex w-full flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "100%" }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className="relative flex h-[75vh] w-full items-center justify-center"
      >
        {CustomerFeedbackList.map((feedback, index) => (
          <div
            key={index}
            className={cn(
              "absolute top-0 flex min-h-64 w-11/12 flex-col items-center justify-center border border-black bg-black p-8 font-medium text-white transition-all sm:w-3/4 md:w-4/6 lg:w-3/5 xl:w-2/5",
              index == currentSlide + 1 &&
                "translate-x-[105%] translate-y-[20%] bg-white text-sm font-normal text-black opacity-100",
              index == currentSlide - 1 &&
                "translate-x-[-105%] translate-y-[20%] bg-white text-sm font-normal text-black opacity-100",
              index > currentSlide + 1 && "translate-x-[200%] translate-y-[20%]",
              index < currentSlide - 1 && "translate-x-[-200%] translate-y-[20%]",
            )}
          >
            <FeedbackCard
              image={feedback.image}
              text={feedback.text}
              position={feedback.position}
              name={feedback.name}
              current={index === currentSlide}
            />
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "100%" }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
        className="relative -mt-60 flex gap-x-4 sm:-mt-24"
      >
        <Button
          variant="ghost"
          size="default"
          className="rounded-none border border-black bg-black text-white hover:bg-black hover:text-white hover:opacity-85"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-none border border-black bg-black text-white hover:bg-black hover:text-white hover:opacity-85"
          onClick={nextSlide}
          disabled={currentSlide === CustomerFeedbackList.length - 1}
        >
          <ArrowRightIcon />
        </Button>
      </motion.div>
    </div>
  );
};

const FeedbackCard = ({
  image,
  text,
  position,
  name,
  current,
}: CustomerFeedbackListProps & { current: boolean }) => {
  return (
    <>
      <div className="flex h-[45vh] max-h-72 min-h-60 w-full flex-col items-center justify-center gap-y-6 overflow-auto pt-8 sm:h-auto">
        <p className="flex w-full items-center justify-center gap-y-4 text-pretty text-center">
          “{text}”
        </p>
        <div className="w-full text-center">
          <p className="whitespace-nowrap text-xs font-semibold uppercase">{name}</p>
          <p className="whitespace-nowrap text-xs capitalize text-neutral-400">{position}</p>
        </div>
      </div>
      <div
        className={cn(
          "absolute left-1/2 top-0 size-24 -translate-x-1/2 -translate-y-[60%] overflow-hidden border-4 border-white",
          !current && "rounded-lg border-white",
        )}
      >
        <Image src={image} className="size-24 object-cover object-top" alt="image" />
      </div>
    </>
  );
};
