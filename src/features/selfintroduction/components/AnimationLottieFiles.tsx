"use client";

import React, { useRef, useEffect, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

const AnimationLottieFiles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [animationData, setAnimationData] = useState<any>(null);

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

      // Lottieアニメーションデータの動的生成
      const newAnimationData = {
        v: "5.5.7",
        fr: 30,
        ip: 0,
        op: 60,
        w: containerSize.width,
        h: containerSize.height,
        layers: [
          {
            ty: 4,
            ip: 0,
            op: 60,
            st: 0,
            ks: {
              o: { a: 0, k: 100 },
              r: { a: 0, k: 0 },
              p: {
                a: 1,
                k: [
                  {
                    t: 0,
                    s: [containerSize.width / 2, startY],
                    e: [containerSize.width / 2, endY],
                    i: { x: [0.42], y: [0] },
                    o: { x: [0.58], y: [1] },
                  },
                  { t: 60 },
                ],
              },
              a: { a: 0, k: [0, 0, 0] },
              s: { a: 0, k: [scale * 100, scale * 100, 100] },
            },
            shapes: [
              {
                ty: "el",
                d: 1,
                s: { a: 0, k: [objectSize, objectSize] },
                p: { a: 0, k: [0, 0] },
                nm: "Ellipse Path 1",
                c: { a: 0, k: [0, 0.5, 1, 1] },
              },
            ],
          },
        ],
      };

      setAnimationData(newAnimationData);
    }
  }, [containerSize]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
};

export default AnimationLottieFiles;
