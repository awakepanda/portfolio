"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export default function AnimationDemo() {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const frameCountRef = useRef<number>(0);

  const animate = useCallback(() => {
    let previousTimestamp: number | null = null;

    const animationStep = (timestamp: number) => {
      frameCountRef.current += 1;

      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
        console.log("Animation started at:", timestamp);
      }

      const elapsedTime = timestamp - startTimeRef.current;

      console.log("Frame:", frameCountRef.current);
      console.log("Timestamp:", timestamp);
      console.log("Elapsed time:", elapsedTime);

      if (previousTimestamp !== null) {
        const frameDuration = timestamp - previousTimestamp;
        console.log("Time since last frame:", frameDuration);
      }

      previousTimestamp = timestamp;

      if (elapsedTime < 5000 && isAnimating) {
        // Check isAnimating here
        animationRef.current = requestAnimationFrame(animationStep);
      } else {
        console.log("Animation completed or stopped");
        startTimeRef.current = null;
        frameCountRef.current = 0;
        setIsAnimating(false);
      }

      console.log("-------------------");
    };

    startTimeRef.current = null; // Reset startTime when animation starts
    frameCountRef.current = 0; // Reset frame count
    animationRef.current = requestAnimationFrame(animationStep);
  }, [isAnimating]); // Add isAnimating to dependencies

  useEffect(() => {
    if (isAnimating) {
      animate();
    } else if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isAnimating, animate]);

  const handleToggleAnimation = () => {
    setIsAnimating((prev) => !prev);
  };

  return (
    <div>
      <h1>Animation Demo</h1>
      <button onClick={handleToggleAnimation}>
        {isAnimating ? "Stop Animation" : "Start Animation"}
      </button>
      <p>Check the console for animation details</p>
    </div>
  );
}
