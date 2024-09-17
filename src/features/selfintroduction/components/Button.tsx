interface ButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

export default function Button({ isPlaying, onClick }: ButtonProps) {
  return (
    <button
      className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 font-bold text-white py-2 px-4 rounded ${
        isPlaying
          ? "bg-red-500 hover:bg-red-700"
          : "bg-blue-500 hover:bg-blue-700 text-white"
      }`}
      onClick={onClick}
    >
      {isPlaying ? "停止" : "再生"}
    </button>
  );
}
