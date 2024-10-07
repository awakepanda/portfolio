import { create } from "zustand";
import axios from "axios";

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: Array<{ main: string }>;
}

type AppType = "weather" | "chatbot" | null;

interface ProjectsStore {
  weather: WeatherData | null;
  city: string;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  selectedCity: string;
  setCity: (city: string) => void;
  setSelectedCity: (cityId: string) => void;
  activeApp: AppType;
  setActiveApp: (app: AppType) => void;
  resetAppState: () => void;
}

const initialState = {
  weather: null,
  city: "tokyo",
  loading: false,
  error: null,
  selectedCity: "tokyo",
  activeApp: null,
};

export const useProjectsStore = create<ProjectsStore>((set) => ({
  ...initialState,
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
  setCity: (city) => set({ city }),
  setSelectedCity: (cityId) => {
    set({ selectedCity: cityId });
    set((state) => {
      state.fetchWeather(cityId);
      return {};
    });
  },
  setActiveApp: (app) => set({ activeApp: app }),
  resetAppState: () => set(initialState),
}));

export const useWeatherCondition = () =>
  useProjectsStore((state) => state.weather?.weather[0]?.main || "Unknown");

export const useTemperature = () =>
  useProjectsStore((state) => state.weather?.main.temp.toFixed(0) || "N/A");
