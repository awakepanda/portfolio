"use client";

import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function AnimationReactSpring() {
  const [isSecondShape, setIsSecondShape] = useState(true);

  const shape2 =
    "M118.382 182.465C119.175 180.623 121.277 179.731 123.152 180.44C126.26 181.614 131.748 183.547 138.624 185.056C143.906 186.069 150.434 186.85 158 186.85C169.758 186.85 180.69 184.709 191.56 180.455C193.41 179.732 195.502 180.575 196.333 182.379C197.369 184.629 195.944 186.681 193.949 187.624C182.914 192.839 170.111 194.766 158 194.766C150.387 194.766 143.232 193.739 137.122 192.405C127.024 190.46 121.021 187.714 120.265 187.357C120.022 187.241 116.997 185.684 118.382 182.465Z";

  const shape3 =
    "M158.859 223.279C189.627 223.279 195.864 197.395 195.864 182.947C195.864 168.5 173.827 163.068 158.859 163.068C143.89 163.068 121.509 166.391 121.022 182.947C120.535 199.503 128.09 223.279 158.859 223.279Z";

  const { d } = useSpring({
    d: isSecondShape ? shape2 : shape3,
    config: { duration: 2000, easing: (t) => t * (2 - t) }, // カスタムイージング関数
  });

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
          <animated.path d={d} fill="white" />
        </svg>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          改善されたSVGモーフィング（②⇔③）
        </h1>
        <p className="mb-4">
          ボタンをクリックして②と③の間でゆっくりモーフィングします。
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
