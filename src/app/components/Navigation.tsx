"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteStructure } from "../constants/siteStructure";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <ul className="w-full flex justify-center gap-10">
        {siteStructure.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li key={item.id}>
              <Link
                className={`${
                  isActive ? "text-foreground" : "text-light"
                } block hover:text-foreground transition ease-in-out [&>div>span]:hover:bg-foreground [&>div>span>span]:hover:absolute [&>div>span>span]:hover:translate-x-6 [&>div>span:before]:hover:-translate-x-0`}
                href={item.path}
              >
                <div className="flex items-center mb-pc-[2]">
                  <span
                    className={`${
                      isActive ? "bg-foreground" : "bg-light"
                    } relative overflow-hidden text-background flex justify-center items-center mr-pc-[6] w-pc-[25] h-pc-[25] rounded-full text-[calc((100vw*10)/1728)] transition ease-in-out before:content-['→'] before:absolute before:-translate-x-6 before:transition before:duration-300 brefore:ease-in-out`}
                  >
                    <span className="transition duration-300 ease-in-out">
                      {item.id}
                    </span>
                  </span>
                  <em className="text-[calc((100vw*12)/1728)] font-notosansjp">
                    {item.nameJP}
                  </em>
                </div>
                <strong className="pl-pc-[3] font-normal text-[calc((100vw*20)/1728)]">
                  {item.name}
                </strong>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
