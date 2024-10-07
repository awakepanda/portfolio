"use client";
import { useEffect } from "react";
import { useProjectsStore } from "@/store/projectsStore";
import WeatherApp from "./apps/weather/WeatherApp";
import ProjectsDefaultCard from "./ProjectsDefaultCard";

export default function ProjectsAnimationContent() {
  const { activeApp, resetAppState } = useProjectsStore();

  useEffect(() => {
    resetAppState();
  }, [resetAppState]);

  const renderActiveApp = () => {
    switch (activeApp) {
      case "weather":
        return <WeatherApp />;
      case "chatbot":
        return <p className="text-2xl font-bold">Coming soon</p>;
      default:
        return <ProjectsDefaultCard />;
    }
  };

  return <div className="relative w-full h-full">{renderActiveApp()}</div>;
}
