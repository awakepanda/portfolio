"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimationFramerMotion: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentState, setCurrentState] = useState<"smile" | "open" | "filled">(
    "smile",
  );
  const [pathD1, setPathD1] = useState("");
  const [isReversing, setIsReversing] = useState(false);

  const pathSmile =
    "M94.7998 158C94.7998 158 104.665 207.895 157.943 207.895C211.221 207.895 220.368 158 220.368 158";
  const pathOpen =
    "M119 181.5C125.167 184.333 141.7 190 158.5 190C175.3 190 191.167 184.333 197 181.5";
  const pathFilled =
    "M158.859 223.279C189.627 223.279 195.864 197.395 195.864 182.947C195.864 168.5 173.827 163.068 158.859 163.068C143.89 163.068 121.509 166.391 121.022 182.947C120.535 199.503 128.09 223.279 158.859 223.279Z";

  // アニメーションのタイミング設定
  const timings = {
    morphDuration: 0.6,
    fadeOutDuration: 0.3,
    fadeInDuration: 0.3,
    filledFadeOutDuration: 0.4, // ③のフェードアウト時間
    delayBeforeFilled: 300,
    delayBeforeReverse: 100, // リバースアニメーション開始までの遅延
    delayBeforeOpenToSmile: 400, // ②から①へのモーフィング開始までの遅延
  };

  useEffect(() => {
    const interpolatePath = (start: string, end: string, progress: number) => {
      const startPoints = start.match(/(-?\d+(\.\d+)?)/g)?.map(Number) || [];
      const endPoints = end.match(/(-?\d+(\.\d+)?)/g)?.map(Number) || [];
      const interpolatedPoints = startPoints.map((start, index) => {
        const end = endPoints[index];
        return start + (end - start) * progress;
      });
      return `M${interpolatedPoints[0]} ${interpolatedPoints[1]}C${interpolatedPoints[2]} ${interpolatedPoints[3]} ${interpolatedPoints[4]} ${interpolatedPoints[5]} ${interpolatedPoints[6]} ${interpolatedPoints[7]}C${interpolatedPoints[8]} ${interpolatedPoints[9]} ${interpolatedPoints[10]} ${interpolatedPoints[11]} ${interpolatedPoints[12]} ${interpolatedPoints[13]}`;
    };

    setPathD1(interpolatePath(pathSmile, pathOpen, progress));
  }, [progress]);

  const handleClick = () => {
    if (currentState === "smile") {
      setCurrentState("open");
      setProgress(1);
      setTimeout(() => {
        setCurrentState("filled");
      }, timings.delayBeforeFilled);
    } else if (currentState === "filled") {
      setIsReversing(true);
      setTimeout(() => {
        setCurrentState("open");
        setTimeout(() => {
          setProgress(0);
          setTimeout(() => {
            setCurrentState("smile");
            setIsReversing(false);
          }, timings.delayBeforeOpenToSmile);
        }, timings.morphDuration * 1000);
      }, timings.delayBeforeReverse);
    } else {
      setCurrentState("smile");
      setProgress(0);
    }
  };

  return (
    <div>
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
        <AnimatePresence>
          {(currentState !== "filled" || isReversing) && (
            <motion.path
              key="morphing-path"
              d={pathD1}
              animate={{ d: pathD1, opacity: 1 }}
              initial={
                isReversing
                  ? { opacity: 0, d: pathOpen }
                  : { opacity: 1, d: pathSmile }
              }
              exit={{ opacity: 0 }}
              transition={{
                d: { duration: timings.morphDuration },
                opacity: {
                  duration: isReversing
                    ? timings.fadeInDuration
                    : timings.fadeOutDuration,
                },
              }}
              stroke="white"
              strokeWidth="7.5"
              strokeLinecap="round"
              fill="none"
            />
          )}
          {currentState === "filled" && (
            <motion.path
              key="filled-path"
              d={pathFilled}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: {
                  duration: isReversing
                    ? timings.filledFadeOutDuration
                    : timings.fadeInDuration,
                },
              }}
              fill="white"
            />
          )}
        </AnimatePresence>
      </svg>
      <button onClick={handleClick}>
        {currentState === "smile" ? "Start Animation" : "Reset"}
      </button>
    </div>
  );
};

export default AnimationFramerMotion;
