"use client";

import { motion } from "framer-motion";
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
        className="absolute t-pc-[170] l-pc-[160] w-pc-[80] origin-center"
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
        className="absolute t-pc-[160] r-pc-[180] w-pc-[90]"
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
        className="absolute b-pc-[246] r-pc-[130] w-pc-[60] origin-center"
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
        className="absolute b-pc-[120] w-pc-[80] origin-center"
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
        className="absolute b-pc-[230] l-pc-[120] w-pc-[96] origin-center"
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
    </div>
  );
}
