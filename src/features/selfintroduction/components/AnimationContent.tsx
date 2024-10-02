"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useAnimationStore } from "@/store/animationStore";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { getSpecificPosition } from "@/utils/animationUtils";
import {
  ANIMATION_OBJECTS,
  FACE_ANIMATION_OBJECT,
} from "@/constants/animations";

type LottieMarker = {
  tm: number;
  cm: string;
  dr: number;
};

export default function AnimationContent() {
  const deviceSize = useDeviceSize();
  const {
    isAnimating,
    currentWord,
    currentSegment,
    setCurrentSegment,
    animationTrigger,
  } = useAnimationStore();

  const animationRefs = useRef<{
    [key: string]: React.RefObject<LottieRefCurrentProps>;
  }>({});

  const [startMarker, setStartMarker] = useState<LottieMarker | null>(null);
  const [lipSyncMarker, setLipSyncMarker] = useState<LottieMarker | null>(null);
  const [endMarker, setEndMarker] = useState<LottieMarker | null>(null);

  // 各アニメーションのrefを作成
  useEffect(() => {
    [...ANIMATION_OBJECTS, ...FACE_ANIMATION_OBJECT].forEach((obj) => {
      if (!animationRefs.current[obj.name]) {
        animationRefs.current[obj.name] =
          React.createRef<LottieRefCurrentProps>();
      }
    });
  }, []);

  useEffect(() => {
    const lipSyncAnimationData = FACE_ANIMATION_OBJECT.find(
      (obj) => obj.name === "lipSync",
    )?.animationData;
    if (lipSyncAnimationData && "markers" in lipSyncAnimationData) {
      const foundMarkers = lipSyncAnimationData.markers || [];
      setStartMarker(
        foundMarkers.find((m: LottieMarker) => m.cm === "start") || null,
      );
      setLipSyncMarker(
        foundMarkers.find((m: LottieMarker) => m.cm === "lipSync") || null,
      );
      setEndMarker(
        foundMarkers.find((m: LottieMarker) => m.cm === "end") || null,
      );
    }
  }, []);

  const playAnimation = useCallback(
    (animationType: string, loop: boolean = false) => {
      const ref = animationRefs.current[animationType];
      if (ref && ref.current) {
        if (loop) {
          ref.current.play();
        } else {
          ref.current.goToAndPlay(0);
        }
      }
    },
    [],
  );

  const stopAnimation = useCallback((animationType: string) => {
    const ref = animationRefs.current[animationType];
    if (ref && ref.current) {
      ref.current.stop();
    }
  }, []);

  const playLipSync = useCallback(
    (segment: "start" | "lipSync" | "end") => {
      const ref = animationRefs.current["lipSync"];
      if (ref && ref.current) {
        switch (segment) {
          case "start":
            ref.current.playSegments([0, startMarker?.dr ?? 0], true);
            break;
          case "lipSync":
            if (lipSyncMarker) {
              const lipSyncStart = lipSyncMarker.tm ?? 0;
              const lipSyncEnd =
                (lipSyncMarker.tm ?? 0) + (lipSyncMarker.dr ?? 0);
              ref.current.playSegments([lipSyncStart, lipSyncEnd], true);
            } else {
              ref.current.play();
            }
            break;
          case "end":
            if (endMarker) {
              const endStart = endMarker.tm ?? 0;
              const endEnd = (endMarker.tm ?? 0) + (endMarker.dr ?? 0);
              ref.current.playSegments([endStart, endEnd], true);
            } else {
              ref.current.stop();
            }
            break;
        }
      }
    },
    [startMarker, lipSyncMarker, endMarker],
  );

  const handleLipSyncComplete = useCallback(() => {
    if (currentSegment === "start") {
      setCurrentSegment("lipSync");
    } else if (currentSegment === "lipSync" && isAnimating) {
      playLipSync("lipSync");
    }
  }, [currentSegment, isAnimating, setCurrentSegment, playLipSync]);

  useEffect(() => {
    if (isAnimating) {
      playLipSync(currentSegment);
      playAnimation("blink", true);
    } else {
      if (currentSegment === "end") {
        playLipSync("end");
      } else {
        stopAnimation("lipSync");
      }
      stopAnimation("blink");
    }
  }, [isAnimating, currentSegment, playAnimation, stopAnimation, playLipSync]);

  useEffect(() => {
    if (currentWord) {
      const animationObject = ANIMATION_OBJECTS.find(
        (obj) => obj.name === currentWord,
      );
      if (animationObject) {
        playAnimation(currentWord);
      }
    }
  }, [currentWord, animationTrigger, playAnimation]);

  return (
    <div className="w-full h-full relative">
      {ANIMATION_OBJECTS.map((obj) => {
        const position = getSpecificPosition(deviceSize, obj.name);
        return (
          <motion.div
            key={obj.name}
            initial={{
              ...position.initial,
              scale: obj.initial.scale,
              opacity: obj.initial.opacity,
            }}
            animate={{
              ...position.final,
              scale: obj.animate.scale,
              opacity: obj.animate.opacity,
            }}
            transition={obj.springConfig}
            className={`absolute ${obj.className}`}
          >
            <Lottie
              lottieRef={animationRefs.current[obj.name] || null}
              animationData={obj.animationData}
              autoplay={false}
              loop={false}
            />
          </motion.div>
        );
      })}
      <motion.div
        initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 2,
        }}
        className="absolute w-sp-[172] md:w-tablet-[272] lg:w-pc-[316]"
      >
        {FACE_ANIMATION_OBJECT.map((obj) => (
          <Lottie
            key={obj.name}
            lottieRef={animationRefs.current[obj.name] || null}
            animationData={obj.animationData}
            className={obj.className}
            autoplay={false}
            loop={obj.name === "blink"}
            onComplete={
              obj.name === "lipSync" ? handleLipSyncComplete : undefined
            }
          />
        ))}
      </motion.div>
    </div>
  );
}
