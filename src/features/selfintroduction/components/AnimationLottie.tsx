"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import originalAnimationData from "./test.json";

interface AnimationData {
  layers: {
    ks: {
      p: {
        k: Array<{
          s: number[];
          t: number;
          i?: { x: number; y: number };
          o?: { x: number; y: number };
        }>;
      };
      s: {
        k: number[];
      };
    };
  }[];
  h: number;
  w: number;
  fr: number;
  op: number;
  [key: string]: any;
}

export default function AnimationLottie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<AnimationData>(
    originalAnimationData as AnimationData,
  );

  const updateAnimation = useCallback(() => {
    if (containerRef.current) {
      const newAnimationData = JSON.parse(
        JSON.stringify(originalAnimationData),
      ) as AnimationData;
      const layer = newAnimationData.layers[0];
      const keyframes = layer.ks.p.k;

      if (Array.isArray(keyframes)) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const originalWidth = newAnimationData.w;
        const originalHeight = newAnimationData.h;

        // スケールを計算（コンテナの20%のサイズになるように調整）
        const scale =
          Math.min(
            (containerWidth * 0.2) / originalWidth,
            (containerHeight * 0.2) / originalHeight,
          ) * 100;

        // アニメーションの継続時間（フレーム数）
        const duration = newAnimationData.op - newAnimationData.ip;

        // キーフレームを設定
        keyframes.length = 0; // 既存のキーフレームをクリア
        keyframes.push(
          // 開始位置（画面上部の外）
          {
            s: [50, -10],
            t: 0,
            o: { x: 0.167, y: 0.167 },
            i: { x: 0.833, y: 0.833 },
          },
          // 衝突位置（画面下部）
          {
            s: [50, 95],
            t: duration * 0.5,
            o: { x: 0.167, y: 0.167 },
            i: { x: 0.833, y: 0.833 },
          },
          // 最終位置（画面中央）
          {
            s: [50, 50],
            t: duration,
            o: { x: 0.167, y: 1 },
            i: { x: 0.833, y: 0 },
          },
        );

        // スケールを設定
        layer.ks.s.k = [scale, scale, 100];

        // アニメーション設定を更新
        newAnimationData.h = 100;
        newAnimationData.w = 100;
      }

      setAnimationData(newAnimationData);
    }
  }, []);

  useEffect(() => {
    updateAnimation();
    window.addEventListener("resize", updateAnimation);
    return () => window.removeEventListener("resize", updateAnimation);
  }, [updateAnimation]);

  useEffect(() => {
    const currentLottie = lottieRef.current;

    const handleAnimationComplete = () => {
      if (currentLottie && "goToAndPlay" in currentLottie) {
        currentLottie.goToAndPlay(0, true);
      }
    };

    if (currentLottie && "addEventListener" in currentLottie) {
      currentLottie.addEventListener("complete", handleAnimationComplete);
    }

    return () => {
      if (currentLottie && "removeEventListener" in currentLottie) {
        currentLottie.removeEventListener("complete", handleAnimationComplete);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
