"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex justify-end pt-[calc(24/1728*100%)] pr-[calc(22/1728*100%)]">
      <label className="inline-flex items-center cursor-pointer">
        <input
          className="sr-only peer"
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <div className="relative w-[66px] h-[36px] bg-white rounded-full border border-border peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[3px] after:start-[3px] after:bg-accent after:rounded-full after:h-[28px] after:w-[28px] after:transition-all"></div>
      </label>
    </div>
  );
}
