"use client";

import { motion } from "framer-motion";

export default function Scrolltext() {
  const repeatText: string =
    "WEB & MOBILE UI&UX　DESIGN FRONT-END DEVELOPMENT ".repeat(20);
  return (
    <motion.p
      className="h-full font-inter font-thin text-light text-[calc((100vw*18)/1728)] whitespace-nowrap vertical-rl"
      initial={{ y: "-100%" }}
      animate={{ y: "0" }}
      transition={{
        duration: 50,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {repeatText}
    </motion.p>
  );
}
