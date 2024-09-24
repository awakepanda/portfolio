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

const pxToPercent = (px: number, deviceSize: keyof typeof DEVICE_SIZES) => {
  return `${(px / DEVICE_SIZES[deviceSize]) * 100}%`;
};

export default function AnimationContent() {
  const {
    isOpening,
    isAnimating,
    currentSegment,
    lottieAnimations,
    setIsOpening,
    setIsAnimating,
    setCurrentSegment,
    stopLottieAnimation,
  } = useAnimationStore();

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

  const [startMarker, setStartMarker] = useState<any>(null);
  const [lipSyncMarker, setLipSyncMarker] = useState<any>(null);
  const [endMarker, setEndMarker] = useState<any>(null);

  useEffect(() => {
    console.log("Initializing markers");
    const foundMarkers = lipSyncAnimationData.markers || [];
    setStartMarker(foundMarkers.find((m) => m.cm === "start"));
    setLipSyncMarker(foundMarkers.find((m) => m.cm === "lipSync")); // "lip-sync" から "lipSync" に変更
    setEndMarker(foundMarkers.find((m) => m.cm === "end"));

    console.log("Found markers:", foundMarkers);
    console.log(
      "LipSync marker:",
      foundMarkers.find((m) => m.cm === "lipSync"),
    );
  }, []);

  const animatePositions = useCallback(
    async (deviceSize: keyof typeof DEVICE_SIZES) => {
      const animations = [
        handControls.start({
          top: pxToPercent(240, deviceSize),
          right: pxToPercent(180, deviceSize),
          transition: { duration: 1, ease: "easeInOut" },
        }),
        codeControls.start({
          bottom: pxToPercent(200, deviceSize),
          left: pxToPercent(180, deviceSize),
          transition: { duration: 1, ease: "easeInOut" },
        }),
        penControls.start({
          bottom: pxToPercent(236, deviceSize),
          right: pxToPercent(124, deviceSize),
          transition: { duration: 1, ease: "easeInOut" },
        }),
        catControls.start({
          top: pxToPercent(220, deviceSize),
          left: pxToPercent(144, deviceSize),
          transition: { duration: 1, ease: "easeInOut" },
        }),
        lipSyncControls.start({
          scale: 1,
          rotate: 360,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 2,
          },
        }),
      ];

      await Promise.all(animations);
      setIsOpening(false);
    },
    [
      handControls,
      codeControls,
      penControls,
      catControls,
      lipSyncControls,
      setIsOpening,
    ],
  );

  const playOpeningSequence = useCallback(
    (deviceSize: keyof typeof DEVICE_SIZES) => {
      animatePositions(deviceSize);
    },
    [animatePositions],
  );

  useEffect(() => {
    if (isOpening) {
      console.log("AnimationContent: Opening animation started");
      const currentDeviceSize: keyof typeof DEVICE_SIZES = "pc";
      playOpeningSequence(currentDeviceSize);
    }
  }, [isOpening, playOpeningSequence]);

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

  const startTextAnimation = useCallback(() => {
    console.log("Starting text animation");
    setIsAnimating(true);
    setCurrentSegment("start");
    // 明示的にLipSyncアニメーションを開始
    if (lipSyncRef.current) {
      lipSyncRef.current.goToAndPlay(0);
    }
  }, [setIsAnimating, setCurrentSegment]);

  const stopTextAnimation = useCallback(() => {
    console.log("Stopping text animation");
    setCurrentSegment("end");
  }, [setCurrentSegment]);

  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ top: "50%", right: "50%", x: "50%", y: "-50%" }}
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
        initial={{ bottom: "50%", right: "50%", x: "50%", y: "50%" }}
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
        initial={{ bottom: "50%", left: "50%", x: "-50%" }}
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
        initial={{ top: "50%", left: "50%", x: "-50%" }}
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
      {!isOpening && (
        <div className="absolute bottom-16 left-0 space-x-4">
          <button
            onClick={startTextAnimation}
            className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
          >
            Start Text Animation
          </button>
          <button
            onClick={stopTextAnimation}
            className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white rounded"
          >
            Stop Text Animation
          </button>
        </div>
      )}
    </div>
  );
}
