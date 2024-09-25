import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import Scrolltext from "../components/ScrollText";

type SplitLayoutProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
};

export default function SplitLayout({
  leftContent,
  rightContent,
}: SplitLayoutProps) {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden lg:flex-row">
      <div className="relative w-full h-sp-vh-[415] md:h-tablet-vh-[368] bg-background lg:h-full lg:w-pc-[848]">
        <Logo />
        {leftContent}
      </div>
      <div className="relative flex justify-center items-center bg-secondary overflow-hidden h-sp-vh-[22] md:h-tablet-vh-[32] md:w-full lg:w-pc-[32] lg:h-screen">
        <Scrolltext />
      </div>
      <div className="w-full bg-muted h-sp-vh-[415] md:h-tablet-vh-[368] lg:h-screen lg:w-pc-[848]">
        <div className="absolute top-0 right-0 w-full flex justify-between items-center lg:relative lg:top-auto lg:right-auto lg:h-pc-[132] lg:border-b-light lg:border-b">
          <Navigation />
          <ThemeToggle />
        </div>
        {rightContent}
      </div>
    </div>
  );
}
