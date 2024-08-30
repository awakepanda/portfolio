"use client";
import { useSpring, animated, easings } from "@react-spring/web";
import { useState, useCallback, useRef, useEffect } from "react";

export default function Animation() {
  const leftEyeInitialPath =
    "M133.716 117.237C133.716 120.681 130.924 123.474 127.479 123.474C124.035 123.474 121.242 120.681 121.242 117.237C121.242 113.792 124.035 111 127.479 111C130.924 111 133.716 113.792 133.716 117.237Z";
  const leftEyeTargetPath =
    "M134 117.5C134 117.776 131.09 118 127.5 118C123.91 118 121 117.776 121 117.5C121 117.224 123.91 117 127.5 117C131.09 117 134 117.224 134 117.5Z";
  const rightEyeInitialPath =
    "M191.926 117.237C191.926 120.681 189.134 123.474 185.689 123.474C182.245 123.474 179.453 120.681 179.453 117.237C179.453 113.792 182.245 111 185.689 111C189.134 111 191.926 113.792 191.926 117.237Z";
  const rightEyeTargetPath =
    "M192 117.5C192 117.776 189.09 118 185.5 118C181.91 118 179 117.776 179 117.5C179 117.224 181.91 117 185.5 117C189.09 117 192 117.224 192 117.5Z";

  const [isEyesClosed, setIsEyesClosed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  const leftEyeSpring = useSpring({
    d: isEyesClosed ? leftEyeTargetPath : leftEyeInitialPath,
    config: { duration: 100, easing: easings.easeInOutQuad },
  });
  const rightEyeSpring = useSpring({
    d: isEyesClosed ? rightEyeTargetPath : rightEyeInitialPath,
    config: { duration: 100, easing: easings.easeInOutQuad },
  });

  const animate = useCallback(() => {
    let startTime: number | null = null;
    const duration = 8800; // Total duration of one animation cycle

    const animationStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      if (elapsedTime < 100) setIsEyesClosed(true);
      else if (elapsedTime < 200) setIsEyesClosed(false);
      else if (elapsedTime < 300) setIsEyesClosed(true);
      else if (elapsedTime < 400) setIsEyesClosed(false);
      else if (elapsedTime < 4100) setIsEyesClosed(false);
      else if (elapsedTime < 4200) setIsEyesClosed(true);
      else if (elapsedTime < 4300) setIsEyesClosed(false);
      else if (elapsedTime < 5100) setIsEyesClosed(false);
      else if (elapsedTime < 5200) setIsEyesClosed(true);
      else if (elapsedTime < 5300) setIsEyesClosed(false);
      else setIsEyesClosed(false);

      if (elapsedTime < duration) {
        animationRef.current = requestAnimationFrame(animationStep);
      } else {
        startTime = null;
        if (isAnimating) {
          animationRef.current = requestAnimationFrame(animationStep);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animationStep);
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      animate();
    } else {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsEyesClosed(false);
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, animate]);

  const toggleAnimation = useCallback(() => {
    setIsAnimating((prev) => !prev);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="w-[calc(317/960*100%)] aspect-square origin-center mb-4">
        <svg
          className="w-full h-full"
          viewBox="0 0 317 317"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="fill-illust" cx="158.537" cy="158.364" r="158" />
          <animated.path
            className="fill-illust-foreground"
            d={leftEyeSpring.d}
          />
          <animated.path
            className="fill-illust-foreground"
            d={rightEyeSpring.d}
          />
          <path
            className="stroke-illust-foreground"
            d="M220.737 158.364C220.737 158.364 211.59 208.259 158.311 208.259C105.033 208.259 95.1685 158.364 95.1685 158.364"
            strokeWidth="7.50235"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={toggleAnimation}
      >
        {isAnimating ? "停止" : "再生"}
      </button>
    </div>
  );
}
