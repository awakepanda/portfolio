"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAnimationStore } from "@/store/animationStore";
import SelfIntroductionTogglePlayButton from "./SelfIntroductionTogglePlayButton";

const ANIMATION_SPEED = 10;
const SCROLL_DELAY = 1000;

interface SelfIntroductionAnimatedTextProps {
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

export default function SelfIntroductionAnimatedText({
  children,
  animatedWords,
}: SelfIntroductionAnimatedTextProps) {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastAnimationTimeRef = useRef<number>(0);
  const flattenedContentRef = useRef<ProcessedContent[]>([]);

  const {
    isAnimating,
    visibleChars,
    playAnimation,
    stopAnimation,
    setCurrentSegment,
    setCurrentWord,
    triggerAnimation,
    setVisibleChars,
    resetAnimation,
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
          triggerAnimation(animatedWord.animationType);
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
    setVisibleChars,
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
  }, [isAnimating, animate]);

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

  useEffect(() => {
    // Reset animation when component mounts
    resetAnimation();

    // Cleanup function to reset animation when component unmounts
    return () => {
      resetAnimation();
    };
  }, [resetAnimation]);

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
      setCurrentWord(null);
    } else {
      if (visibleChars === flattenedContentRef.current.length) {
        resetAnimation();
      }
      playAnimation();
      setCurrentSegment("start");
      setCurrentWord(null);
    }
  }, [
    isAnimating,
    visibleChars,
    resetAnimation,
    stopAnimation,
    playAnimation,
    setCurrentSegment,
    setCurrentWord,
  ]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getTopPosition = useCallback(() => {
    if (visibleChars === 0) {
      return isMobile ? "18%" : "28%";
    }
    return "2%";
  }, [visibleChars, isMobile]);

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
            className="text-primary text-sp-[14] leading-sp-[26] md:text-tablet-[20] md:leading-tablet-[40] lg:text-pc-[20] lg:leading-pc-[40]"
          >
            {renderContent()}
          </p>
        </div>
      </div>
      <AnimatePresence>
        {visibleChars === 0 && (
          <motion.p
            className="absolute top-[40%] md:top-[46%] lg:top-[46%] left-1/2 -translate-x-1/2 flex flex-col w-full text-center text-primary"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-notosansjp text-sp-[12] mb-sp-[2] md:text-tablet-[18] md:mb-tablet-[8] lg:text-pc-[18] lg:mb-pc-[8]">
              このボタンを押すと、私の自己紹介がスタートします！
            </span>
            <em className="text-sp-[18] leading-sp-[22] md:text-tablet-[32] md:leading-tablet-[40] lg:text-pc-[32] lg:leading-pc-[40]">
              Press this button to start
              <br />
              my self-introduction!
            </em>
          </motion.p>
        )}
      </AnimatePresence>
      <motion.div
        initial={{
          top: isMobile ? "18%" : "28%",
          right: "50%",
          x: "50%",
          scale: 1.6,
        }}
        animate={{
          top: getTopPosition(),
          right: visibleChars === 0 ? "50%" : "2%",
          x: visibleChars === 0 ? "50%" : "0%",
          scale: visibleChars === 0 ? 1.6 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 2,
        }}
        className="absolute z-50"
      >
        <SelfIntroductionTogglePlayButton onClick={handleAnimationToggle} />
      </motion.div>
    </>
  );
}
