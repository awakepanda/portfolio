"use client";

import { useAnimationStore } from "@/store/animationStore";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect } from "react";

export default function Animation() {
  const controls = useAnimation();
  const {
    isRotating,
    completeRotation,
    isInitialAnimationComplete,
    completeInitialAnimation,
  } = useAnimationStore();

  const runInitialAnimation = useCallback(() => {
    controls
      .start({
        scale: [0, 1.2, 1],
        rotate: [0, 360, 0],
        transition: { duration: 2, ease: "easeInOut" },
      })
      .then(() => {
        completeInitialAnimation();
      });
  }, [controls, completeInitialAnimation]);

  useEffect(() => {
    runInitialAnimation();
  }, [runInitialAnimation]);

  useEffect(() => {
    if (isRotating) {
      controls
        .start({ rotate: 360, transition: { duration: 1, ease: "easeInOut" } })
        .then(() => {
          completeRotation();
        });
    } else {
      controls.set({ rotate: 0 });
    }
  }, [isRotating, isInitialAnimationComplete, controls, completeRotation]);

  return (
    <div className="h-full flex justify-center items-center">
      <motion.div
        animate={controls}
        className="w-7 h-7 bg-blue-500"
      ></motion.div>
    </div>
  );
}
