"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { motion } from "framer-motion";
import { useAnimationStore } from "@/store/animationStore";
import TogglePlayButton from "./TogglePlayButton";

const ANIMATION_SPEED = 10;
const SCROLL_DELAY = 1000; // スクロールバーを表示するまでの遅延（ミリ秒）

interface AnimatedTextProps {
  children: ReactNode;
  animatedWords: {
    text: string;
    className: string;
    animationType: "hand" | "code" | "pen" | "cat" | "lipSync";
  }[];
}

interface ProcessedContent {
  type: "char" | "element" | "animated-word";
  content: string | React.ReactElement;
  className?: string;
}

export default function AnimatedText({
  children,
  animatedWords,
}: AnimatedTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastAnimationTimeRef = useRef<number>(0);
  const animatedWordsRef = useRef(new Map<string, number>());
  const flattenedContentRef = useRef<ProcessedContent[]>([]);

  const {
    isAnimating,
    playAnimation,
    stopAnimation,
    setCurrentSegment,
    setCurrentWord,
    resetLottieAnimations,
    triggerAnimation, // 新しく追加
  } = useAnimationStore();

  useEffect(() => {
    const processNode = (node: ReactNode): ProcessedContent[] => {
      if (typeof node === "string") {
        return node.split("").map((char) => ({ type: "char", content: char }));
      }
      if (React.isValidElement(node)) {
        if (node.type === "br") {
          return [{ type: "element", content: node }];
        }
        if (typeof node.props.children === "string") {
          const animatedWord = animatedWords.find(
            (word) => word.text === node.props.children,
          );
          if (animatedWord) {
            return [
              {
                type: "animated-word",
                content: node.props.children,
                className: node.props.className,
              },
            ];
          }
          return node.props.children.split("").map((char: string) => ({
            type: "char",
            content: char,
            className: node.props.className,
          }));
        } else if (Array.isArray(node.props.children)) {
          return node.props.children.flatMap(processNode);
        } else if (React.isValidElement(node.props.children)) {
          return processNode(node.props.children);
        }
      }
      return [];
    };

    if (Array.isArray(children)) {
      flattenedContentRef.current = children.flatMap(processNode);
    } else {
      flattenedContentRef.current = processNode(children);
    }
  }, [children, animatedWords]);

  const checkAndPlayAnimation = useCallback(
    (index: number) => {
      const item = flattenedContentRef.current[index];
      if (item.type === "animated-word") {
        const animatedWord = animatedWords.find(
          (word) => word.text === item.content,
        );
        if (animatedWord) {
          console.log(`Triggering animation for: ${animatedWord.text}`);
          triggerAnimation(animatedWord.animationType); // setCurrentWord の代わりに triggerAnimation を使用
        }
      }
    },
    [animatedWords, triggerAnimation],
  );

  const animate = useCallback(() => {
    if (!isAnimating || visibleChars >= flattenedContentRef.current.length) {
      return;
    }

    const currentTime = performance.now();
    const elapsed = currentTime - lastAnimationTimeRef.current;

    if (elapsed >= ANIMATION_SPEED) {
      const newVisibleChars = visibleChars + 1;
      setVisibleChars(newVisibleChars);

      checkAndPlayAnimation(newVisibleChars - 1);

      lastAnimationTimeRef.current = currentTime;

      if (newVisibleChars >= flattenedContentRef.current.length) {
        stopAnimation();
        setCurrentWord(null);
        setCurrentSegment("end");
        setTimeout(() => setShowScrollbar(true), SCROLL_DELAY);
        return;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [
    isAnimating,
    visibleChars,
    checkAndPlayAnimation,
    stopAnimation,
    setCurrentSegment,
    setCurrentWord,
  ]);

  useEffect(() => {
    if (isAnimating) {
      lastAnimationTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
      setShowScrollbar(false);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, animate]); // animate関数をuseCallbackでメモ化することを確認してください

  const resetAnimation = useCallback(() => {
    setVisibleChars(0);
    setShowScrollbar(false);
    animatedWordsRef.current.clear();
    resetLottieAnimations();
  }, [resetLottieAnimations]);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current;
      const content = contentRef.current;

      if (content.offsetHeight > container.offsetHeight) {
        container.scrollTop = content.offsetHeight - container.offsetHeight;
      }
    }
  }, [visibleChars]);

  const renderContent = useCallback(() => {
    return flattenedContentRef.current
      .slice(0, visibleChars)
      .map((item, index) => {
        if (item.type === "element") {
          return React.cloneElement(item.content as React.ReactElement, {
            key: `element-${index}`,
          });
        }
        if (item.type === "animated-word") {
          return (
            <span key={`word-${index}`} className={item.className}>
              {(item.content as string)
                .split("")
                .map((char: string, charIndex: number) => (
                  <motion.span
                    key={`${index}-${charIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {char}
                  </motion.span>
                ))}
            </span>
          );
        }
        return (
          <motion.span
            key={`char-${index}`}
            className={item.className}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.content}
          </motion.span>
        );
      });
  }, [visibleChars]);

  const handleAnimationToggle = useCallback(() => {
    if (isAnimating) {
      stopAnimation();
      setCurrentSegment("end");
      setCurrentWord(null); // この行を追加
    } else {
      if (visibleChars === flattenedContentRef.current.length) {
        resetAnimation();
      }
      playAnimation();
      setCurrentSegment("start");
      setCurrentWord(null); // この行を追加
    }
  }, [
    isAnimating,
    visibleChars,
    resetAnimation,
    stopAnimation,
    playAnimation,
    setCurrentSegment,
    setCurrentWord, // この依存関係を追加
  ]);

  return (
    <>
      <div className="relative h-full">
        <div
          ref={containerRef}
          className={`h-full overflow-y-auto ${
            showScrollbar ? "custom-scrollbar" : "hide-scrollbar"
          }`}
        >
          <p
            ref={contentRef}
            className="text-primary text-sp-[16] leading-sp-[32] md:text-tablet-[20] md:leading-tablet-[40] lg:text-pc-[20] lg:leading-pc-[40]"
          >
            {renderContent()}
          </p>
        </div>
      </div>
      <TogglePlayButton onClick={handleAnimationToggle} />
    </>
  );
}
