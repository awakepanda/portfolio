"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  useWeatherStore,
  useWeatherCondition,
  useTemperature,
} from "@/store/weatherStore";
import CitySelector from "./ProductsCitySelector";
import { getWeatherIcon } from "@/utils/WeatherIcons";
import { TbMapPinFilled } from "react-icons/tb";

interface WeatherData {
  condition: string;
  temp: string;
  cityId: string;
}

export default function ProductsAnimationContent() {
  const { selectedCity, loading, error, fetchWeather } = useWeatherStore();
  const weatherCondition = useWeatherCondition();
  const temperature = useTemperature();
  const [displayedWeather, setDisplayedWeather] = useState<WeatherData | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCityRef = useRef(selectedCity);
  const controls = useAnimation();

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity, fetchWeather]);

  useEffect(() => {
    if (weatherCondition !== "Unknown" && temperature !== "N/A") {
      console.log("Weather updated:", weatherCondition, temperature);
      if (!isAnimating) {
        setDisplayedWeather({
          condition: weatherCondition,
          temp: temperature,
          cityId: selectedCity.toUpperCase(),
        });
      }
    }
  }, [weatherCondition, temperature, isAnimating, selectedCity]);

  useEffect(() => {
    if (selectedCity !== prevCityRef.current) {
      setIsAnimating(true);
      controls.start({ rotateY: 360 });
      prevCityRef.current = selectedCity;
    }
  }, [selectedCity, controls]);

  const handleAnimationUpdate = (latest: { rotateY: number }) => {
    if (latest.rotateY >= 90 && latest.rotateY <= 270) {
      setDisplayedWeather({
        condition: weatherCondition,
        temp: temperature,
        cityId: selectedCity.toUpperCase(),
      });
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    controls.set({ rotateY: 0 });
  };

  const WeatherIcon = displayedWeather
    ? getWeatherIcon(displayedWeather.condition)
    : null;

  const frameContent = (
    <motion.div
      animate={controls}
      initial={{ rotateY: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onUpdate={handleAnimationUpdate}
      onAnimationComplete={handleAnimationComplete}
      style={{ transformStyle: "preserve-3d" }}
      className="border-4 border-illust rounded-pc-[32] w-pc-[660] h-pc-[904] bg-background"
    >
      <motion.div
        className="w-full h-full flex flex-col justify-end items-center pb-pc-[120]"
        style={{ backfaceVisibility: "hidden" }}
      >
        {displayedWeather && WeatherIcon ? (
          <>
            <WeatherIcon />
            <p className="text-illust font-inter font-medium leading-none mt-pc-[30] text-pc-[126]">
              {displayedWeather.temp}°C
            </p>
            <p className="flex items-center text-illust font-inter leading-none mt-pc-[40] text-pc-[36]">
              <TbMapPinFilled />
              <span>{displayedWeather.cityId}</span>/
              <span>{displayedWeather.condition.toUpperCase()}</span>
            </p>
          </>
        ) : (
          <p className="text-illust font-notosansjp text-pc-[24]">
            天気情報を取得中...
          </p>
        )}
        <CitySelector />
      </motion.div>
    </motion.div>
  );

  return (
    <div
      className="w-full h-full flex justify-center items-center"
      style={{ perspective: "1000px" }}
    >
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500"
          >
            {error}
          </motion.p>
        ) : (
          frameContent
        )}
      </AnimatePresence>
    </div>
  );
}
