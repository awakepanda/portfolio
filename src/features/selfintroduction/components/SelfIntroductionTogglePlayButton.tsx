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
  const {
    isAnimating,
    playAnimation,
    stopAnimation,
    setCurrentSegment,
    playLottieAnimation,
  } = useAnimationStore();

  useEffect(() => {
    if (lottieRef.current && !isInitialized) {
      // 初期状態を設定
      lottieRef.current.goToAndStop(isAnimating ? 0 : 80, true);
      setIsInitialized(true);
    }
  }, [isAnimating, isInitialized]);

  const handleClick = () => {
    if (lottieRef.current) {
      if (isAnimating) {
        // 停止アニメーションを再生 (40-80フレーム)
        lottieRef.current.playSegments([40, 80], true);
        stopAnimation();
        setCurrentSegment("end");
        playLottieAnimation("lipSync");
      } else {
        // 再生アニメーションを再生 (0-40フレーム)
        lottieRef.current.playSegments([0, 40], true);
        playAnimation();
        setCurrentSegment("start");
        playLottieAnimation("lipSync");
      }
    }
    onClick(); // AnimatedTextから渡された関数を呼び出す
  };

  return (
    <button
      className="absolute z-50 w-sp-[34] t-sp-[12] r-sp-[12] md:w-tablet-[42] md:t-tablet-[16] md:r-tablet-[16] lg:w-pc-[46] lg:t-pc-[10] lg:r-pc-[10]"
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
