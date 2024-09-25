import type { Config } from "tailwindcss";
import type { CSSRuleObject } from "tailwindcss/types/config";
import plugin from "tailwindcss/plugin";

type DeviceType = "pc" | "tablet" | "sp";

interface SizeInfo {
  width: number;
  height: number;
}

type DeviceSizes = {
  [key in DeviceType]: SizeInfo;
};

const deviceSizes: DeviceSizes = {
  pc: { width: 1728, height: 1024 },
  tablet: { width: 1024, height: 768 },
  sp: { width: 390, height: 640 },
};

const scrollbarSizes: Record<DeviceType, { width: number; thumbSize: number }> =
  {
    pc: { width: 20, thumbSize: 14 },
    tablet: { width: 16, thumbSize: 12 },
    sp: { width: 12, thumbSize: 10 },
  };

type PropKey =
  | "w"
  | "h"
  | "m"
  | "p"
  | "t"
  | "r"
  | "b"
  | "l"
  | "pt"
  | "pr"
  | "pb"
  | "pl"
  | "py"
  | "px"
  | "mt"
  | "mr"
  | "mb"
  | "ml"
  | "my"
  | "mx"
  | "gap"
  | "rounded"
  | "leading";

const vwConverter = (value: string, baseSize: number): string => {
  return `calc((${value} / ${baseSize}) * 100vw)`;
};

const vhConverter = (value: string, baseSize: number): string => {
  return `calc((${value} / ${baseSize}) * 100vh)`;
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      // sm: "640px",
      // tablet: "768px",
      md: "768px",
      lg: "1025px",
      // xl: "1536px",
    },
    extend: {
      backgroundImage: {
        "custom-gradiation-top":
          "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 81.5%, rgba(255, 255, 255, 0.7) 91.5%, rgba(255, 255, 255, 0) 100%)",
        "custom-gradiation-bottom":
          "linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 81.5%, rgba(255, 255, 255, 0.7) 91.5%, rgba(255, 255, 255, 0) 100%)",
      },
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
        primary: "hsl(var(--primary))",
        foreground: "hsl(var(--foreground))",
        secondary: "hsl(var(--secondary))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        light: "hsl(var(--light))",
        accent: "hsl(var(--accent))",
        darkmode: "hsl(var(--darkmode))",
        daymode: "hsl(var(--daymode))",
        illust: {
          DEFAULT: "hsl(var(--illust) / <alpha-value>)",
          foreground: "hsl(var(--illust-foreground) / <alpha-value>)",
        },
        scrollbar: {
          light: "hsl(var(--light))",
          accent: "hsl(169 89% 45%)",
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      const generateUtilities = (
        prop: PropKey,
        converter: (value: string, baseSize: number) => string,
      ) => {
        Object.entries(deviceSizes).forEach(([device, { width, height }]) => {
          matchUtilities(
            {
              [`${prop}-${device}`]: (
                value: string,
                { modifier }: { modifier: string | null },
              ): CSSRuleObject | null => {
                if (modifier) {
                  return null;
                }
                const convertedValue = converter(
                  value,
                  prop === "h" ? height : width,
                );
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
                  case "pt":
                    return { paddingTop: convertedValue };
                  case "pr":
                    return { paddingRight: convertedValue };
                  case "pb":
                    return { paddingBottom: convertedValue };
                  case "pl":
                    return { paddingLeft: convertedValue };
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
                  case "mt":
                    return { marginTop: convertedValue };
                  case "mr":
                    return { marginRight: convertedValue };
                  case "mb":
                    return { marginBottom: convertedValue };
                  case "ml":
                    return { marginLeft: convertedValue };
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
                  case "gap":
                    return { gap: convertedValue };
                  case "rounded":
                    return { borderRadius: convertedValue };
                  case "leading":
                    return { lineHeight: convertedValue };
                  default:
                    return null;
                }
              },
            },
            { values: theme("spacing") },
          );
        });
      };

      // Generate utilities for width and other properties using vwConverter
      (
        [
          "w",
          "m",
          "p",
          "t",
          "r",
          "b",
          "l",
          "pt",
          "pr",
          "pb",
          "pl",
          "py",
          "px",
          "mt",
          "mr",
          "mb",
          "ml",
          "my",
          "mx",
          "gap",
          "rounded",
          "leading",
        ] as PropKey[]
      ).forEach((prop) => {
        generateUtilities(prop, vwConverter);
      });

      Object.entries(deviceSizes).forEach(([device, { width, height }]) => {
        matchUtilities(
          {
            [`h-${device}`]: (value) => ({
              height: vwConverter(value, width),
            }),
            [`h-${device}-vh`]: (value) => ({
              height: vhConverter(value, height),
            }),
          },
          { values: theme("spacing") },
        );
      });
    }),

    plugin(function ({ addUtilities, theme }) {
      const scrollbarUtilities = Object.entries(deviceSizes).reduce(
        (acc, [device, { width }]) => {
          const { width: scrollWidth, thumbSize } =
            scrollbarSizes[device as DeviceType];

          acc[`.scrollbar-${device}`] = {
            "&::-webkit-scrollbar": {
              width: `calc((${scrollWidth} / ${width}) * 100vw)`,
              backgroundColor: theme("colors.scrollbar.light"),
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme("colors.scrollbar.accent"),
              borderRadius: `calc((${thumbSize / 2} / ${width}) * 100vw)`,
              width: `calc((${thumbSize} / ${width}) * 100vw)`,
              height: `calc((${thumbSize} / ${width}) * 100vw)`,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme("colors.scrollbar.accent/0.8"),
            },
            "scrollbar-width": "thin",
            "scrollbar-color": `${theme("colors.scrollbar.accent")} ${theme(
              "colors.scrollbar.light",
            )}`,
          };

          return acc;
        },
        {} as Record<string, any>,
      );

      addUtilities(scrollbarUtilities);
    }),

    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".overflow-wrap-anywhere": {
          "overflow-wrap": "anywhere",
        },
        ".white-space-pre-wrap": {
          "white-space": "pre-wrap",
        },
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".text-responsive": {
          fontSize:
            "clamp(16px, calc(16px + (20 - 16) * ((100vw - 390px) / (1728 - 390))), 20px)",
        },
        ".text-responsive-s": {
          fontSize:
            "clamp(12px, calc(20px + (20 - 12) * ((100vw - 390px) / (1728 - 390))), 20px)",
        },
        ".vertical-rl": {
          writingMode: "vertical-rl",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
  safelist: [
    {
      pattern:
        /^(w|h|m|p|t|r|b|l|pt|pr|pb|pl|py|px|mt|mr|mb|ml|my|mx|gap|rounded|leading)-(pc|tablet|sp)-\[.+\]$/,
    },
    "fill-illust",
    "fill-illust-foreground",
    "text-responsive",
  ],
} satisfies Config;

export default config;
