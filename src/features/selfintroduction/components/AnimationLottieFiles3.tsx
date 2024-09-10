"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "./SmileAnimation3.json";

export default function AnimationLottieFiles3() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isLipSyncing, setIsLipSyncing] = useState(false);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalFrames = animationData.op - animationData.ip;
  const frameRate = animationData.fr;
  const blinkEndFrame = 360; // この値は実際のアニメーションデータに基づいて調整してください

  const handleStartLipSync = useCallback(() => {
    if (lottieRef.current) {
      lottieRef.current.playSegments([360, 384], true);
      setIsLipSyncing(true);
    }
  }, []);

  const handleStopLipSync = useCallback(() => {
    if (lottieRef.current) {
      lottieRef.current.playSegments([477, 501], true);
      setIsLipSyncing(false);
    }
  }, []);

  const handleAnimationComplete = useCallback(() => {
    if (lottieRef.current) {
      if (isLipSyncing) {
        lottieRef.current.playSegments([384, 477], true);
      } else {
        lottieRef.current.goToAndStop(360, true);
      }
    }
  }, [isLipSyncing]);

  useEffect(() => {
    if (lottieRef.current) {
      const animation = lottieRef.current;

      // ブリンクアニメーションのループ処理
      const loopBlink = () => {
        const totalDuration = totalFrames / frameRate;
        const blinkDuration = (blinkEndFrame / totalFrames) * totalDuration;
        animation.playSegments([0, blinkEndFrame], true);
        blinkIntervalRef.current = setTimeout(loopBlink, blinkDuration * 1000);
      };

      loopBlink();

      // 初期状態: start-mouth
      animation.goToAndStop(blinkEndFrame, true);
    }

    return () => {
      if (blinkIntervalRef.current) {
        clearTimeout(blinkIntervalRef.current);
      }
    };
  }, [frameRate, totalFrames, blinkEndFrame]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Lottie
        className="w-[calc((100vw*316)/1728)]"
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        onComplete={handleAnimationComplete}
      />
      <div className="absolute top-0">
        {!isLipSyncing ? (
          <button
            onClick={handleStartLipSync}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Play
          </button>
        ) : (
          <button
            onClick={handleStopLipSync}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
