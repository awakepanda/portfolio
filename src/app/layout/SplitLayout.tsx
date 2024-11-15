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
      <div className="relative w-full pt-sp-[40] h-[48.7svh] md:pt-tablet-[10] md:h-tablet-vh-[664] bg-background lg:h-full lg:pt-auto lg:w-pc-[848]">
        <Logo />
        {leftContent}
      </div>
      <div className="relative flex justify-center items-center bg-secondary overflow-hidden h-[2.6svh] md:h-tablet-vh-[38] md:w-full lg:w-pc-[32] lg:h-screen">
        <Scrolltext />
      </div>
      <div className="w-full bg-muted overflow-hidden h-[48.7svh] md:h-tablet-vh-[664] lg:h-screen lg:w-pc-[848]">
        <div className="absolute top-0 right-0 w-full h-sp-[200] overflow-hidden lg:flex lg:justify-between lg:items-center lg:relative lg:h-pc-[132] lg:top-auto lg:right-auto lg:border-b-light lg:border-b">
          <Navigation />
          <ThemeToggle />
        </div>
        {rightContent}
      </div>
    </div>
  );
}
