"use client";

import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import lipSyncAnimationData from "../../selfintroduction/animations/LipSync.json";
import blinkAnimationData from "../../selfintroduction/animations/Blink.json";
import ContactAnimationBackgroundText from "./ContactAnimtionBackgroundText";

export default function ContactAniamtionContent() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ContactAnimationBackgroundText />
      <AnimatePresence mode="wait">
        <motion.div
          className="relative w-sp-[150] md:w-tablet-[272] lg:w-pc-[316]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Lottie
            animationData={lipSyncAnimationData}
            className="lottie-color-modifier w-full h-full"
            autoplay={false}
            loop={false}
          />
          <Lottie
            animationData={blinkAnimationData}
            className="lottie-color-modifier absolute transform -translate-x-1/2 left-1/2 w-sp-[33] t-sp-[52] md:w-tablet-[60] md:t-tablet-[96] lg:w-pc-[70] lg:t-pc-[111]"
            autoplay={true}
            loop={true}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
