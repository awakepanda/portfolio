import { useEffect, useState, useMemo, useCallback } from "react";
import { AnimationControls, motion } from "framer-motion";
import { TbMapPinFilled } from "react-icons/tb";
import { getWeatherIcon } from "@/utils/WeatherIcons";
import CitySelector from "./CitySelector";

interface WeatherData {
  condition: string;
  temp: string;
  cityId: string;
}

interface WeatherFrameProps {
  currentWeather: WeatherData | null;
  nextWeather: WeatherData | null;
  controls: AnimationControls;
  handleAnimationComplete: () => void;
  handleAnimationUpdate: (latest: { rotateY: number }) => void;
}

export default function WeatherFrame({
  currentWeather,
  controls,
  handleAnimationComplete,
  handleAnimationUpdate,
}: WeatherFrameProps) {
  const [displayedWeather, setDisplayedWeather] = useState<WeatherData | null>(
    currentWeather,
  );

  useEffect(() => {
    if (currentWeather) {
      setDisplayedWeather(currentWeather);
    }
  }, [currentWeather]);

  const WeatherIcon = useMemo(
    () =>
      displayedWeather ? getWeatherIcon(displayedWeather.condition) : null,
    [displayedWeather],
  );

  const renderWeatherInfo = useCallback(() => {
    if (displayedWeather && WeatherIcon) {
      return (
        <>
          <div className="flex flex-col items-center md:flex-row lg:flex-col">
            <WeatherIcon />
            <div className="ml-0 flex flex-col items-center mb-sp-[8] ml-0 md:mb-tablet-[30] md:ml-tablet-[50] lg:m-0">
              <p className="text-illust font-inter font-medium leading-none mt-sp-[8] text-sp-[40] md:mt-0 md:text-tablet-[126] lg:mt-pc-[24] lg:text-pc-[110]">
                {displayedWeather.temp}°C
              </p>
              <p className="flex items-center text-illust font-inter tracking-wide leading-none mt-sp-[4] text-sp-[14] md:mt-tablet-[12] md:text-tablet-[32] lg:mt-pc-[12] lg:text-pc-[30]">
                <TbMapPinFilled />
                <span>{displayedWeather.cityId}</span>/
                <span>{displayedWeather.condition.toUpperCase()}</span>
              </p>
            </div>
          </div>
          <div>
            <CitySelector />
          </div>
        </>
      );
    }
    return (
      <p className="text-illust font-notosansjp text-sp-[18] md:text-tablet-[24] lg:text-pc-[24]">
        天気情報を取得中...
      </p>
    );
  }, [displayedWeather, WeatherIcon]);

  return (
    <motion.div
      animate={controls}
      initial={{ rotateY: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onUpdate={handleAnimationUpdate}
      onAnimationComplete={handleAnimationComplete}
      style={{ transformStyle: "preserve-3d" }}
      className="border-illust bg-background border-2 rounded-sp-[24] w-sp-[300] md:border-4 md:rounded-tablet-[32] md:w-tablet-[760] lg:rounded-pc-[32] lg:w-pc-[660]"
    >
      <motion.div
        className="w-full h-full"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="h-full flex flex-col justify-center items-center flex-col">
          {renderWeatherInfo()}
        </div>
      </motion.div>
    </motion.div>
  );
}
