import { create } from "zustand";
import axios from "axios";

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: Array<{ main: string }>;
}

interface WeatherStore {
  weather: WeatherData | null;
  city: string;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  selectedCity: string;
  setCity: (city: string) => void;
  setSelectedCity: (cityId: string) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  city: "tokyo",
  loading: true,
  error: null,
  fetchWeather: async (city) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<WeatherData>(
        `/api/weather?city=${city}`,
      );
      set({ weather: response.data, loading: false, city });
    } catch (error) {
      set({ error: "Failed to fetch weather data", loading: false });
      console.log("Failed to fetch weather data", error);
    }
  },
  selectedCity: "tokyo",
  setCity: (city) => set({ city }),
  setSelectedCity: (cityId) => {
    set({ selectedCity: cityId });
    set((state) => {
      state.fetchWeather(cityId);
      return {};
    });
  },
}));

export const useWeatherCondition = () =>
  useWeatherStore((state) => state.weather?.weather[0]?.main || "Unknown");

export const useTemperature = () =>
  useWeatherStore((state) => state.weather?.main.temp.toFixed(0) || "N/A");
