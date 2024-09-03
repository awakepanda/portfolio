"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimationGSAP: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      // 初期座標と目標座標
      const initialCoords = [
        { x: 10, y: 50 },
        { x: 50, y: 10 },
        { x: 90, y: 50 },
        { x: 170, y: 50 },
      ];
      const targetCoords = [
        { x: 10, y: 50 },
        { x: 50, y: 90 },
        { x: 90, y: 50 },
        { x: 170, y: 50 },
      ];

      // アニメーションの設定
      gsap.to(initialCoords, {
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        x: (index) => targetCoords[index].x,
        y: (index) => targetCoords[index].y,
        onUpdate: () => {
          // 新しいパスを生成
          const newPath =
            `M${initialCoords[0].x},${initialCoords[0].y} ` +
            `Q${initialCoords[1].x},${initialCoords[1].y} ` +
            `${initialCoords[2].x},${initialCoords[2].y} ` +
            `T${initialCoords[3].x},${initialCoords[3].y}`;
          pathRef.current?.setAttribute("d", newPath);
        },
      });
    }
  }, []);

  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      <path
        ref={pathRef}
        d="M10,50 Q50,10 90,50 T170,50"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default AnimationGSAP;
