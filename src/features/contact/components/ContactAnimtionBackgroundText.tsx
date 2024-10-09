import React, { useState, useEffect } from "react";

export default function ContactAnimationBackgroundText() {
  const textLines = [
    "Please feel",
    "free to contact",
    "me for design",
    "front-end development, etc...",
  ];
  const text = textLines.join(" ");
  const [animatedChars, setAnimatedChars] = useState<boolean[]>(
    new Array(text.length).fill(false),
  );

  useEffect(() => {
    const animationInterval = 100;
    const startDelay = 500;
    const timer = setTimeout(() => {
      text.split("").forEach((_, index) => {
        setTimeout(() => {
          setAnimatedChars((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * animationInterval);
      });
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text]);

  let overallIndex = 0;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="font-medium text-center opacity-60 text-pc-[100] leading-pc-[120] w-full px-pc-[30]">
        {textLines.map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {line.split("").map((char, charIndex) => {
              const currentIndex = overallIndex++;
              return (
                <span
                  key={currentIndex}
                  className={`inline-block transition-colors duration-500 ${
                    animatedChars[currentIndex] ? "text-illust" : "text-light"
                  } ${char === " " ? "space-char" : ""}`}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
            {lineIndex < textLines.length - 1 && (
              <>
                <br />
                {(overallIndex++, null)}
              </>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
