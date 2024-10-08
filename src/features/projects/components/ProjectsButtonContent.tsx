"use client";
import { useProjectsStore } from "@/store/projectsStore";

export default function ProjectsButtonContent() {
  const { activeApp, setActiveApp } = useProjectsStore();

  const handleAppToggle = (app: "weather" | "chatbot" | "calculator") => {
    if (activeApp !== app) {
      setActiveApp(app);
    }
  };

  return (
    <>
      <button
        onClick={() => handleAppToggle("weather")}
        disabled={activeApp === "weather"}
        className={`px-4 py-2 rounded transition-colors ${
          activeApp === "weather"
            ? "bg-blue-600 text-white cursor-not-allowed"
            : "bg-blue-200 text-blue-800 hover:bg-blue-300"
        }`}
      >
        Weather App
      </button>
      <button
        onClick={() => handleAppToggle("chatbot")}
        disabled={activeApp === "chatbot"}
        className={`px-4 py-2 rounded transition-colors ${
          activeApp === "chatbot"
            ? "bg-green-600 text-white cursor-not-allowed"
            : "bg-green-200 text-green-800 hover:bg-green-300"
        }`}
      >
        Chatbot
      </button>
      <button
        onClick={() => handleAppToggle("calculator")}
        disabled={activeApp === "calculator"}
        className={`px-4 py-2 rounded transition-colors ${
          activeApp === "calculator"
            ? "bg-green-600 text-white cursor-not-allowed"
            : "bg-green-200 text-green-800 hover:bg-green-300"
        }`}
      >
        Calculator
      </button>
    </>
  );
}
