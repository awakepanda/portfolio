import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

const text = "こんにちは！前野慎吾です。デザインを担当しています。";
const accentWords = ["前野慎吾", "デザイン"];
const triggerWord = "デザイン";

type CharInfo = {
  char: string;
  isAccent: boolean;
};

type TextAnimatorProps = {
  onTriggerRotate: () => void;
};

export default function TextAnimator({ onTriggerRotate }: TextAnimatorProps) {
  const [visibleChars, setVisibleChars] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const charInfoArray = useMemo(() => {
    const result: CharInfo[] = [];
    let isInAccentWord = false;
    text.split("").forEach((char) => {
      if (accentWords.some((word) => word.startsWith(char))) {
        isInAccentWord = true;
      }
      result.push({ char, isAccent: isInAccentWord });
      if (accentWords.some((word) => word.endsWith(char))) {
        isInAccentWord = false;
      }
    });
    return result;
  }, []);

  const animate = useCallback((): void => {
    if (visibleChars < charInfoArray.length) {
      setVisibleChars((prev) => prev + 1);
      if (text.substring(0, visibleChars + 1).includes(triggerWord)) {
        onTriggerRotate();
      }
    } else {
      setIsAnimating(false);
      setIsCompleted(true);
    }
  }, [visibleChars, charInfoArray.length, onTriggerRotate]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isAnimating && !isCompleted) {
      intervalId = setInterval(animate, 100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnimating, isCompleted, animate]);

  const handlePlayPause = () => {
    if (isCompleted) {
      setVisibleChars(0);
      setIsCompleted(false);
    }
    setIsAnimating((prev) => !prev);
  };

  const renderText = (): ReactNode => {
    return charInfoArray.map((charInfo, index) => (
      <span
        key={index}
        className={`transition-colors duration-300 ${
          charInfo.isAccent ? "text-accent" : ""
        } ${
          index < visibleChars
            ? charInfo.isAccent
              ? "opacity-100"
              : "text-foreground"
            : "text-gray-300"
        }`}
      >
        {charInfo.char}
      </span>
    ));
  };

  return (
    <div>
      <div className="text-2xl mb-4">{renderText()}</div>
      <button
        onClick={handlePlayPause}
        className={`px-4 py-2 rounded ${
          isAnimating ? "bg-yellow-500" : "bg-green-500"
        } text-white`}
      >
        {isAnimating ? "一時停止" : isCompleted ? "リセット" : "再生"}
      </button>
      {isCompleted && <p className="mt-2 text-green-600">アニメーション完了</p>}
    </div>
  );
}
