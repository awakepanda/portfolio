"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
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
  const { selectedCity, error, fetchWeather } = useWeatherStore();
  const weatherCondition = useWeatherCondition();
  const temperature = useTemperature();
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null,
  );
  const [nextWeather, setNextWeather] = useState<WeatherData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCityRef = useRef(selectedCity);
  const controls = useAnimation();

  const updateWeather = useCallback(() => {
    if (weatherCondition !== "Unknown" && temperature !== "N/A") {
      const newWeather = {
        condition: weatherCondition,
        temp: temperature,
        cityId: selectedCity.toUpperCase(),
      };
      if (isAnimating) {
        setNextWeather(newWeather);
      } else {
        setCurrentWeather(newWeather);
      }
    }
  }, [weatherCondition, temperature, selectedCity, isAnimating]);

  const fetchData = useCallback(async () => {
    try {
      await fetchWeather(selectedCity);
      updateWeather();
    } catch (error) {}
  }, [fetchWeather, selectedCity, updateWeather]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (selectedCity !== prevCityRef.current) {
      setIsAnimating(true);
      controls.start({ rotateY: 360 });
      prevCityRef.current = selectedCity;
    }
  }, [selectedCity, controls]);

  const handleAnimationUpdate = useCallback(
    (latest: { rotateY: number }) => {
      if (latest.rotateY >= 90 && latest.rotateY <= 270 && nextWeather) {
        setCurrentWeather(nextWeather);
      }
    },
    [nextWeather],
  );

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
    controls.set({ rotateY: 0 });
    if (nextWeather) {
      setCurrentWeather(nextWeather);
      setNextWeather(null);
    }
  }, [controls, nextWeather]);

  const memoizedWeatherFrame = useMemo(
    () => (
      <ProjectsWeatherFrame
        currentWeather={currentWeather}
        nextWeather={nextWeather}
        controls={controls}
        handleAnimationComplete={handleAnimationComplete}
        handleAnimationUpdate={handleAnimationUpdate}
      />
    ),
    [
      currentWeather,
      nextWeather,
      controls,
      handleAnimationComplete,
      handleAnimationUpdate,
    ],
  );

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
          memoizedWeatherFrame
        )}
      </AnimatePresence>
    </div>
  );
}
