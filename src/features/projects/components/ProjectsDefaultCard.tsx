import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lipSyncAnimationData from "../../selfintroduction/animations/LipSync.json";
import blinkAnimationData from "../../selfintroduction/animations/Blink.json";
import { RotaingText } from "../svg/RotatingText";

export default function ProjectsDefaultCard() {
  return (
    <div className="w-full h-full flex justify-center pt-sp-[40] pb-sp-[40] md:pt-tablet-[130] md:pb-tablet-[80] lg:pt-pc-[130] lg:pb-pc-[80]">
      <div className="relative flex justify-center items-center border-illust bg-background w-sp-[300] border-2 rounded-sp-[24] md:rounded-tablet-[32] md:border-4 md:w-tablet-[760] lg:rounded-pc-[32] lg:w-pc-[660]">
        <div className="relative w-sp-[150] md:w-tablet-[272] lg:w-pc-[316]">
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
        </div>
        <motion.div
          className="absolute w-sp-[178] md:w-tablet-[368] lg:w-pc-[506]"
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
        >
          <RotaingText />
        </motion.div>
      </div>
    </div>
  );
}
