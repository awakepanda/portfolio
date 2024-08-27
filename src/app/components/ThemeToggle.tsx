"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex justify-end pr-[22px]">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </div>
  );
}
