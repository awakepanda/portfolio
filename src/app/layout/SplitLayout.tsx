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
      <div className="relative w-full md:h-tablet-vh-[368] bg-background lg:h-full lg:w-pc-[848]">
        <Logo />
        {leftContent}
      </div>
      <div className="relative md:h-tablet-vh-[32] md:w-full lg:w-pc-[32] lg:h-screen bg-secondary overflow-hidden">
        <Scrolltext />
      </div>
      <div className="w-full bg-muted md:h-tablet-vh-[368] lg:h-screen lg:w-pc-[848]">
        <div className="w-full flex justify-between py-pc-[38] border-b-light border-b">
          <Navigation />
          <ThemeToggle />
        </div>
        {rightContent}
      </div>
    </div>
  );
}
