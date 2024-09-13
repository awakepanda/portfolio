// import Image from "next/image";
import React from "react";
// import { ThemeToggle } from "../components/ThemeToggle";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

type TwoColumnsProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
};

export default function TwoColumns({
  leftContent,
  rightContent,
}: TwoColumnsProps) {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden lg:flex-row">
      <div className="relative w-full h-1/2 bg-muted lg:h-full lg:w-1/2">
        <Logo />
        {leftContent}
      </div>
      <div className="w-full h-1/2 lg:h-full lg:w-1/2">
        <div className="w-full flex justify-between py-pc-[38] border-b-light border-b">
          <Navigation />
          <ThemeToggle />
        </div>
        {rightContent}
      </div>
    </div>
  );
}
