"use client";
import { useProjectsStore } from "@/store/projectsStore";
import { TbChefHat } from "react-icons/tb";
import { FiLayout } from "react-icons/fi";

export default function ProjectsButtonContent() {
  const { activeApp, setActiveApp } = useProjectsStore();

  const handleAppToggle = (
    app: "weather" | "chatbot" | "calculator" | "recipe" | "template",
  ) => {
    if (activeApp !== app) {
      setActiveApp(app);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden hide-scrollbar">
      <div className="mb-pc-[56]">
        <h2 className="flex flex-col pb-pc-[32] text-primary">
          <span className="font-notosansjp leading-none text-pc-[12] mb-pc-[8]">
            ミニアプリ
          </span>
          <em className="font-inter leading-none text-pc-[32]">MINI-APPS</em>
        </h2>
        <div className="flex justify-between gap-pc-[16]">
          <button
            onClick={() => handleAppToggle("weather")}
            disabled={activeApp === "weather"}
            className={`flex justify-center items-center rounded-full text-white w-full py-pc-[20] text-pc-[12] ${
              activeApp === "weather"
                ? "bg-accent cursor-not-allowed"
                : "bg-primary hover:bg-accent transition-all"
            }`}
          >
            Weather App
          </button>
          <button
            onClick={() => handleAppToggle("chatbot")}
            disabled={activeApp === "chatbot"}
            className={`flex justify-center items-center rounded-full text-white w-full py-pc-[20] text-pc-[12] ${
              activeApp === "chatbot"
                ? "bg-accent cursor-not-allowed"
                : "bg-primary hover:bg-accent transition-all"
            }`}
          >
            Chatbot
          </button>
          <button
            onClick={() => handleAppToggle("calculator")}
            disabled={activeApp === "calculator"}
            className={`flex justify-center items-center rounded-full text-white w-full py-pc-[20] text-pc-[12] ${
              activeApp === "calculator"
                ? "bg-accent cursor-not-allowed"
                : "bg-primary hover:bg-accent transition-all"
            }`}
          >
            Calculator
          </button>
        </div>
      </div>
      <div>
        <h2 className="flex flex-col pb-pc-[32] text-primary">
          <span className="font-notosansjp leading-none text-pc-[12] mb-pc-[8]">
            進行中のプロダクト
          </span>
          <em className="font-inter leading-none text-pc-[32]">
            PRODUCT IN PROGRESS
          </em>
        </h2>
        <div className="flex justify-between gap-pc-[24]">
          <div className="w-full bg-muted flex flex-col items-center py-pc-[32] rounded-pc-[16]">
            <h3 className="text-foreground flex flex-col text-center">
              <span className="font-notosansjp text-pc-[12] mb-pc-[8]">
                ReactNativeで作るレシピアプリ
              </span>
              <em className="text-pc-[16] leading-pc-[20] mb-pc-[16]">
                RECIPE APP CREATE
                <br />
                WITH REACTNATIVE
              </em>
            </h3>
            <div className="text-pc-[30] mb-pc-[24]">
              <TbChefHat />
            </div>
            <button
              onClick={() => handleAppToggle("recipe")}
              disabled={activeApp === "recipe"}
              className={`flex justify-center items-center rounded-full text-white w-pc-[160] py-pc-[8] text-pc-[10] ${
                activeApp === "recipe"
                  ? "bg-accent cursor-not-allowed"
                  : "bg-primary hover:bg-accent transition-all"
              }`}
            >
              SHOW DETAILS
            </button>
          </div>
          <div className="w-full bg-muted flex flex-col items-center py-pc-[32] rounded-pc-[16]">
            <h3 className="text-foreground flex flex-col text-center">
              <span className="font-notosansjp text-pc-[12] mb-pc-[8]">
                モダンな技術のウェブサイトテンプレート
              </span>
              <em className="text-pc-[16] leading-pc-[20] mb-pc-[16]">
                MODERN TECHNOLOGY
                <br />
                WEBSITE TEMPLETES
              </em>
            </h3>
            <div className="text-pc-[30] mb-pc-[24]">
              <FiLayout />
            </div>
            <button
              onClick={() => handleAppToggle("template")}
              disabled={activeApp === "template"}
              className={`flex justify-center items-center rounded-full text-white w-pc-[160] py-pc-[8] text-pc-[10] ${
                activeApp === "template"
                  ? "bg-accent cursor-not-allowed"
                  : "bg-primary hover:bg-accent transition-all"
              }`}
            >
              SHOW DETAILS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
