"use client";

import { useAnimationStore } from "@/store/animationStore";
import { motion } from "framer-motion";

export default function TextContent() {
  // const { isRotating, isInitialAnimationComplete, triggerRotation } =
  //   useAnimationStore();
  //
  // if (!isInitialAnimationComplete) {
  //   return null;
  // }

  return (
    <>
      <p>TextContent</p>
      {/* <motion.button onClick={triggerRotation} disabled={isRotating}> */}
      {/*   回転 */}
      {/* </motion.button> */}
    </>
  );
}
