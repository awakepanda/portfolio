// import Image from "next/image";
import React from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";

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
      <div className="w-full h-1/2 bg-muted lg:h-full lg:w-1/2">
        <Logo />
        {/* <Image */}
        {/*   src="/logo.svg" */}
        {/*   alt="Logo" */}
        {/*   className="absolute top-[68px] left-[53px] w-1/2" */}
        {/*   width={356} */}
        {/*   height={44} */}
        {/*   priority */}
        {/* /> */}
        {leftContent}
      </div>
      <div className="w-full h-1/2 lg:h-full lg:w-1/2">
        {/* <div className="w-full h-1/2 lg:w-1/2 lg:h-screen lg:pb-[calc(68/960*100%)] lg:pt-[calc(24/960*100%)]"> */}
        <ThemeToggle />
        <Navigation />
        {rightContent}
      </div>
    </div>
  );
}
