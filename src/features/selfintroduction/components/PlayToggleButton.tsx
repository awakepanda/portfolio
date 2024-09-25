import Lottie, { LottieRefCurrentProps } from "lottie-react";
import TogglePlayButtonData from "./TogglePlayButton.json";
import { useEffect, useRef, useState } from "react";
import { useAnimationStore } from "@/store/animationStore";
export default function TogglePlayButton() {
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
  };
  return (
    <button
      className="absolute t-pc-[10] r-pc-[10] z-50 w-pc-[56]"
      onClick={handleClick}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={TogglePlayButtonData}
        loop={false}
        autoplay={false}
      />
    </button>
  );
}
