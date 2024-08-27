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
    <div className="flex h-screen">
      <div className="relative min-h-screen lg:w-1/2 h-[50vh] lg:h-screen bg-muted">
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
      <div className="w-full h-1/2 md:w-1/2 md:h-screen md:pb-[calc(68/960*100%)] md:pt-[calc(24/960*100%)]">
        <ThemeToggle />
        <Navigation />
        {rightContent}
      </div>
    </div>
  );
}
