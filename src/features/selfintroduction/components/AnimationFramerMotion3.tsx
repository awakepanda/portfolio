"use client";

import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const SVG_PARTS = {
  circle: {
    shape: (props: any) => (
      <animated.circle cx="50" cy="50" r="40" fill="blue" {...props} />
    ),
    animation: { r: 40, cx: 50, cy: 50 },
  },
  square: {
    shape: (props: any) => (
      <animated.rect
        x="10"
        y="10"
        width="80"
        height="80"
        fill="red"
        {...props}
      />
    ),
    animation: { width: 80, height: 80, x: 10, y: 10 },
  },
  triangle: {
    shape: (props: any) => (
      <animated.polygon points="50,10 90,90 10,90" fill="green" {...props} />
    ),
    animation: { points: ["50,10 90,90 10,90", "10,10 90,10 50,90"] },
  },
};

type SVGPartKey = keyof typeof SVG_PARTS;

export default function AnimationFramerMotion3() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPart, setCurrentPart] = useState<SVGPartKey>("circle");

  const animationProps = useSpring({
    to: async (next: any) => {
      while (isAnimating) {
        await next(SVG_PARTS[currentPart].animation);
        await next(SVG_PARTS[currentPart].animation);
      }
    },
    from: SVG_PARTS[currentPart].animation,
    reset: true,
    reverse: true,
    config: { duration: 2000 },
  });

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const changePart = (part: SVGPartKey) => {
    setCurrentPart(part);
    setIsAnimating(false);
  };

  const CurrentShape = SVG_PARTS[currentPart].shape;

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <CurrentShape {...animationProps} />
        </svg>
      </div>
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">
          SVGアニメーションコントロール
        </h2>
        <button
          onClick={toggleAnimation}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {isAnimating ? "アニメーション停止" : "アニメーション開始"}
        </button>
        <div className="space-y-2">
          <button
            onClick={() => changePart("circle")}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          >
            円に変更
          </button>
          <button
            onClick={() => changePart("square")}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          >
            四角形に変更
          </button>
          <button
            onClick={() => changePart("triangle")}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          >
            三角形に変更
          </button>
        </div>
      </div>
    </div>
  );
}
