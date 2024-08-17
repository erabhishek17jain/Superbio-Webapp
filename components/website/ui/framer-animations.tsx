"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ReactNode, RefObject, useRef } from "react";

type AnimationProps = {
  children: ReactNode;
};

export const AnimateToLeftFromRight = ({ children }: AnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <motion.div
        style={{
          transform: isInView ? "none" : "translateX(150%)",
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};
