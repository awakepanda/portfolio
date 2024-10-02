import React from "react";

interface AnimationControlButtonProps {
  isAnimating: boolean;
  onClick: () => void;
}

const AnimationControlButton: React.FC<AnimationControlButtonProps> = ({
  isAnimating,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 font-bold py-2 px-4 rounded ${
        isAnimating
          ? "bg-red-500 hover:bg-red-700 text-white"
          : "bg-blue-500 hover:bg-blue-700 text-white"
      }`}
    >
      {isAnimating ? "停止" : "開始"}
    </button>
  );
};

export default AnimationControlButton;
