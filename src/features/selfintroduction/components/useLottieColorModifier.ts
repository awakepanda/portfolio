import { useEffect, useRef } from "react";
import { LottieRefCurrentProps } from "lottie-react";

type ColorReplacements = {
  [key: string]: string;
};

export const useLottieColorModifier = (
  lottieRef: React.RefObject<LottieRefCurrentProps>,
  colorReplacements: ColorReplacements,
) => {
  const hasModified = useRef(false);

  useEffect(() => {
    const modifyColors = () => {
      if (hasModified.current || !lottieRef.current) return;

      const lottieInstance = lottieRef.current;

      // Accessing the animation object directly
      const animation = (lottieInstance as any).animation;

      if (!animation) return;

      const layers = animation.renderer.elements;
      layers.forEach((layer: any) => {
        if (layer.data.shapes) {
          layer.data.shapes.forEach((shape: any) => {
            shape.it.forEach((item: any) => {
              if (item.ty === "fl" && item.c && item.c.k) {
                const originalColor = `rgb(${Math.round(
                  item.c.k[0] * 255,
                )},${Math.round(item.c.k[1] * 255)},${Math.round(
                  item.c.k[2] * 255,
                )})`;
                if (colorReplacements[originalColor]) {
                  const newColor = colorReplacements[originalColor];
                  const rgbMatch = newColor.match(
                    /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/,
                  );
                  if (rgbMatch) {
                    item.c.k = [
                      parseInt(rgbMatch[1]) / 255,
                      parseInt(rgbMatch[2]) / 255,
                      parseInt(rgbMatch[3]) / 255,
                      1,
                    ];
                  }
                }
              }
            });
          });
        }
      });

      // Force a re-render of the animation
      if (lottieInstance.pause && lottieInstance.play) {
        lottieInstance.pause();
        lottieInstance.play();
      }

      hasModified.current = true;
    };

    modifyColors();
  }, [lottieRef, colorReplacements]);
};
