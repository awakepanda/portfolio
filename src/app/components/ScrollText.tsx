"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAnimationStore } from "@/store/animationStore";

export default function ScrollText() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAnimating, currentSegment } = useAnimationStore();

  const updateOrientation = () => {
    const newIsHorizontal = window.innerWidth <= 1024;
    setIsHorizontal(newIsHorizontal);
    return newIsHorizontal;
  };

  useEffect(() => {
    const handleResize = () => {
      const newIsHorizontal = updateOrientation();
      if (newIsHorizontal !== isHorizontal) {
        controls.stop();
        controls.set(newIsHorizontal ? { x: 0, y: 0 } : { x: 0, y: 0 });
        setTimeout(() => {
          controls.start(newIsHorizontal ? "horizontal" : "vertical");
        }, 0);
      }
    };

    updateOrientation();
    setIsInitialized(true);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [controls, isHorizontal]);

  useEffect(() => {
    if (isInitialized) {
      controls.start(isHorizontal ? "horizontal" : "vertical");
    }
  }, [isInitialized, isHorizontal, controls]);

  const repeatText = "WEB & MOBILE UI&UX　DESIGN FRONT-END DEVELOPMENT ".repeat(
    20,
  );

  const variants = {
    vertical: {
      y: ["-50%", "0%"],
      x: 0,
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        },
      },
    },
    horizontal: {
      x: ["-50%", "0%"],
      y: 0,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        },
      },
    },
  };

  if (!isInitialized) return null;

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <motion.div
        variants={variants}
        animate={controls}
        initial={false}
        className={`flex items-center ${
          isHorizontal ? "w-[200%] h-full" : "h-[200%] w-full flex-col"
        }`}
      >
        <p
          className={`font-inter font-thin text-light text-sp-[8] md:text-tablet-[16] lg:text-pc-[12] whitespace-nowrap ${
            isHorizontal ? "" : "vertical-rl"
          }`}
        >
          {repeatText}
        </p>
        <p
          className={`font-inter font-thin text-light text-sp-[8] md:text-tablet-[16] lg:text-pc-[12] whitespace-nowrap ${
            isHorizontal ? "" : "vertical-rl"
          }`}
        >
          {repeatText}
        </p>
      </motion.div>
    </div>
  );
}
