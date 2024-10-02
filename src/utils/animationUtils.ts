import { AnimationPositionResult } from "@/types/animation";
import { DeviceSize } from "@/types/device";
import { pxToPercent } from "./deviceUtils";
import { ANIMATION_POSITIONS } from "@/constants/animations";

export const getPositions = (
  deviceSize: DeviceSize,
): AnimationPositionResult => {
  const positions = ANIMATION_POSITIONS[deviceSize];
  return Object.entries(positions).reduce((acc, [key, value]) => {
    acc[key] = {
      initial: { [Object.keys(value)[0]]: "50%", right: "50%" },
      final: Object.entries(value).reduce(
        (finalAcc, [posKey, posValue]) => {
          finalAcc[posKey] = pxToPercent(posValue, deviceSize);
          return finalAcc;
        },
        {} as { [key: string]: string },
      ),
    };
    return acc;
  }, {} as AnimationPositionResult);
};

export const getSpecificPosition = (
  deviceSize: DeviceSize,
  elementKey: string,
): {
  initial: { [key: string]: string };
  final: { [key: string]: string };
} => {
  const positions = ANIMATION_POSITIONS[deviceSize];
  const elementPosition = positions[elementKey];

  if (!elementPosition) {
    throw new Error(`No position found element: ${elementKey}`);
  }

  return {
    initial: { [Object.keys(elementPosition)[0]]: "50%", right: "50%" },
    final: Object.entries(elementPosition).reduce(
      (finalAcc, [posKey, posValue]) => {
        finalAcc[posKey] = pxToPercent(posValue, deviceSize);
        return finalAcc;
      },
      {} as { [key: string]: string },
    ),
  };
};
