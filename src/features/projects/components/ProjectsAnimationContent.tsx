"use client";
import { useEffect } from "react";
import { useProjectsStore } from "@/store/projectsStore";
import WeatherApp from "./apps/weather/WeatherApp";

export default function ProjectsAnimationContent() {
  const { activeApp, resetAppState } = useProjectsStore();

  useEffect(() => {
    // ページがマウントされるたびにアプリの状態をリセット
    resetAppState();
  }, [resetAppState]);

  const renderActiveApp = () => {
    switch (activeApp) {
      case "weather":
        return <WeatherApp />;
      case "chatbot":
        return <p className="text-2xl font-bold">Coming soon</p>;
      default:
        return <p className="text-2xl font-bold">テスト</p>;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="w-full h-full flex justify-center items-center pt-pc-[130] pb-pc-[80]"
        style={{ perspective: "1000px" }}
      >
        {renderActiveApp()}
      </div>
    </div>
  );
}
