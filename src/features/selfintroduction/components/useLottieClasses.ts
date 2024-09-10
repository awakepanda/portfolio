import { useEffect, useRef, useCallback } from "react";
import { LottieRefCurrentProps } from "lottie-react";

type LottieElement = {
  addEventListener: (event: string, callback: () => void) => void;
  removeEventListener: (event: string, callback: () => void) => void;
  wrapper: HTMLElement | null;
};

export const useLottieClasses = (
  lottieRef: React.RefObject<LottieRefCurrentProps>,
) => {
  const hasAppliedClasses = useRef(false);

  const applyClasses = useCallback(() => {
    if (hasAppliedClasses.current || !lottieRef.current) return;

    const lottieElement = lottieRef.current as unknown as LottieElement;
    const svg = lottieElement.wrapper?.querySelector("svg");
    if (!svg) return;

    const applyClassesToChildren = (element: Element, classNames: string[]) => {
      if (element.tagName === "g") {
        element.classList.add(...classNames);
        Array.from(element.children).forEach((child) =>
          applyClassesToChildren(child, classNames),
        );
      } else if (
        element.tagName === "path" ||
        element.tagName === "ellipse" ||
        element.tagName === "circle"
      ) {
        element.classList.add(...classNames);
        element.removeAttribute("fill");
      }
    };

    const elements = svg.querySelectorAll("[data-name]");
    elements.forEach((el: Element) => {
      const name = el.getAttribute("data-name");
      if (name) {
        const classNames = name
          .split(" ")
          .filter(
            (cn: string) => cn.startsWith("fill-") || cn.startsWith("stroke-"),
          );
        applyClassesToChildren(el, classNames);
      }
    });

    hasAppliedClasses.current = true;
  }, [lottieRef]);

  useEffect(() => {
    applyClasses();

    const lottieElement = lottieRef.current as unknown as LottieElement;
    lottieElement?.addEventListener("DOMLoaded", applyClasses);

    return () => {
      lottieElement?.removeEventListener("DOMLoaded", applyClasses);
    };
  }, [lottieRef, applyClasses]);
};
