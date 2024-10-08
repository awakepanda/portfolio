import { create } from "zustand";

type AnimationSegment = "start" | "lipSync" | "end";

interface AnimationStore {
  isAnimating: boolean;
  currentSegment: AnimationSegment;
  currentWord: string | null;
  animationTrigger: number; // 追加
  playAnimation: () => void;
  stopAnimation: () => void;
  setCurrentSegment: (segment: AnimationSegment) => void;
  setCurrentWord: (word: string | null) => void;
  triggerAnimation: (animationType: string) => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  isAnimating: false,
  currentSegment: "start",
  currentWord: null,
  animationTrigger: 0, // 追加
  playAnimation: () => set({ isAnimating: true }),
  stopAnimation: () => set({ isAnimating: false }),
  setCurrentSegment: (segment) => set({ currentSegment: segment }),
  setCurrentWord: (word) => set({ currentWord: word }),
  triggerAnimation: (animationType) =>
    set((state) => ({
      currentWord: animationType,
      animationTrigger: state.animationTrigger + 1,
    })),
}));
