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
  displayedWeather: WeatherData | null;
  controls: AnimationControls;
  handleAnimationUpdate: (latest: { rotateY: number }) => void;
  handleAnimationComplete: () => void;
}

export default function ProjectsWeatherFrame({
  displayedWeather,
  controls,
  handleAnimationUpdate,
  handleAnimationComplete,
}: ProjectsWeatherFrameProps) {
  const WeatherIcon = displayedWeather
    ? getWeatherIcon(displayedWeather.condition)
    : null;

  return (
    <motion.div
      animate={controls}
      initial={{ rotateY: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onUpdate={handleAnimationUpdate}
      onAnimationComplete={handleAnimationComplete}
      style={{ transformStyle: "preserve-3d" }}
      className="border-4 border-illust bg-background rounded-pc-[32] w-pc-[660]"
    >
      <motion.div
        className="w-full h-full"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="h-full flex flex-col justify-center items-center">
          {displayedWeather && WeatherIcon ? (
            <>
              <WeatherIcon />
              <p className="text-illust font-inter font-medium leading-none mt-pc-[24] text-pc-[110]">
                {displayedWeather.temp}°C
              </p>
              <p className="flex items-center text-illust font-inter leading-none mt-pc-[12] text-pc-[30]">
                <TbMapPinFilled />
                <span>{displayedWeather.cityId}</span>/
                <span>{displayedWeather.condition.toUpperCase()}</span>
              </p>
              <ProjectsCitySelector />
            </>
          ) : (
            <p className="text-illust font-notosansjp text-pc-[24]">
              天気情報を取得中...
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
