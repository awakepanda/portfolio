"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import lipSyncAnimationData from "./LipSync.json";
import blinkAniamtionData from "./Blink.json";
import { useLottieClasses } from "./useLottieClasses"; // カスタムフックをインポート

export default function Animation() {
  const lipSyncRef = useRef<LottieRefCurrentProps>(null);
  const blinkRef = useRef<LottieRefCurrentProps>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // カスタムフックを使用
  useLottieClasses(lipSyncRef);
  useLottieClasses(blinkRef);

  useEffect(() => {
    if (lipSyncRef.current) {
      lipSyncRef.current.setSpeed(1);
    } else if (blinkRef.current) {
      blinkRef.current.setSpeed(1);
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc((100vw*316)/1728)]">
        <motion.div
          className="relative w-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Lottie
            className="w-full h-full"
            lottieRef={lipSyncRef}
            animationData={lipSyncAnimationData}
            loop={false}
            autoplay={false}
          />
          <Lottie
            className="w-[calc((100vw*70)/1728)] absolute left-1/2 top-[calc((100vw*111)/1728)] tranform -translate-x-1/2"
            lottieRef={blinkRef}
            animationData={blinkAniamtionData}
            loop={true}
            autoplay={true}
          />
        </motion.div>
      </div>
    </div>
  );
}
