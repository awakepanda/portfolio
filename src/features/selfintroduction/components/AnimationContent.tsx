"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import lipSyncAnimationData from "./LipSync.json";
import blinkAnimationData from "./Blink.json";
import codeAnimationData from "./Code.json";
import handAnimationData from "./Hand.json";
import penAnimationData from "./Pen.json";
import catAnimationData from "./Cat.json";
import { useAnimationStore } from "@/store/animationStore";

const DEVICE_SIZES = {
  pc: 848,
  tablet: 1024,
  sp: 375,
};

type DeviceSize = keyof typeof DEVICE_SIZES;

const pxToPercent = (px: number, deviceSize: DeviceSize) => {
  return `${(px / DEVICE_SIZES[deviceSize]) * 100}%`;
};

type AnimationPositions = {
  [key in DeviceSize]: {
    hand: { top: number; right: number };
    pen: { bottom: number; right: number };
    code: { bottom: number; left: number };
    cat: { top: number; left: number };
  };
};

const ANIMATION_POSITIONS: AnimationPositions = {
  pc: {
    hand: { top: 240, right: 170 },
    pen: { bottom: 236, right: 134 },
    code: { bottom: 206, left: 180 },
    cat: { top: 206, left: 146 },
  },
  tablet: {
    hand: { top: 180, right: 135 },
    pen: { bottom: 177, right: 93 },
    code: { bottom: 150, left: 135 },
    cat: { top: 165, left: 108 },
  },
  sp: {
    hand: { top: 120, right: 90 },
    pen: { bottom: 118, right: 62 },
    code: { bottom: 100, left: 90 },
    cat: { top: 110, left: 72 },
  },
};

type LottieMarker = {
  tm: number;
  cm: string;
  dr: number;
};

