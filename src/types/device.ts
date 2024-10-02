export const DEVICE_SIZES = {
  pc: 1728,
  tablet: 768,
  sp: 393, // for referrence
} as const;

export type DeviceSize = keyof typeof DEVICE_SIZES;

export const ANIMATION_CONTAINER_SIZES = {
  pc: 848,
  tablet: 1024,
  sp: 393,
} as const;
