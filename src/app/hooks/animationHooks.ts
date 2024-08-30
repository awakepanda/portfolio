import { useCallback, useEffect, useRef, useState } from "react";

export interface EyePaths {
  left: { open: string; closed: string };
  right: { open: string; closed: string };
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
