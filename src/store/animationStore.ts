import { create } from "zustand";

type LottieAnimationType = "hand" | "code" | "pen" | "cat" | "lipSync";

type LottieAnimationState = {
  hasPlayed: boolean;
  isPlaying: boolean;
  sequence: number;
};

type AnimationState = {
  isOpening: boolean;
  isAnimating: boolean;
  currentSegment: "start" | "lipSync" | "end" | null;
  lottieAnimations: Record<LottieAnimationType, LottieAnimationState>;
  setIsOpening: (isOpening: boolean) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setCurrentSegment: (segment: "start" | "lipSync" | "end" | null) => void;
  playAnimation: () => void;
  stopAnimation: () => void;
  playLottieAnimation: (animationName: LottieAnimationType) => void;
  stopLottieAnimation: (
    animationName: keyof AnimationState["lottieAnimations"],
  ) => void;
  resetLottieAnimations: () => void;
  setLottieAnimationSequence: (
    animationName: keyof AnimationState["lottieAnimations"],
    sequence: number,
  ) => void;
  resetAnimation: () => void;
};

export const useAnimationStore = create<AnimationState>((set) => ({
  isOpening: true,
  isAnimating: false,
  currentSegment: null,
  lottieAnimations: {
    hand: { hasPlayed: false, isPlaying: false, sequence: 0 },
    code: { hasPlayed: false, isPlaying: false, sequence: 0 },
    pen: { hasPlayed: false, isPlaying: false, sequence: 0 },
    cat: { hasPlayed: false, isPlaying: false, sequence: 0 },
    lipSync: { hasPlayed: false, isPlaying: false, sequence: 0 },
  },
  setIsOpening: (isOpening) => set({ isOpening }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setCurrentSegment: (segment) => {
    console.log("AnimationStore: Setting current segment to", segment);
    set({ currentSegment: segment });
  },
  playAnimation: () => {
    console.log("AnimationStore: Playing animation");
    set({ isAnimating: true, currentSegment: "start" });
  },
  stopAnimation: () => {
    console.log("AnimationStore: Stopping animation");
    set({ isAnimating: false, currentSegment: "end" });
  },
  playLottieAnimation: (animationName) => {
    console.log(`AnimationStore: Playing Lottie animation: ${animationName}`);
    set((state) => ({
      lottieAnimations: {
        ...state.lottieAnimations,
        [animationName]: {
          ...state.lottieAnimations[animationName],
          hasPlayed: true,
          isPlaying: true,
        },
      },
    }));
  },
  stopLottieAnimation: (animationName) => {
    console.log(`AnimationStore: Stopping Lottie animation: ${animationName}`);
    set((state) => ({
      lottieAnimations: {
        ...state.lottieAnimations,
        [animationName]: {
          ...state.lottieAnimations[animationName],
          isPlaying: false,
        },
      },
    }));
  },
  resetLottieAnimations: () =>
    set((state) => ({
      lottieAnimations: Object.keys(state.lottieAnimations).reduce(
        (acc, key) => ({
          ...acc,
          [key]: { hasPlayed: false, isPlaying: false, sequence: 0 },
        }),
        {} as AnimationState["lottieAnimations"],
      ),
    })),
  setLottieAnimationSequence: (animationName, sequence) =>
    set((state) => ({
      lottieAnimations: {
        ...state.lottieAnimations,
        [animationName]: {
          ...state.lottieAnimations[animationName],
          sequence,
        },
      },
    })),
  resetAnimation: () => {
    console.log("AnimationStore: Resetting animation state");
    set({
      isAnimating: false,
      currentSegment: null,
      lottieAnimations: {
        hand: { hasPlayed: false, isPlaying: false, sequence: 0 },
        code: { hasPlayed: false, isPlaying: false, sequence: 0 },
        pen: { hasPlayed: false, isPlaying: false, sequence: 0 },
        cat: { hasPlayed: false, isPlaying: false, sequence: 0 },
      },
    });
  },
}));
