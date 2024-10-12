"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const variants = {
    small: { scale: 0.6 },
    normal: { scale: 1 },
  };

  return (
    <div className="absolute t-sp-[12] r-sp-[64] md:t-tablet-[20] md:r-tablet-[68] lg:relative lg:top-auto lg:right-auto lg:flex lg:justify-center lg:items-center lg:h-full lg:bg-secondary lg:w-pc-[104]">
      <motion.button
        className="flex justify-center items-center bg-white font-notosansjp px-sp-[10] py-sp-[4] md:px-tablet-[12] md:py-tablet-[4] lg:w-pc-[62] lg:h-pc-[34] text-pc-[26]"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <motion.span
          className="text-darkmode text-xl"
          animate={theme === "dark" ? "normal" : "small"}
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          ●
        </motion.span>
        <motion.span
          className="text-daymode text-xl"
          animate={theme === "dark" ? "small" : "normal"}
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          ●
        </motion.span>
      </motion.button>
    </div>
  );
}
