import { ANIMATION_CONTAINER_SIZES, DeviceSize } from "@/types/device";

export const pxToPercent = (px: number, deviceSize: DeviceSize) => {
  return `${(px / ANIMATION_CONTAINER_SIZES[deviceSize]) * 100}%`;
};
