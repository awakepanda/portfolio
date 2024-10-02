import { DeviceSize } from "./device";

export type AnimationObject = {
  name: string;
  animationData: any;
  className: string;
  springConfig: {
    type: "spring";
    stiffness: number;
    damping: number;
    mass: number;
  };
  initial: {
    scale: number;
    opacity: number;
  };
  animate: {
    scale: number;
    opacity: number;
  };
};

export type AnimationPosition = {
  [key in DeviceSize]: {
    [key: string]: { [key: string]: number };
  };
};

export type FaceAnimationStyles = {
  initial: {
    opacity: number;
    scale: number;
    rotate: number;
  };
  animate: {
    opacity: number;
    scale: number;
    rotate: number;
  };
};

export type FaceAnimationPositions = {
  top: string;
  left: string;
  x: string;
  y: string;
};

export type FaceAnimationObject = {
  name: string;
  animationData: any;
  className: string;
};

type PositionValue = {
  [key: string]: string;
};

export type AnimationPositionResult = {
  [key: string]: {
    initial: PositionValue;
    final: PositionValue;
  };
};
