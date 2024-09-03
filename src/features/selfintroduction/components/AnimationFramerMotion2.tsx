"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AnimationFramerMotion2() {
  const [isSecondShape, setIsSecondShape] = useState(true);

  const shape2 =
    "M118.382 182.465C119.175 180.623 121.277 179.731 123.152 180.44C126.26 181.614 131.748 183.547 138.624 185.056C143.906 186.069 150.434 186.85 158 186.85C169.758 186.85 180.69 184.709 191.56 180.455C193.41 179.732 195.502 180.575 196.333 182.379C197.369 184.629 195.944 186.681 193.949 187.624C182.914 192.839 170.111 194.766 158 194.766C150.387 194.766 143.232 193.739 137.122 192.405C127.024 190.46 121.021 187.714 120.265 187.357C120.022 187.241 116.997 185.684 118.382 182.465Z";

  const shape3 =
    "M158.859 223.279C189.627 223.279 195.864 197.395 195.864 182.947C195.864 168.5 173.827 163.068 158.859 163.068C143.89 163.068 121.509 166.391 121.022 182.947C120.535 199.503 128.09 223.279 158.859 223.279Z";

  // 手動で計算した中間状態
  const intermediateShape1 =
    "M138.62 202.872C154.401 202.872 176.296 195.3 185.212 191.752C194.128 188.204 195.904 184.577 195.864 182.947C195.824 181.317 184.827 172.559 158.859 172.559C132.891 172.559 121.509 174.975 121.022 182.947C120.535 190.919 122.839 202.872 138.62 202.872Z";
  const intermediateShape2 =
    "M148.74 213.076C169.014 213.076 185.58 206.348 190.538 187.35C195.496 168.352 184.343 167.814 158.859 167.814C133.375 167.814 126.446 170.683 121.022 182.947C115.598 195.211 128.466 213.076 148.74 213.076Z";

  const variants = {
    shape2: { d: shape2 },
    inter1: { d: intermediateShape1 },
    inter2: { d: intermediateShape2 },
    shape3: { d: shape3 },
  };

  const handleClick = () => {
    setIsSecondShape((prev) => !prev);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <svg
          width="316"
          height="316"
          viewBox="0 0 316 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="158" cy="158" r="158" fill="#13CF93" />
          <circle cx="128.479" cy="117.668" r="6.23684" fill="white" />
          <circle cx="186.689" cy="117.668" r="6.23684" fill="white" />
          <motion.path
            fill="white"
            initial="shape2"
            animate={
              isSecondShape
                ? ["shape2", "inter1", "inter2", "shape3"]
                : ["shape3", "inter2", "inter1", "shape2"]
            }
            variants={variants}
            transition={{
              duration: 1.5,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          改善されたモーフィングアニメーション（②⇔③）
        </h1>
        <p className="mb-4">
          ボタンをクリックして②と③の間でスムーズにモーフィングします。
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isSecondShape ? "③の形状へ" : "②の形状へ"}
        </button>
      </div>
    </div>
  );
}
