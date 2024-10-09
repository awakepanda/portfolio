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
      <div className="w-full relative overflow-y-auto overflow-x-hidden custom-scrollbar flex items-center justify-center">
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
            <h2 className="flex flex-col border-b border-b-light pb-pc-[30]">
              <span className="font-notosansjp leading-none text-pc-[10] mb-pc-[4]">
                {slides[currentIndex].titleJapanese}
              </span>
              <em className="font-inter leading-none text-pc-[24]">
                {slides[currentIndex].title}
              </em>
            </h2>
            <div className="pt-pc-[30] px-pc-[30]">
              <p className=" text-pc-[18] leading-pc-[32]">
                {slides[currentIndex].description}
              </p>
              <div className="mt-pc-[20]">
                {slides[currentIndex].subTitles.map((subTitle, index) => (
                  <div key={index} className="mb-pc-[20]">
                    <h3 className="flex flex-col mb-pc-[8]">
                      <span className="font-notosansjp text-pc-[8] mb-pc-[2]">
                        {subTitle.japanese}
                      </span>
                      <em className="text-pc-[18]">{subTitle.english}</em>
                    </h3>
                    <div className="flex flex-wrap gap-pc-[6]">
                      {subTitle.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="border boder-primary px-pc-[8] py-pc-[6] text-pc-[12]"
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
        className="absolute -l-pc-[40] top-1/2 transform -translate-y-1/2"
      >
        <Arrow style="left" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute -r-pc-[40] top-1/2 transform -translate-y-1/2"
      >
        <Arrow style="right" />
      </button>
    </div>
  );
}
