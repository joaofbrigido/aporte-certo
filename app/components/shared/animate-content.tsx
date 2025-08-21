"use client";

import { HTMLMotionProps, motion } from "motion/react";

export const AnimateContent = ({
  config,
  children,
  as = "div",
}: {
  children: React.ReactNode;
  config?: HTMLMotionProps<"div">;
  as?: keyof React.JSX.IntrinsicElements;
}) => {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const defaultConfig = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: 0.3, duration: 0.4 },
  } as HTMLMotionProps<"div">;

  return (
    <MotionTag {...defaultConfig} {...config}>
      {children}
    </MotionTag>
  );
};
