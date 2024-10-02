import handAnimationData from "../features/selfintroduction/animations/Hand.json";
import penAnimationData from "../features/selfintroduction/animations/Pen.json";
import codeAnimationData from "../features/selfintroduction/animations/Code.json";
import catAnimationData from "../features/selfintroduction/animations/Cat.json";
import lipSyncAnimationData from "../features/selfintroduction/animations/LipSync.json";
import blinkAnimationData from "../features/selfintroduction/animations/Blink.json";

import {
  AnimationObject,
  AnimationPosition,
  FaceAnimationObject,
} from "@/types/animation";

export const ANIMATION_OBJECTS: AnimationObject[] = [
  {
    name: "hand",
    animationData: handAnimationData,
    className: "lottie-color-modifier w-sp-[48] md:w-tablet-[86] lg:w-pc-[90]",
    springConfig: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 2,
    },
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  },
  {
    name: "pen",
    animationData: penAnimationData,
    className:
      "lottie-color-modifier absolute w-sp-[88] md:w-tablet-[160] lg:w-pc-[164]",
    springConfig: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 2,
    },
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  },
  {
    name: "code",
    animationData: codeAnimationData,
    className:
      "lottie-color-modifier absolute w-sp-[42] md:w-tablet-[76] lg:w-pc-[77]",
    springConfig: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 2,
    },
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  },
  {
    name: "cat",
    animationData: catAnimationData,
    className:
      "lottie-color-modifier absolute w-sp-[98] md:w-tablet-[178] lg:w-pc-[180]",
    springConfig: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 2,
    },
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  },
];

export const ANIMATION_POSITIONS: AnimationPosition = {
  pc: {
    hand: { top: 170, right: 160 },
    pen: { bottom: 186, right: 68 },
    code: { bottom: 185, left: 144 },
    cat: { top: 180, left: 92 },
  },
  tablet: {
    hand: { top: 200, right: 190 },
    pen: { bottom: 202, right: 120 },
    code: { bottom: 210, left: 194 },
    cat: { top: 220, left: 126 },
  },
  sp: {
    hand: { top: 78, right: 70 },
    pen: { bottom: 80, right: 32 },
    code: { bottom: 82, left: 70 },
    cat: { top: 84, left: 30 },
  },
};

export const FACE_ANIMATION_OBJECT: FaceAnimationObject[] = [
  {
    name: "lipSync",
    animationData: lipSyncAnimationData,
    className: "lottie-color-modifier w-full h-full",
  },
  {
    name: "blink",
    animationData: blinkAnimationData,
    className:
      "lottie-color-modifier absolute transform -translate-x-1/2 left-1/2 w-sp-[38.5] t-sp-[60] md:w-tablet-[60] md:t-tablet-[96] lg:w-pc-[70] lg:t-pc-[111]",
  },
];
