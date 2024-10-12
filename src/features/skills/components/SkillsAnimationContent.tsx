"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  AdobeIcon,
  FigmaIcon,
  GitHubIcon,
  ReactIcon,
  VercelIcon,
} from "../icons/ProjectsIcons";
import Lottie from "lottie-react";
import lipSyncAnimationData from "../../selfintroduction/animations/LipSync.json";
import blinkAnimationData from "../../selfintroduction/animations/Blink.json";

export default function SkillsAnimationContent() {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <motion.div
        className="absolute t-sp-[24] l-sp-[84] w-sp-[44] md:t-tablet-[104] md:l-tablet-[180] md:w-tablet-[96] lg:t-pc-[170] lg:l-pc-[160] lg:w-pc-[80] origin-center"
        animate={{ scale: [0, 1, 1, 0], rotate: [0, 360, 360, 0] }}
        transition={{
          duration: 10.5,
          times: [0, 0.1, 0.9, 1], // 0.5秒 / 10.5秒 ≈ 0.0476
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <VercelIcon />
      </motion.div>
      <motion.div
        className="absolute t-sp-[20] r-sp-[92] w-sp-[46] md:t-tablet-[90] md:r-tablet-[200] md:w-tablet-[104] lg:t-pc-[160] lg:r-pc-[180] lg:w-pc-[90]"
        animate={{ rotateY: [0, 360, 360] }}
        transition={{
          duration: 10.5,
          times: [0, 0.09, 1], // 0.5秒 / 10.5秒 ≈ 0.0476
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <GitHubIcon />
      </motion.div>
      <motion.div
        className="absolute b-sp-[80] r-sp-[40] w-sp-[34] md:b-tablet-[140] md:r-tablet-[160] md:w-tablet-[70] lg:b-pc-[246] lg:r-pc-[130] lg:w-pc-[60]"
        animate={{ rotateX: [0, 0, 0, 360, 360] }}
        transition={{
          duration: 10.5,
          times: [0, 0.6, 0.9, 0.99, 1], // 0.5秒 / 10.5秒 ≈ 0.0476
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FigmaIcon />
      </motion.div>
      <motion.div
        className="absolute b-sp-[14] w-sp-[42] md:b-tablet-[60] md:w-tablet-[80] lg:b-pc-[120] lg:w-pc-[80]"
        initial={{ left: "50%", x: "-50%" }}
        animate={{ scale: [1, 1.4, 1, 1], rotate: [0, 360, 0, 0] }}
        transition={{
          duration: 8,
          times: [0, 0.1, 0.2, 1], // 0.5秒 / 10.5秒 ≈ 0.0476
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <AdobeIcon />
      </motion.div>
      <motion.div
        className="absolute b-sp-[80] l-sp-[38] w-sp-[52] md:b-tablet-[150] md:l-tablet-[134] md:w-tablet-[114] lg:b-pc-[230] lg:l-pc-[120] lg:w-pc-[96]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
          damping: 100,
        }}
      >
        <ReactIcon />
      </motion.div>
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
