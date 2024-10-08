import Lottie, { LottieRefCurrentProps } from "lottie-react";
import SelfIntroductionTogglePlayButtonData from "../animations/TogglePlayButton.json";
import { useEffect, useRef, useState } from "react";
import { useAnimationStore } from "@/store/animationStore";

interface SelfIntroductionTogglePlayButtonProps {
  onClick: () => void;
}

export default function SelfIntroductionTogglePlayButton({
  onClick,
}: SelfIntroductionTogglePlayButtonProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAnimating, playAnimation, stopAnimation, setCurrentSegment } =
    useAnimationStore();

  useEffect(() => {
    if (lottieRef.current && !isInitialized) {
      lottieRef.current.goToAndStop(isAnimating ? 0 : 80, true);
      setIsInitialized(true);
    }
  }, [isAnimating, isInitialized]);

  const handleClick = () => {
    if (lottieRef.current) {
      if (isAnimating) {
        lottieRef.current.playSegments([40, 80], true);
        stopAnimation();
        setCurrentSegment("end");
      } else {
        lottieRef.current.playSegments([0, 40], true);
        playAnimation();
        setCurrentSegment("start");
      }
    }
    onClick();
  };

  return (
    <button
      className="w-sp-[34] md:w-tablet-[42] lg:w-pc-[46]"
      onClick={handleClick}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={SelfIntroductionTogglePlayButtonData}
        loop={false}
        autoplay={false}
      />
    </button>
  );
}
