"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import lipSyncAnimationData from "./LipSync.json";
import blinkAnimationData from "./Blink.json";

export default function Animation() {
  const lipSyncRef = useRef<LottieRefCurrentProps>(null);
  const blinkRef = useRef<LottieRefCurrentProps>(null);
  const [openingCompleted, setOpeningCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<
    "start" | "lipSync" | "end" | null
  >(null);

  console.log(lipSyncRef);
  const markers = lipSyncAnimationData.markers || [];
  const startMarker = markers.find((m) => m.cm === "start");
  const lipSyncMarker = markers.find((m) => m.cm === "lip-sync");
  const endMarker = markers.find((m) => m.cm === "end");

  useEffect(() => {
    if (blinkRef.current) {
      blinkRef.current.setSpeed(1);
    }
  }, []);

  useEffect(() => {
    if (openingCompleted && blinkRef.current) {
      blinkRef.current.play();
    }
  }, [openingCompleted]);

  const playAnimation = () => {
    if (lipSyncRef.current && startMarker && lipSyncMarker) {
      setCurrentSegment("start");
      lipSyncRef.current.playSegments(
        [0, startMarker.tm + startMarker.dr],
        true,
      );
    }
  };

  const stopAnimation = () => {
    if (lipSyncRef.current && endMarker) {
      setCurrentSegment("end");
      lipSyncRef.current.playSegments(
        [endMarker.tm, endMarker.tm + endMarker.dr],
        true,
      );
    }
  };

  const handleAnimationComplete = () => {
    if (currentSegment === "start" && lipSyncRef.current && lipSyncMarker) {
      setCurrentSegment("lipSync");
      lipSyncRef.current.playSegments(
        [lipSyncMarker.tm, lipSyncMarker.tm + lipSyncMarker.dr],
        true,
      );
    } else if (
      currentSegment === "lipSync" &&
      lipSyncRef.current &&
      lipSyncMarker &&
      isPlaying
    ) {
      lipSyncRef.current.playSegments(
        [lipSyncMarker.tm, lipSyncMarker.tm + lipSyncMarker.dr],
        true,
      );
    } else if (currentSegment === "end") {
      setCurrentSegment(null);
    }
  };

  const toggleAnimation = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      playAnimation();
    } else {
      stopAnimation();
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc((100vw*316)/1728)]">
        <motion.div
          className="relative w-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={() => setOpeningCompleted(true)}
        >
          <Lottie
            className="w-full h-full lottie-color-modifier"
            lottieRef={lipSyncRef}
            animationData={lipSyncAnimationData}
            loop={false}
            autoplay={false}
            onComplete={handleAnimationComplete}
          />
          <Lottie
            className="w-[calc((100vw*70)/1728)] absolute left-1/2 top-[calc((100vw*111)/1728)] transform -translate-x-1/2 lottie-color-modifier"
            lottieRef={blinkRef}
            animationData={blinkAnimationData}
            loop={true}
            autoplay={false}
          />
        </motion.div>
      </div>
      <button
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 font-bold py-2 px-4 rounded ${
          isPlaying
            ? "bg-red-500 hover:bg-red-700 text-white"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
        onClick={toggleAnimation}
      >
        {isPlaying ? "停止" : "開始"}
      </button>
    </div>
  );
}
