"use client";

import React, { useRef, useState, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "./smile.json";

export default function AnimationLottieFiles2() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1);
    }
  }, []);

  const playAnimation = () => {
    if (lottieRef.current) {
      const firstMarker = animationData.markers.find(
        (marker) => marker.cm === "first",
      );
      const lipSyncMarker = animationData.markers.find(
        (marker) => marker.cm === "lip-sync",
      );

      if (firstMarker && lipSyncMarker) {
        lottieRef.current.playSegments(
          [firstMarker.tm, lipSyncMarker.tm + lipSyncMarker.dr],
          true,
        );
        setIsPlaying(true);
      }
    }
  };

  const stopAnimation = () => {
    if (lottieRef.current) {
      const lastMarker = animationData.markers.find(
        (marker) => marker.cm === "last",
      );

      if (lastMarker) {
        lottieRef.current.playSegments(
          [lastMarker.tm, lastMarker.tm + lastMarker.dr],
          true,
        );
        setIsPlaying(false);
      }
    }
  };

  const handleAnimationComplete = () => {
    if (isPlaying && lottieRef.current) {
      const lipSyncMarker = animationData.markers.find(
        (marker) => marker.cm === "lip-sync",
      );

      if (lipSyncMarker) {
        lottieRef.current.playSegments(
          [lipSyncMarker.tm, lipSyncMarker.tm + lipSyncMarker.dr],
          true,
        );
      }
    }
  };

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
        {!isPlaying ? (
          <button
            onClick={playAnimation}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Play
          </button>
        ) : (
          <button
            onClick={stopAnimation}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
