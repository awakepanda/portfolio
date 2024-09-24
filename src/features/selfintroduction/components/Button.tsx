import { useAnimationStore } from "@/store/animationStore";

interface ButtonProps {
  onToggle: () => void;
}

const Button: React.FC<ButtonProps> = ({ onToggle }) => {
  const { isPlaying } = useAnimationStore();

  return (
    <button
      className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 font-bold py-2 px-4 rounded ${
        isPlaying
          ? "bg-red-500 hover:bg-red-700 text-white"
          : "bg-blue-500 hover:bg-blue-700 text-white"
      }`}
      onClick={onToggle}
    >
      {isPlaying ? "停止" : "開始"}
    </button>
  );
};

export default Button;