export default function AnimationContent() {
  const {
    isOpening,
    isAnimating,
    currentSegment,
    hasCompletedOpening,
    lottieAnimations,
    setIsOpening,
    setIsAnimating,
    setCurrentSegment,
    stopLottieAnimation,
    setHasCompletedOpening,
  } = useAnimationStore();

  const [currentDeviceSize, setCurrentDeviceSize] = useState<DeviceSize>("pc");

  const handControls = useAnimation();
  const codeControls = useAnimation();
  const penControls = useAnimation();
  const catControls = useAnimation();
  const lipSyncControls = useAnimation();

  const lipSyncRef = useRef<LottieRefCurrentProps>(null);
  const blinkRef = useRef<LottieRefCurrentProps>(null);
  const codeRef = useRef<LottieRefCurrentProps>(null);
  const handRef = useRef<LottieRefCurrentProps>(null);
  const penRef = useRef<LottieRefCurrentProps>(null);
  const catRef = useRef<LottieRefCurrentProps>(null);

  const [startMarker, setStartMarker] = useState<LottieMarker | null>(null);
  const [lipSyncMarker, setLipSyncMarker] = useState<LottieMarker | null>(null);
  const [endMarker, setEndMarker] = useState<LottieMarker | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= DEVICE_SIZES.tablet) {
        setCurrentDeviceSize("pc");
      } else if (width >= DEVICE_SIZES.sp) {
        setCurrentDeviceSize("tablet");
      } else {
        setCurrentDeviceSize("sp");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Initializing markers");
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

    console.log("Found markers:", foundMarkers);
    console.log(
      "LipSync marker:",
      foundMarkers.find((m: LottieMarker) => m.cm === "lipSync"),
    );
  }, []);

  const animatePositions = useCallback(
    async (deviceSize: DeviceSize) => {
      const positions = ANIMATION_POSITIONS[deviceSize];
      const animations = [
        handControls.start({
          top: pxToPercent(positions.hand.top, deviceSize),
          right: pxToPercent(positions.hand.right, deviceSize),
          opacity: 1,
          transition: { type: "spring", stiffness: 200, damping: 20, mass: 2 },
        }),
        codeControls.start({
          bottom: pxToPercent(positions.code.bottom, deviceSize),
          left: pxToPercent(positions.code.left, deviceSize),
          opacity: 1,
          transition: { type: "spring", stiffness: 200, damping: 20, mass: 2 },
        }),
        penControls.start({
          bottom: pxToPercent(positions.pen.bottom, deviceSize),
          right: pxToPercent(positions.pen.right, deviceSize),
          opacity: 1,
          transition: { type: "spring", stiffness: 200, damping: 20, mass: 2 },
        }),
        catControls.start({
          top: pxToPercent(positions.cat.top, deviceSize),
          left: pxToPercent(positions.cat.left, deviceSize),
          opacity: 1,
          transition: { type: "spring", stiffness: 200, damping: 20, mass: 2 },
        }),
        lipSyncControls.start({
          scale: 1,
          rotate: 360,
          opacity: 1,
          transition: { type: "spring", stiffness: 200, damping: 20, mass: 2 },
        }),
      ];

      await Promise.all(animations);
      setIsOpening(false);
      setHasCompletedOpening(true);
    },
    [
      handControls,
      codeControls,
      penControls,
      catControls,
      lipSyncControls,
      setIsOpening,
      setHasCompletedOpening,
    ],
  );

  useEffect(() => {
    if (isOpening && !hasCompletedOpening) {
      console.log("AnimationContent: Opening animation started");
      animatePositions(currentDeviceSize);
    } else if (hasCompletedOpening) {
      const positions = ANIMATION_POSITIONS[currentDeviceSize];
      handControls.set({
        top: pxToPercent(positions.hand.top, currentDeviceSize),
        right: pxToPercent(positions.hand.right, currentDeviceSize),
        opacity: 1,
      });
      codeControls.set({
        bottom: pxToPercent(positions.code.bottom, currentDeviceSize),
        left: pxToPercent(positions.code.left, currentDeviceSize),
        opacity: 1,
      });
      penControls.set({
        bottom: pxToPercent(positions.pen.bottom, currentDeviceSize),
        right: pxToPercent(positions.pen.right, currentDeviceSize),
        opacity: 1,
      });
      catControls.set({
        top: pxToPercent(positions.cat.top, currentDeviceSize),
        left: pxToPercent(positions.cat.left, currentDeviceSize),
        opacity: 1,
      });
      lipSyncControls.set({
        scale: 1,
        rotate: 360,
        opacity: 1,
      });
    }
  }, [
    isOpening,
    hasCompletedOpening,
    currentDeviceSize,
    animatePositions,
    handControls,
    codeControls,
    penControls,
    catControls,
    lipSyncControls,
  ]);

  useEffect(() => {
    Object.entries(lottieAnimations).forEach(([name, state]) => {
      const ref = {
        hand: handRef,
        code: codeRef,
        pen: penRef,
        cat: catRef,
        lipSync: lipSyncRef,
      }[name as keyof typeof lottieAnimations];

      if (ref && state.isPlaying) {
        console.log(`AnimationContent: Playing ${name} animation`);
        ref.current?.play();
      } else if (ref) {
        console.log(`AnimationContent: Stopping ${name} animation`);
        ref.current?.stop();
      }
    });
  }, [lottieAnimations]);

  useEffect(() => {
    if (!isOpening) {
      blinkRef.current?.play();
    }
  }, [isOpening]);

  useEffect(() => {
    console.log(
      "Animation state changed. isAnimating:",
      isAnimating,
      "currentSegment:",
      currentSegment,
    );
    if (lipSyncRef.current) {
      if (isAnimating || currentSegment === "end") {
        switch (currentSegment) {
          case "start":
            console.log("Playing start segment:", [0, startMarker?.dr ?? 0]);
            lipSyncRef.current.playSegments([0, startMarker?.dr ?? 0], true);
            break;
          case "lipSync":
            if (lipSyncMarker) {
              const lipSyncStart = lipSyncMarker.tm ?? 0;
              const lipSyncEnd =
                (lipSyncMarker.tm ?? 0) + (lipSyncMarker.dr ?? 0);
              console.log("Playing lipSync segment:", [
                lipSyncStart,
                lipSyncEnd,
              ]);
              lipSyncRef.current.playSegments([lipSyncStart, lipSyncEnd], true);
            } else {
              console.warn("lipSyncMarker not found, playing full animation");
              lipSyncRef.current.play();
            }
            break;
          case "end":
            if (endMarker) {
              const endStart = endMarker.tm ?? 0;
              const endEnd = (endMarker.tm ?? 0) + (endMarker.dr ?? 0);
              console.log("Playing end segment:", [endStart, endEnd]);
              lipSyncRef.current.playSegments([endStart, endEnd], true);
            } else {
              console.warn("endMarker not found, stopping animation");
              lipSyncRef.current.stop();
            }
            break;
        }
      } else {
        console.log("Pausing lipSync animation");
        lipSyncRef.current.pause();
      }
    }
  }, [isAnimating, currentSegment, startMarker, lipSyncMarker, endMarker]);

  const handleAnimationComplete = useCallback(
    (name: keyof typeof lottieAnimations) => {
      console.log(`AnimationContent: ${name} animation completed`);
      stopLottieAnimation(name);
    },
    [stopLottieAnimation],
  );

  const handleLipSyncComplete = useCallback(() => {
    console.log(
      "LipSync animation completed. Current segment:",
      currentSegment,
    );
    if (currentSegment === "start") {
      setCurrentSegment("lipSync");
    } else if (currentSegment === "lipSync") {
      if (lipSyncMarker && lipSyncRef.current) {
        const lipSyncStart = lipSyncMarker.tm ?? 0;
        const lipSyncEnd = (lipSyncMarker.tm ?? 0) + (lipSyncMarker.dr ?? 0);
        console.log("Playing lipSync segment:", [lipSyncStart, lipSyncEnd]);
        lipSyncRef.current.playSegments([lipSyncStart, lipSyncEnd], true);
      } else {
        console.warn(
          "lipSyncMarker not found or lipSyncRef not available, playing full animation",
        );
        lipSyncRef.current?.play();
      }
    } else if (currentSegment === "end") {
      setCurrentSegment(null);
      setIsAnimating(false);
    } else {
      console.log("Unknown segment in handleLipSyncComplete:", currentSegment);
    }
  }, [currentSegment, lipSyncMarker, setCurrentSegment, setIsAnimating]);

  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ top: "50%", right: "50%", x: "50%", y: "-50%", opacity: 0 }}
        animate={handControls}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute w-pc-[90]"
      >
        <Lottie
          className="lottie-color-modifier"
          lottieRef={handRef}
          animationData={handAnimationData}
          autoplay={false}
          loop={false}
          onComplete={() => handleAnimationComplete("hand")}
        />
      </motion.div>
      <motion.div
        initial={{
          bottom: "50%",
          right: "50%",
          x: "50%",
          y: "50%",
          opacity: 0,
        }}
        animate={penControls}
        className="absolute w-pc-[164]"
      >
        <Lottie
          className="lottie-color-modifier"
          lottieRef={penRef}
          animationData={penAnimationData}
          autoplay={false}
          loop={false}
          onComplete={() => handleAnimationComplete("pen")}
        />
      </motion.div>
      <motion.div
        initial={{ bottom: "50%", left: "50%", x: "-50%", opacity: 0 }}
        animate={codeControls}
        className="absolute w-pc-[77]"
      >
        <Lottie
          className="lottie-color-modifier"
          lottieRef={codeRef}
          animationData={codeAnimationData}
          autoplay={false}
          loop={false}
          onComplete={() => handleAnimationComplete("code")}
        />
      </motion.div>
      <motion.div
        initial={{ top: "50%", left: "50%", x: "-50%", opacity: 0 }}
        animate={catControls}
        className="absolute w-pc-[180]"
      >
        <Lottie
          className="lottie-color-modifier"
          lottieRef={catRef}
          animationData={catAnimationData}
          autoplay={false}
          loop={false}
          onComplete={() => handleAnimationComplete("cat")}
        />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-pc-[316]">
        <motion.div
          className="relative w-full"
          initial={{ scale: 0 }}
          animate={lipSyncControls}
        >
          <Lottie
            className="w-full h-full lottie-color-modifier"
            lottieRef={lipSyncRef}
            animationData={lipSyncAnimationData}
            loop={false}
            autoplay={false}
            onComplete={handleLipSyncComplete}
          />
          <Lottie
            className="w-pc-[70] absolute left-1/2 t-pc-[111] transform -translate-x-1/2 lottie-color-modifier"
            lottieRef={blinkRef}
            animationData={blinkAnimationData}
            loop={true}
            autoplay={false}
          />
        </motion.div>
      </div>
    </div>
  );
}
