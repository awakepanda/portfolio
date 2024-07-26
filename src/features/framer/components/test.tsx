"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Test() {
  const [isSquare, setIsSquare] = useState<boolean>(false);

  const toggleShape = () => {
    setIsSquare(!isSquare);
  };
  return (
    <motion.div
      onClick={toggleShape}
      animate={{
        borderRadius: isSquare ? "0%" : "50%",
        width: isSquare ? "200px" : "100px",
        height: isSquare ? "200px" : "100px",
        backgroundColor: "red",
      }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "blue",
        margin: "50px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <span style={{ color: "white", fontWeight: "bold" }}>
        {isSquare ? "Square" : "Circle"}
      </span>
    </motion.div>
  );
}
