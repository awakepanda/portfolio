import { useCallback, useEffect, useRef, useState } from "react";

export interface EyePaths {
  left: { open: string; closed: string };
  right: { open: string; closed: string };
}

export interface MousePaths {
  face: {
    // smail: string;
    open: string;
    closed: string;
  };
}

export const useBlinkAnimation = () => {
  const [isEyeClosed, setIsEyeClosed] = useState(false);
  const animationRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    let startTime: number | null = null;
    const duration = 8800;

    const animationStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      if (elapsedTime < 100) setIsEyeClosed(true);
      else if (elapsedTime < 200) setIsEyeClosed(false);
      else if (elapsedTime < 300) setIsEyeClosed(true);
      else if (elapsedTime < 400) setIsEyeClosed(false);
      else if (elapsedTime < 4100) setIsEyeClosed(false);
      else if (elapsedTime < 4200) setIsEyeClosed(true);
      else if (elapsedTime < 4300) setIsEyeClosed(false);
      else if (elapsedTime < 5100) setIsEyeClosed(false);
      else if (elapsedTime < 5200) setIsEyeClosed(true);
      else if (elapsedTime < 5300) setIsEyeClosed(false);
      else setIsEyeClosed(false);

      if (elapsedTime < duration) {
        animationRef.current = requestAnimationFrame(animationStep);
      } else {
        startTime = null;
        animationRef.current = requestAnimationFrame(animationStep);
      }
    };

    animationRef.current = requestAnimationFrame(animationStep);
  }, []);

  useEffect(() => {
    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);
  return isEyeClosed;
};

export const useMouseAnimation = () => {
  const [isMouseClosed, setIsMouseClosed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    let startTime: number | null = null;
    const duration = 1400;

    const animationStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      if (elapsedTime < 100) setIsMouseClosed(true);
      else if (elapsedTime < 200) setIsMouseClosed(false);
      else if (elapsedTime < 300) setIsMouseClosed(true);
      else if (elapsedTime < 400) setIsMouseClosed(false);
      else if (elapsedTime < 700) setIsMouseClosed(false);
      else if (elapsedTime < 800) setIsMouseClosed(true);
      else if (elapsedTime < 900) setIsMouseClosed(false);
      else setIsMouseClosed(false);

      if (elapsedTime < duration) {
        animationRef.current = requestAnimationFrame(animationStep);
      } else {
        startTime = null;
        animationRef.current = requestAnimationFrame(animationStep);
      }
    };
    animationRef.current = requestAnimationFrame(animationStep);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      animate();
    } else {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsMouseClosed(false);
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
  return { isAnimating, isMouseClosed, toggleAnimation };
};
