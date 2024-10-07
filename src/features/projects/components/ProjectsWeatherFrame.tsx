import { useEffect, useState, useMemo, useCallback } from "react";
import { AnimationControls, motion } from "framer-motion";
import { TbMapPinFilled } from "react-icons/tb";
import ProjectsCitySelector from "./ProjectsCitySelector";
import { getWeatherIcon } from "@/utils/WeatherIcons";

interface WeatherData {
  condition: string;
  temp: string;
  cityId: string;
}

interface ProjectsWeatherFrameProps {
  currentWeather: WeatherData | null;
  nextWeather: WeatherData | null;
  controls: AnimationControls;
  handleAnimationComplete: () => void;
  handleAnimationUpdate: (latest: { rotateY: number }) => void;
}

export default function ProjectsWeatherFrame({
  currentWeather,
  controls,
  handleAnimationComplete,
  handleAnimationUpdate,
}: ProjectsWeatherFrameProps) {
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
          <WeatherIcon />
          <p className="text-illust font-inter font-medium leading-none mt-pc-[24] text-pc-[110]">
            {displayedWeather.temp}°C
          </p>
          <p className="flex items-center text-illust font-inter tracking-wide leading-none mt-pc-[12] text-pc-[30]">
            <TbMapPinFilled />
            <span>{displayedWeather.cityId}</span>/
            <span>{displayedWeather.condition.toUpperCase()}</span>
          </p>
          <ProjectsCitySelector />
        </>
      );
    }
    return (
      <p className="text-illust font-notosansjp text-pc-[24]">
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
      className="border-4 border-illust rounded-pc-[32] w-pc-[660] bg-background"
    >
      <motion.div
        className="w-full h-full"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="h-full flex flex-col justify-center items-center">
          {renderWeatherInfo()}
        </div>
      </motion.div>
    </motion.div>
  );
}
