"use client";

import { motion } from "framer-motion";

export default function Animation() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <motion.div
        className="w-[calc(317/960*100%)] aspect-square origin-center"
        initial={{ y: "-100vh", scale: 0.3 }}
        animate={{ y: 0, scale: 0.3 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 317 317"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="fill-illust" cx="158.537" cy="158.364" r="158" />
          <circle
            className="fill-illust-foreground"
            cx="128.016"
            cy="118.033"
            r="6.23684"
          />
          <circle
            className="fill-illust-foreground"
            cx="186.226"
            cy="118.033"
            r="6.23684"
          />
          <path
            className="stroke-illust-foreground"
            d="M220.737 158.364C220.737 158.364 211.59 208.259 158.311 208.259C105.033 208.259 95.1685 158.364 95.1685 158.364"
            stroke-width="7.50235"
            stroke-linecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
