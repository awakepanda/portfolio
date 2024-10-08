"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectsStore } from "@/store/projectsStore";
import WeatherApp from "./apps/weather/WeatherApp";
import ProjectsDefaultCard from "./ProjectsDefaultCard";
import ChatbotApp from "./apps/chatbot/ChatbotApp";
import CalculatorApp from "./apps/calculator/CalculatorApp";

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
        return <ChatbotApp />;
      case "calculator":
        return <CalculatorApp />;
      default:
        return <ProjectsDefaultCard />;
    }
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full h-full"
          key={activeApp || "default"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveApp()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
