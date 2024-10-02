import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { DEVICE_SIZES, DeviceSize } from "@/types/device";

export const useDeviceSize = (): DeviceSize => {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("pc");

  useEffect(() => {
    const getDeviceSize = (): DeviceSize => {
      const width = window.innerWidth;
      if (width >= DEVICE_SIZES.pc) return "pc";
      if (width >= DEVICE_SIZES.tablet) return "tablet";
      return "sp";
    };

    const handleResize = () => {
      const newSize = getDeviceSize();
      setDeviceSize(newSize);
    };

    const debouncedHandleResize = debounce(handleResize, 250);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", debouncedHandleResize);
      handleResize();

      return () => window.removeEventListener("resize", debouncedHandleResize);
    }
  }, []);
  return deviceSize;
};
