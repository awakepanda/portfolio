import { create } from "zustand";

interface AnimationState {
  isInitialAnimationComplete: boolean;
  isRotating: boolean;
  triggerRotation: () => void;
  completeRotation: () => void;
  completeInitialAnimation: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isInitialAnimationComplete: false,
  isRotating: false,
  triggerRotation: () =>
    set((state) => {
      if (!state.isRotating && state.isInitialAnimationComplete) {
        return { isRotating: true };
      }
      return state;
    }),
  completeRotation: () => set({ isRotating: false }),
  completeInitialAnimation: () => set({ isInitialAnimationComplete: true }),
}));
