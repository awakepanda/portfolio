import {
  ClearIcon,
  CloudyIcon,
  RainyIcon,
  StormyIcon,
  SnowyIcon,
  FoggyIcon,
  WindyIcon,
  AlienIcon,
} from "@/features/projects/icons/WeatherIcons";

export const weatherIconMap = {
  CLEAR: ClearIcon,
  CLOUDS: CloudyIcon,
  RAIN: RainyIcon,
  DRIZZLE: RainyIcon,
  THUNDERSTORM: StormyIcon,
  SNOW: SnowyIcon,
  MIST: FoggyIcon,
  FOG: FoggyIcon,
  HAZE: FoggyIcon,
  SMOKE: AlienIcon,
  DUST: AlienIcon,
  SAND: AlienIcon,
  ASH: AlienIcon,
  SQUALL: WindyIcon,
  TORNADO: AlienIcon,
};

export type WeatherCondition = keyof typeof weatherIconMap;

export const getWeatherIcon = (condition: string) => {
  const upperCondition = condition.toUpperCase() as WeatherCondition;
  return weatherIconMap[upperCondition] || "";
};
