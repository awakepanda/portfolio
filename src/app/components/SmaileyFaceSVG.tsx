"use client";

// import React from "react";
import { motion } from "framer-motion";

type SmileyFaceSVGProps = {
  className?: string;
};

interface AnimationAreaProps {
  rotate: boolean;
}

// export default function SmileyFaceSVG({ className }: SmileyFaceSVGProps) {
export default function SmileyFaceSVG({ rotate }: AnimationAreaProps) {
  return (
    <>
      <motion.div
        className="w-20 h-20 bg-blue-500"
        animate={{ rotate: rotate ? 360 : 0 }}
        transition={{ duration: 2, ease: "easInOut" }}
      />
      {/* <svg */}
      {/*   className={className} */}
      {/*   viewBox="0 0 380 380" */}
      {/*   xmlns="http://www.w3.org/2000/svg" */}
      {/* > */}
      {/*   <circle cx="190" cy="190" r="190" className="fill-illust" /> */}
      {/*   <circle */}
      {/*     cx="154.5" */}
      {/*     cy="141.5" */}
      {/*     r="7.5" */}
      {/*     className="fill-illust-foreground" */}
      {/*   /> */}
      {/*   <circle */}
      {/*     cx="224.5" */}
      {/*     cy="141.5" */}
      {/*     r="7.5" */}
      {/*     className="fill-illust-foreground" */}
      {/*   /> */}
      {/*   <path */}
      {/*     d="M265 190C265 190 254 250 189.931 250C125.863 250 114 190 114 190" */}
      {/*     className="stroke-illust-foreground" */}
      {/*     // stroke="white" */}
      {/*     fill="none" */}
      {/*     stroke-width="8" */}
      {/*     stroke-linecap="round" */}
      {/*   /> */}
      {/* </svg> */}
    </>
  );
}
