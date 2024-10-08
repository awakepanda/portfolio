"use client";

import Arrow from "@/app/components/Arrow";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const slides = [
  {
    titleJapanese: "デザイン",
    title: "DESIGN",
    description:
      "これは最初のスライドの説明文です。ここに詳細な情報を記載できます。",
  },
  {
    titleJapanese: "フロントエンド",
    title: "FRONTEND",
    description: "2番目のスライドの説明文です。さまざまな情報を記載できます。",
  },
];

export default function SkillsTextSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="flex h-full">
      <div className="w-full relative overflow-hiddenflex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex flex-col"
          >
            <h2 className="flex flex-col border-b border-b-light pb-pc-[46]">
              <span className="font-notosansjp leading-none text-pc-[10] mb-pc-[4]">
                {slides[currentIndex].titleJapanese}
              </span>
              <em className="font-inter leading-none text-pc-[24]">
                {slides[currentIndex].title}
              </em>
            </h2>
            <p className="block pt-pc-[80] px-pc-[30] text-pc-[18] leading-pc-[32]">
              {slides[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevSlide}
          className="absolute -l-pc-[40] top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <Arrow style="left" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute -r-pc-[40] top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <Arrow style="right" />
        </button>
      </div>
    </div>
  );
}
