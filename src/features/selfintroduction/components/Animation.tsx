"use client";
import {
  EyePaths,
  MousePaths,
  useBlinkAnimation,
  useMouseAnimation,
} from "@/app/hooks/animationHooks";
import { useSpring, animated, easings } from "@react-spring/web";

const eyePaths: EyePaths = {
  left: {
    open: "M133.716 117.237C133.716 120.681 130.924 123.474 127.479 123.474C124.035 123.474 121.242 120.681 121.242 117.237C121.242 113.792 124.035 111 127.479 111C130.924 111 133.716 113.792 133.716 117.237Z",
    closed:
      "M134 117.5C134 117.776 131.09 118 127.5 118C123.91 118 121 117.776 121 117.5C121 117.224 123.91 117 127.5 117C131.09 117 134 117.224 134 117.5Z",
  },
  right: {
    open: "M191.926 117.237C191.926 120.681 189.134 123.474 185.689 123.474C182.245 123.474 179.453 120.681 179.453 117.237C179.453 113.792 182.245 111 185.689 111C189.134 111 191.926 113.792 191.926 117.237Z",
    closed:
      "M192 117.5C192 117.776 189.09 118 185.5 118C181.91 118 179 117.776 179 117.5C179 117.224 181.91 117 185.5 117C189.09 117 192 117.224 192 117.5Z",
  },
};

const mousePaths: MousePaths = {
  face: {
    smile:
      "M93.1985 154.337C95.2217 153.894 97.2206 155.175 97.6632 157.199C100.954 172.244 116.843 203.25 158 203.25C199.242 203.25 216.033 172.142 218.814 157.309C219.196 155.273 221.155 153.933 223.191 154.314C225.227 154.696 226.567 156.655 226.186 158.691C222.967 175.858 203.958 210.75 158 210.75C111.957 210.75 94.0453 175.756 90.3364 158.801C89.8939 156.778 91.1752 154.779 93.1985 154.337Z",
    open: "M158.859 223.279C189.627 223.279 195.864 197.395 195.864 182.947C195.864 168.5 173.827 163.068 158.859 163.068C143.89 163.068 121.509 166.391 121.022 182.947C120.535 199.503 128.09 223.279 158.859 223.279Z",
    closed:
      "M159 195.5C174.923 195.5 195.995 188.584 195.995 184.292C195.995 180 177 188 158.922 188C140.845 188 122.625 180 121.017 184.292C119.408 188.584 143.077 195.5 159 195.5Z",
  },
};

export default function Animation() {
  const isEyesClosed = useBlinkAnimation();

  const leftEyeSpring = useSpring({
    d: isEyesClosed ? eyePaths.left.closed : eyePaths.left.open,
    config: { duration: 100, easing: easings.easeInOutQuad },
  });
  const rightEyeSpring = useSpring({
    d: isEyesClosed ? eyePaths.right.closed : eyePaths.right.open,
    config: { duration: 100, easing: easings.easeInOutQuad },
  });

  const { isAnimating, isMouseClosed, toggleAnimation } = useMouseAnimation();

  const mouseSpring = useSpring({
    d: isMouseClosed ? mousePaths.face.open : mousePaths.face.closed,
    config: { duration: 100, easing: easings.easeInOutQuad },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="w-[calc(317/960*100%)] aspect-square origin-center mb-4">
        <svg
          className="w-full h-full"
          viewBox="0 0 317 317"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="fill-illust" cx="158.537" cy="158.364" r="158" />
          <animated.path
            className="fill-illust-foreground"
            d={leftEyeSpring.d}
          />
          <animated.path
            className="fill-illust-foreground"
            d={rightEyeSpring.d}
          />
          <animated.path
            className="fill-illust-foreground"
            // d={mousePaths.face.open}
            d={mouseSpring.d}
          />
        </svg>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={toggleAnimation}
      >
        {isAnimating ? "停止" : "再生"}
      </button>
    </div>
  );
}
