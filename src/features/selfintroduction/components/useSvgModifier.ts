import { useEffect, useRef } from "react";

export const useSvgModifier = (
  containerRef: React.RefObject<HTMLDivElement>,
) => {
  const hasModified = useRef(false);

  useEffect(() => {
    const modifySvg = () => {
      if (hasModified.current) return;

      const svgElement = containerRef.current?.querySelector("svg");
      if (!svgElement) return;

      const modifyElement = (element: Element) => {
        if (element instanceof SVGElement) {
          // Remove fill attribute
          element.removeAttribute("fill");

          // Apply class based on data-name attribute
          const dataName = element.getAttribute("data-name");
          if (dataName) {
            const classes = dataName
              .split(" ")
              .filter((cn) => cn.startsWith("fill-"));
            element.classList.add(...classes);
          }
        }

        // Recursively modify child elements
        element.childNodes.forEach((child) => {
          if (child instanceof Element) {
            modifyElement(child);
          }
        });
      };

      modifyElement(svgElement);
      hasModified.current = true;
    };

    // Initial modification
    modifySvg();

    // Set up a MutationObserver to handle dynamic changes
    const observer = new MutationObserver(modifySvg);
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);
};
