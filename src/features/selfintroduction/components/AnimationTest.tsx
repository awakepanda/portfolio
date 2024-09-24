"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useAnimationStore } from "@/store/animationStore";
import { useEffect, useState } from "react";

export default function AnimationTest() {
  const { isAnimating, playAnimation, stopAnimation } = useAnimationStore();
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const controls = useAnimationControls();

  const text =
    "この結果をﾃﾞｭﾌﾌサーバに保存し、公開用のURLを発行します。除パスワードを設定しておけば、あとで消すこともできます。公開期間は3日間です。公開期間を過ぎると自動的に削除されます。";

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
  };

  const toggleAnimation = () => {
    if (isAnimating) {
      controls.stop();
      stopAnimation();
      setIsTextAnimating(false); // テキストアニメーションも停止
    } else {
      playAnimation();
      setIsTextAnimating(true); // テキストアニメーションを開始
      controls.start("visible"); // アニメーションを再生
    }
  };

  useEffect(() => {
    // アニメーションの初期状態を設定
    controls.set("hidden");

    // コンポーネントがアンマウントされたときのクリーンアップ
    return () => {
      controls.stop();
    };
  }, [controls]);

  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterAnimation}
          initial="hidden"
          animate={isTextAnimating ? controls : "hidden"} // アニメーションの状態に応じてコントロール
        >
          {char}
        </motion.span>
      ))}
      <button className="absolute bottom-11 left-0" onClick={toggleAnimation}>
        {isAnimating ? "停止" : "再生"}
      </button>
    </>
  );
}
