"use client";

import Arrow from "@/app/components/Arrow";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type SubTitle = {
  japanese: string;
  english: string;
  tags: string[];
};

type Slide = {
  titleJapanese: string;
  title: string;
  description: string;
  subTitles: SubTitle[];
};

const slides: Slide[] = [
  {
    titleJapanese: "デザイン",
    title: "DESIGN",
    description:
      "Webデザインを中心に、さまざまなプロダクト（デジタル・紙等）のデザインを手がけてきました。経験上、デザインアプリを幅広く使いこなせます。",
    subTitles: [
      {
        japanese: "アプリケーション",
        english: "APPLICATION",
        tags: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
      },
      {
        japanese: "クリエイティブデザイン",
        english: "CREATIVE ASSETS",
        tags: [
          "Web Site",
          "Web Animation",
          "Logo Design",
          "Banner",
          "Print",
          "Movies",
        ],
      },
    ],
  },
  {
    titleJapanese: "フロントエンド",
    title: "FRONTEND",
    description:
      "フロントエンド開発は、HTML/CSS/Javascriptの基本はもちろん、React、Next.jsといった最新技術を駆使して、ウェブサイトやアプリの見た目と使い心地を作り上げます。",
    subTitles: [
      {
        japanese: "基本",
        english: "BASIC",
        tags: ["HTML5", "CSS3", "Javascript"],
      },
      {
        japanese: "ユーザーインターフェイス",
        english: "USER INTERFACE",
        tags: ["React", "Next.js", "TailwindCSS"],
      },
      {
        japanese: "その他",
        english: "OTHERS",
        tags: ["Git", "Vercel", "React Native"],
      },
    ],
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
    <div className="flex h-full relative">
      <div className="w-full relative overflow-y-auto overflow-x-hidden hide-scrollbar flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex flex-col text-primary"
          >
            <h2 className="flex flex-col border-b border-b-light pb-sp-[18] md:pb-tablet-[20] lg:pb-pc-[30]">
              <span className="font-notosansjp leading-none text-sp-[12] mb-sp-[6] md:text-tablet-[10] md:mb-tablet-[4] lg:text-pc-[10] lg:mb-pc-[4]">
                {slides[currentIndex].titleJapanese}
              </span>
              <em className="font-inter leading-none text-sp-[20] md:text-tablet-[24] lg:text-pc-[24]">
                {slides[currentIndex].title}
              </em>
            </h2>
            <div className="pt-sp-[18] px-sp-[18] md:pt-tablet-[30] md:px-tablet-[30] lg:pt-pc-[30] lg:px-pc-[30]">
              <p className="text-sp-[14] leading-sp-[22] md:text-tablet-[18] md:leading-tablet-[32] lg:text-pc-[18] lg:leading-pc-[32]">
                {slides[currentIndex].description}
              </p>
              <div className="mt-sp-[14] md:mt-tablet-[20] lg:mt-pc-[20]">
                {slides[currentIndex].subTitles.map((subTitle, index) => (
                  <div
                    key={index}
                    className="mb-sp-[18] md:mb-tablet-[20] lg:mb-pc-[20]"
                  >
                    <h3 className="flex flex-col mb-sp-[8] md:mb-tablet-[8] lg:mb-pc-[8]">
                      <span className="font-notosansjp text-sp-[10] md:text-tablet-[8] md:mb-tablet-[2] lg:text-pc-[8] lg:mb-pc-[2]">
                        {subTitle.japanese}
                      </span>
                      <em className="text-sp-[16] md:text-tablet-[18] lg:text-pc-[18]">
                        {subTitle.english}
                      </em>
                    </h3>
                    <div className="flex flex-wrap gap-sp-[6] md:gap-tablet-[6] lg:gap-pc-[6]">
                      {subTitle.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="border boder-primary px-sp-[8] py-sp-[6] text-sp-[12] md:px-tablet-[8] md:py-tablet-[6] md:text-tablet-[12] lg:px-pc-[8] lg:py-pc-[6] lg:text-pc-[12]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={prevSlide}
        className="absolute -l-sp-[18] md:-l-tablet-[24] lg:-l-pc-[40] top-1/2 transform -translate-y-1/2"
      >
        <Arrow style="left" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute -r-sp-[18] md:-r-tablet-[24] lg:-r-pc-[40] top-1/2 transform -translate-y-1/2"
      >
        <Arrow style="right" />
      </button>
    </div>
  );
}
