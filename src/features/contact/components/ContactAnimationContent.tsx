"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lipSyncAnimationData from "../../selfintroduction/animations/LipSync.json";
import blinkAnimationData from "../../selfintroduction/animations/Blink.json";
import ContactAnimationBackgroundText from "./ContactAnimtionBackgroundText";

export default function ContactAniamtionContent() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ContactAnimationBackgroundText />
      <div className="relative w-sp-[172] md:w-tablet-[272] lg:w-pc-[316]">
        <Lottie
          animationData={lipSyncAnimationData}
          className="lottie-color-modifier w-full h-full"
          autoplay={false}
          loop={false}
        />
        <Lottie
          animationData={blinkAnimationData}
          className="lottie-color-modifier absolute transform -translate-x-1/2 left-1/2 w-sp-[38.5] t-sp-[60] md:w-tablet-[60] md:t-tablet-[96] lg:w-pc-[70] lg:t-pc-[111]"
          autoplay={true}
          loop={true}
        />
      </div>
      <motion.div
        className="absolute w-pc-[506]"
        initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
          damping: 100,
        }}
      ></motion.div>
    </div>
  );
}
