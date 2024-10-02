"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteStructure } from "../constants/siteStructure";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`absolute top-0 bg-muted w-auto h-sp-vh-[415] transition-all ease-in-out duration-500 pt-sp-[76] md:h-tablet-vh-[664] px-sp-[18] md:pt-tablet-[100] md:px-tablet-[60] lg:bg-transparent lg:pt-pc-[0] lg:px-pc-[0] lg:w-full lg:h-auto lg:relative ${
          isOpen
            ? "right-0 lg:right-auto"
            : "-r-sp-[400] md:-r-tablet-[400] lg:right-auto"
        }`}
      >
        <ul className="flex flex-col gap-sp-[24] md:gap-tablet-[24] lg:flex-row lg:justify-center lg:gap-pc-[48]">
          {siteStructure.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.id}>
                <Link
                  className={`${
                    isActive ? "text-foreground" : "text-light"
                  } block transition ease-in-out lg:hover:text-foreground lg:[&>div>span]:hover:bg-foreground lg:[&>div>span>span]:hover:absolute lg:[&>div>span>span]:hover:translate-x-6 lg:[&>div>span:before]:hover:-translate-x-0`}
                  href={item.path}
                >
                  <div className="flex items-center">
                    <span
                      className={`${
                        isActive ? "bg-foreground" : "bg-light"
                      } relative overflow-hidden text-background flex justify-center items-center rounded-full transition ease-in-out mr-sp-[6] w-sp-[16] h-sp-[16] text-sp-[6] md:mr-tablet-[6] md:w-tablet-[25] md:h-tablet-[25] md:text-tablet-[10] lg:mr-pc-[6] lg:w-pc-[25] lg:h-pc-[25] lg:text-pc-[10] lg:before:content-['→'] lg:before:absolute lg:before:-translate-x-6 lg:before:transition lg:before:duration-300 lg:brefore:ease-in-out`}
                    >
                      <span className="transition duration-300 ease-in-out">
                        {item.id}
                      </span>
                    </span>
                    <em className="text-sp-[8] md:text-tablet-[12] lg:text-pc-[12] font-notosansjp">
                      {item.nameJP}
                    </em>
                  </div>
                  <strong className="font-normal pl-sp-[3] text-sp-[12] md:pl-tablet-[3] md:text-tablet-[20] lg:pl-pc-[3] lg:text-pc-[20]">
                    {item.name}
                  </strong>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute t-sp-[13] r-sp-[14] md:t-tablet-[18] md:r-tablet-[18] lg:hidden">
        <button
          onClick={handleClick}
          className={`
relative block px-sp-[20] py-sp-[17] before:content-[''] before:w-sp-[26] before:h-sp-[3] before:absolute before:transition before:ease-in-out before:bg-foreground before:rounded-md before:l-sp-[7] after:content-[''] after:w-sp-[26] after:h-sp-[3] after:absolute after:transition after:ease-in-out after:bg-foreground after:rounded-md after:l-sp-[7] md:px-tablet-[20] md:py-tablet-[20] md:before:w-tablet-[28] md:before:h-tablet-[3] md:before:l-tablet-[6] md:after:w-tablet-[28] md:after:h-tablet-[3] md:after:l-tablet-[6] lg:hidden lg:before:content-none lg:after:content-none
 ${
   isOpen
     ? "before:rotate-[17deg] before:t-sp-[17] after:-rotate-[17deg] arter:t-sp-[18] md:before:t-tablet-[18] md:after:t-tablet-[18]"
     : "before:t-sp-[12] after:t-sp-[20] md:before:t-tablet-[14] md:after:t-tablet-[24]"
 }`}
        ></button>
      </div>
    </>
  );
}
