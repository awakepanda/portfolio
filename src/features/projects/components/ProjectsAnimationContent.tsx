"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  useWeatherStore,
  useWeatherCondition,
  useTemperature,
} from "@/store/weatherStore";
import ProjectsWeatherFrame from "./ProjectsWeatherFrame";

interface WeatherData {
  condition: string;
  temp: string;
  cityId: string;
}

export default function ProjectsAnimationContent() {
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

  return (
    <div
      className="w-full h-full flex justify-center pt-pc-[130] pb-pc-[80]"
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
          <ProjectsWeatherFrame
            displayedWeather={displayedWeather}
            controls={controls}
            handleAnimationUpdate={handleAnimationUpdate}
            handleAnimationComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
