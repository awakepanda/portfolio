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
      <div className="mb-sp-[24] md:mb-tablet-[56] lg:mb-pc-[56]">
        <h2 className="flex flex-col text-primary pb-sp-[16] md:pb-tablet-[32] lg:pb-pc-[32]">
          <span className="font-notosansjp leading-none text-sp-[10] mb-sp-[4] md:text-tablet-[14] md:mb-tablet-[8] lg:text-pc-[12] lg:mb-pc-[8]">
            ミニアプリ
          </span>
          <em className="font-inter leading-none text-sp-[18] md:text-tablet-[28] lg:text-pc-[32]">
            MINI-APPS
          </em>
        </h2>
        <div className="flex items-center gap-sp-[8] md:flex-row md:justify-between md:gap-tablet-[16] lg:gap-pc-[16]">
          <button
            onClick={() => handleAppToggle("weather")}
            disabled={activeApp === "weather"}
            className={`flex justify-center items-center rounded-full text-white w-full text-sp-[12] h-sp-[60] md:h-auto md:py-tablet-[20] md:text-tablet-[14] lg:py-pc-[20] lg:text-pc-[12] ${
              activeApp === "weather"
                ? "bg-accent cursor-not-allowed"
                : "bg-primary hover:bg-accent transition-all"
            }`}
          >
            Weather <br className="block md:hidden" />
            App
          </button>
          <button
            onClick={() => handleAppToggle("chatbot")}
            disabled={activeApp === "chatbot"}
            className={`flex justify-center items-center rounded-full text-white w-full text-sp-[12] h-sp-[60] md:h-auto md:py-tablet-[20] md:text-tablet-[14] lg:py-pc-[20] lg:text-pc-[12] ${
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
            className={`flex justify-center items-center rounded-full text-white w-full text-sp-[12] h-sp-[60] md:h-auto md:py-tablet-[20] md:text-tablet-[14] lg:py-pc-[20] lg:text-pc-[12] ${
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
        <h2 className="flex flex-col text-primary pb-sp-[16] md:pb-tablet-[32] lg:pb-pc-[32]">
          <span className="font-notosansjp leading-none text-sp-[10] mb-sp-[4] md:text-tablet-[14] md:mb-tablet-[8] lg:text-pc-[12] lg:mb-pc-[8]">
            進行中のプロダクト
          </span>
          <em className="font-inter leading-none text-sp-[18] md:text-tablet-[28] lg:text-pc-[32]">
            PRODUCT IN PROGRESS
          </em>
        </h2>
        <div className="flex flex-col gap-sp-[12] md:flex-row md:gap-tablet-[24] lg:gap-pc-[24]">
          <div className="w-full bg-muted flex flex-col items-center mb-sp-[24] py-sp-[24] rounded-sp-[16] md:mb-tablet-[16] md:py-tablet-[32] md:rounded-tablet-[16] lg:mb-pc-[16] lg:py-pc-[32] lg:rounded-pc-[16]">
            <h3 className="text-foreground flex flex-col text-center">
              <span className="font-notosansjp text-sp-[14] mb-sp-[8] md:text-tablet-[14] md:mb-tablet-[8] lg:text-pc-[12] lg:mb-pc-[8]">
                ReactNativeで作るレシピアプリ
              </span>
              <em className="text-sp-[18] leading-sp-[22] md:text-tablet-[18] md:leading-tablet-[20] lg:text-pc-[18] lg:leading-pc-[22]">
                RECIPE APP CREATE
                <br />
                WITH REACTNATIVE
              </em>
            </h3>
            <div className="text-sp-[30] mb-sp-[24] md:text-tablet-[30] md:mb-tablet-[24] lg:text-pc-[30] lg:mb-pc-[24]">
              <TbChefHat />
            </div>
            <button
              onClick={() => handleAppToggle("recipe")}
              disabled={activeApp === "recipe"}
              className={`flex justify-center items-center rounded-full text-white w-sp-[160] py-sp-[8] text-sp-[12] md:w-tablet-[200] md:py-tablet-[14] md:text-tablet-[14] lg:w-pc-[160] lg:py-pc-[8] lg:text-pc-[10] ${
                activeApp === "recipe"
                  ? "bg-accent cursor-not-allowed"
                  : "bg-primary hover:bg-accent transition-all"
              }`}
            >
              SHOW DETAILS
            </button>
          </div>
          <div className="w-full bg-muted flex flex-col items-center py-sp-[24] rounded-sp-[16] md:py-tablet-[32] md:rounded-tablet-[16] lg:py-pc-[32] lg:rounded-pc-[16]">
            <h3 className="text-foreground flex flex-col text-center">
              <span className="font-notosansjp text-sp-[14] mb-sp-[8] md:text-tablet-[14] md:mb-tablet-[8] lg:text-pc-[12] lg:mb-pc-[8]">
                モダンな技術のウェブサイトテンプレート
              </span>
              <em className="text-sp-[18] leading-sp-[22] md:text-tablet-[18] md:leading-tablet-[20] lg:text-pc-[18] lg:leading-pc-[22]">
                MODERN TECHNOLOGY
                <br />
                WEBSITE TEMPLETES
              </em>
            </h3>
            <div className="text-sp-[30] mb-sp-[24] md:text-tablet-[30] md:mb-tablet-[24] lg:text-pc-[30] lg:mb-pc-[24]">
              <FiLayout />
            </div>
            <button
              onClick={() => handleAppToggle("template")}
              disabled={activeApp === "template"}
              className={`flex justify-center items-center rounded-full text-white w-sp-[160] py-sp-[8] text-sp-[12] md:w-tablet-[200] md:py-tablet-[14] md:text-tablet-[14] lg:w-pc-[160] lg:py-pc-[8] lg:text-pc-[10] ${
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
