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
    <div className="bg-secondary h-full lg:w-pc-[104] flex justify-center items-center">
      <motion.button
        className="flex justify-center items-center bg-white lg:w-pc-[62] lg:h-pc-[34] lg:text-[calc((100vw*26)/1728)] font-notosansjp"
        onClick={() => setTheme(theme === "dark" ? "leight" : "dark")}
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
