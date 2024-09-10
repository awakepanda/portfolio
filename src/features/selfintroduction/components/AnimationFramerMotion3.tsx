"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function AnimationFramerMotion3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const baseWidth = 1728; // 基準となる横幅
  const objectSize = 316; // 基本オブジェクトのサイズ
  const scale = 0.3; // 初期スケール

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      const scaledObjectHeight =
        (objectSize * scale * containerSize.width) / baseWidth;
      const startY = -scaledObjectHeight;
      const endY = containerSize.height - scaledObjectHeight;

      controls.start({
        y: endY,
        transition: { duration: 2, ease: "easeInOut" },
      });
    }
  }, [containerSize, controls]);

  // オブジェクトのサイズを画面幅に対する割合で計算
  const objectSizePercentage = (objectSize / baseWidth) * 100;

  // 初期位置の計算
  const initialY = containerSize.width
    ? -((objectSize * scale * containerSize.width) / baseWidth)
    : -9999;

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <motion.div
        className="absolute left-1/2 bg-blue-500 rounded-full"
        style={{
          width: `${objectSizePercentage}%`,
          height: 0,
          paddingBottom: `${objectSizePercentage}%`,
          transformOrigin: "top center",
        }}
        initial={{
          x: "-50%",
          y: initialY,
          scale: scale,
        }}
        animate={controls}
      />
    </div>
  );
}
