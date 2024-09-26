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
  pc: 1728,
  tablet: 768,
  sp: 393, // for referrence
};

const ANIMATION_CONTAINER_SIZES = {
  pc: 848,
  tablet: 1024,
  sp: 393,
};

type Position = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  opacity: number;
  scale?: number;
  rotate?: number;
};

type Spring = {
  stiffness: number;
  damping: number;
  mass: number;
};

type DeviceSize = keyof typeof DEVICE_SIZES;

const pxToPercent = (px: number, deviceSize: DeviceSize) => {
  return `${(px / ANIMATION_CONTAINER_SIZES[deviceSize]) * 100}%`;
};

type AnimationPositions = {
  [key in DeviceSize]: {
    hand: { top: number; right: number };
    pen: { bottom: number; right: number };
    code: { bottom: number; left: number };
    cat: { top: number; left: number };
    lipSync: { scale: number; rotate: number };
  };
};

const ANIMATION_POSITIONS: AnimationPositions = {
  pc: {
    hand: { top: 186, right: 110 },
    pen: { bottom: 236, right: 130 },
    code: { bottom: 206, left: 160 },
    cat: { top: 206, left: 150 },
    lipSync: { scale: 1, rotate: 360 },
  },
  tablet: {
    hand: { top: 180, right: 135 },
    pen: { bottom: 177, right: 93 },
    code: { bottom: 150, left: 135 },
    cat: { top: 160, left: 106 },
    lipSync: { scale: 1, rotate: 360 },
  },
  sp: {
    hand: { top: 120, right: 90 },
    pen: { bottom: 118, right: 62 },
    code: { bottom: 100, left: 90 },
    cat: { top: 110, left: 150 },
    lipSync: { scale: 1, rotate: 360 },
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

  const [currentDeviceSize, setCurrentDeviceSize] = useState<DeviceSize>(() => {
    const width =
      typeof window !== "undefined" ? window.innerWidth : DEVICE_SIZES.pc;
    if (width >= DEVICE_SIZES.pc) return "pc";
    if (width >= DEVICE_SIZES.tablet) return "tablet";
    return "sp";
  });

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
  }, []);

  const useAnimatedPosition = (
    name: keyof AnimationPositions[DeviceSize],
    initialPos: Position,
    springConfig: Spring,
  ) => {
    const controls = useAnimation();
    const [currentPosition, setCurrentPosition] =
      useState<Position>(initialPos);

    const updatePosition = useCallback(
      (deviceSize: DeviceSize, isOpening: boolean) => {
        const positions = ANIMATION_POSITIONS[deviceSize];
        const newPosition: Position = { opacity: 1 };

        const elementPosition = positions[name];
        if ("top" in elementPosition)
          newPosition.top = pxToPercent(elementPosition.top, deviceSize);
        if ("right" in elementPosition)
          newPosition.right = pxToPercent(elementPosition.right, deviceSize);
        if ("bottom" in elementPosition)
          newPosition.bottom = pxToPercent(elementPosition.bottom, deviceSize);
        if ("left" in elementPosition)
          newPosition.left = pxToPercent(elementPosition.left, deviceSize);
        if ("scale" in elementPosition)
          newPosition.scale = elementPosition.scale;
        if ("rotate" in elementPosition)
          newPosition.rotate = elementPosition.rotate;

        setCurrentPosition(isOpening ? initialPos : newPosition);
      },
      [name, initialPos],
    );

    const animate = useCallback(
      (deviceSize: DeviceSize) => {
        const positions = ANIMATION_POSITIONS[deviceSize];
        const animateProps: Position = { opacity: 1 };

        const elementPosition = positions[name];
        if ("top" in elementPosition)
          animateProps.top = pxToPercent(elementPosition.top, deviceSize);
        if ("right" in elementPosition)
          animateProps.right = pxToPercent(elementPosition.right, deviceSize);
        if ("bottom" in elementPosition)
          animateProps.bottom = pxToPercent(elementPosition.bottom, deviceSize);
        if ("left" in elementPosition)
          animateProps.left = pxToPercent(elementPosition.left, deviceSize);
        if ("scale" in elementPosition)
          animateProps.scale = elementPosition.scale;
        if ("rotate" in elementPosition)
          animateProps.rotate = elementPosition.rotate;

        return controls.start({
          ...animateProps,
          transition: { type: "spring", ...springConfig },
        });
      },
      [controls, name, springConfig],
    );
    return { currentPosition, controls, updatePosition, animate };
  };

  const hand = useAnimatedPosition(
    "hand",
    { top: "50%", right: "50%", opacity: 0 },
    { stiffness: 300, damping: 20, mass: 2 },
  );
  const pen = useAnimatedPosition(
    "pen",
    { bottom: "50%", right: "50%", opacity: 0 },
    { stiffness: 200, damping: 20, mass: 2 },
  );
  const code = useAnimatedPosition(
    "code",
    { bottom: "50%", left: "50%", opacity: 0 },
    { stiffness: 200, damping: 20, mass: 2 },
  );
  const cat = useAnimatedPosition(
    "cat",
    { top: "50%", left: "50%", opacity: 0 },
    { stiffness: 200, damping: 20, mass: 2 },
  );

  const lipSync = useAnimatedPosition(
    "lipSync",
    { scale: 0, opacity: 0 },
    { stiffness: 200, damping: 20, mass: 2 },
  );

  const initializePositions = useCallback(
    (deviceSize: DeviceSize) => {
      hand.updatePosition(deviceSize, isOpening);
      pen.updatePosition(deviceSize, isOpening);
      code.updatePosition(deviceSize, isOpening);
      cat.updatePosition(deviceSize, isOpening);
      lipSync.updatePosition(deviceSize, isOpening);
    },
    [hand, pen, code, cat, lipSync, isOpening],
  );

  useEffect(() => {
    initializePositions(currentDeviceSize);
  }, [initializePositions, currentDeviceSize]);

  const handleDeviceSizeChange = useCallback(
    (newDeviceSize: DeviceSize) => {
      setCurrentDeviceSize(newDeviceSize);
      hand.updatePosition(newDeviceSize, false);
      pen.updatePosition(newDeviceSize, false);
      code.updatePosition(newDeviceSize, false);
      cat.updatePosition(newDeviceSize, false);
      lipSync.updatePosition(newDeviceSize, false);
    },
    [hand, pen, code, cat, lipSync],
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newDeviceSize: DeviceSize = "pc";
      if (width < DEVICE_SIZES.tablet) {
        newDeviceSize = "sp";
      } else if (width < DEVICE_SIZES.pc) {
        newDeviceSize = "tablet";
      }
      handleDeviceSizeChange(newDeviceSize);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleDeviceSizeChange]);

  const animatePositions = useCallback(
    async (deviceSize: DeviceSize) => {
      if (isOpening && !hasCompletedOpening) {
        await Promise.all([
          hand.animate(deviceSize),
          pen.animate(deviceSize),
          code.animate(deviceSize),
          cat.animate(deviceSize),
          lipSync.animate(deviceSize),
        ]);
        setIsOpening(false);
        setHasCompletedOpening(true);
      }
    },
    [
      isOpening,
      hasCompletedOpening,
      hand,
      pen,
      code,
      cat,
      lipSync,
      setIsOpening,
      setHasCompletedOpening,
    ],
  );

  useEffect(() => {
    if (isOpening && !hasCompletedOpening) {
      animatePositions(currentDeviceSize);
    }
  }, [isOpening, hasCompletedOpening, animatePositions, currentDeviceSize]);

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
        ref.current?.play();
      } else if (ref) {
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
        initial={hand.currentPosition}
        style={hand.currentPosition}
        animate={hand.controls}
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
        initial={pen.currentPosition}
        style={pen.currentPosition}
        animate={pen.controls}
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
        initial={code.currentPosition}
        style={code.currentPosition}
        animate={code.controls}
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
        initial={cat.currentPosition}
        style={cat.currentPosition}
        animate={cat.controls}
        className="absolute w-sp-[98] md:w-tablet-[200] lg:w-pc-[180]"
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-sp-[172] md:w-tablet-[272] lg:w-pc-[316]">
        <motion.div
          className="relative w-full"
          initial={lipSync.currentPosition}
          animate={lipSync.controls}
          style={lipSync.currentPosition}
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
            className="absolute transform -translate-x-1/2 left-1/2 w-sp-[38.5] t-sp-[60] md:w-tablet-[60] md:t-tablet-[96] lg:w-pc-[70] lg:t-pc-[111] lottie-color-modifier"
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
