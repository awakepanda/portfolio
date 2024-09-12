import type { Config } from "tailwindcss";
import type { CSSRuleObject } from "tailwindcss/types/config";
import plugin from "tailwindcss/plugin";

const deviceSizes = {
  pc: 1728,
  tablet: 744,
  sp: 390,
} as const;

type PropKey =
  | "w"
  | "h"
  | "m"
  | "p"
  | "t"
  | "r"
  | "b"
  | "l"
  | "py"
  | "px"
  | "my"
  | "mx";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        notosansjp: ["var(--font-noto-sans-jp)"],
        inter: ["var(--font-inter)"],
      },
      stroke: {
        illust: {
          DEFAULT: "hsl(var(--illust) / <alpha-value>)",
          foreground: "hsl(var(--illust-foreground) / <alpha-value>)",
        },
      },
      fill: {
        illust: {
          DEFAULT: "hsl(var(--illust) / <alpha-value>)",
          foreground: "hsl(var(--illust-foreground) / <alpha-value>)",
        },
        light: "hsl(var(--light))",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        light: "hsl(var(--light))",
        accent: "hsl(158 81% 43%)",
        illust: {
          DEFAULT: "hsl(var(--illust) / <alpha-value>)",
          foreground: "hsl(var(--illust-foreground) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      const vwConverter = (value: string, baseSize: number): string => {
        return `calc((${value} / ${baseSize}) * 100vw)`;
      };

      // 動的ユーティリティの生成
      Object.entries(deviceSizes).forEach(([device, baseSize]) => {
        (
          [
            "w",
            "h",
            "m",
            "p",
            "t",
            "r",
            "b",
            "l",
            "py",
            "px",
            "my",
            "mx",
          ] as PropKey[]
        ).forEach((prop) => {
          matchUtilities(
            {
              [`${prop}-${device}`]: (
                value: string,
                { modifier }: { modifier: string | null },
              ): CSSRuleObject | null => {
                if (modifier) {
                  return null;
                }
                const convertedValue = vwConverter(value, baseSize);
                switch (prop) {
                  case "w":
                    return { width: convertedValue };
                  case "h":
                    return { height: convertedValue };
                  case "m":
                    return { margin: convertedValue };
                  case "p":
                    return { padding: convertedValue };
                  case "t":
                    return { top: convertedValue };
                  case "r":
                    return { right: convertedValue };
                  case "b":
                    return { bottom: convertedValue };
                  case "l":
                    return { left: convertedValue };
                  case "py":
                    return {
                      paddingTop: convertedValue,
                      paddingBottom: convertedValue,
                    };
                  case "px":
                    return {
                      paddingLeft: convertedValue,
                      paddingRight: convertedValue,
                    };
                  case "my":
                    return {
                      marginTop: convertedValue,
                      marginBottom: convertedValue,
                    };
                  case "mx":
                    return {
                      marginLeft: convertedValue,
                      marginRight: convertedValue,
                    };
                  default:
                    return null;
                }
              },
            },
            { values: theme("spacing") },
          );
        });
      });
    }),
  ],
  safelist: [
    { pattern: /^(w|h|m|p|t|r|b|l|py|px|my|mx)-(pc|tablet|sp)-\[.+\]$/ },
    "fill-illust",
    "fill-illust-foreground",
  ],
} satisfies Config;

export default config;
