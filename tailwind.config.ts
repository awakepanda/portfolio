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
  tablet: { width: 1024, height: 1366 },
  sp: { width: 393, height: 852 },
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
  const match = value.match(/^(-?\d*\.?\d+)(.*)$/);
  if (match) {
    const [, num, unit] = match;
    const numValue = parseFloat(num);
    return `calc((${Math.abs(numValue)}${unit} / ${baseSize}) * 100vw * ${
      numValue < 0 ? -1 : 1
    })`;
  }
  return value;
};

const vhConverter = (value: string, baseSize: number): string => {
  const match = value.match(/^(-?\d*\.?\d+)(.*)$/);
  if (match) {
    const [, num, unit] = match;
    const numValue = parseFloat(num);
    const percentage = (Math.abs(numValue) / baseSize) * 100;
    return `${percentage.toFixed(2)}vh`;
  }
  return value;
};

const dynamicTextConverter = (value: string, baseSize: number): string => {
  const match = value.match(/^(\d+(\.\d+)?)(px|rem|em)?$/);
  if (match) {
    const [, num, , unit = ""] = match;
    return `calc((100vw * ${num}) / ${baseSize})${unit}`;
  }
  return value;
};

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    screens: {
      md: "590px",
      lg: "1025px",
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
        foreground: "hsl(var(--foreground))",
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
          muted: "hsl(var(--muted))",
          accent: "hsl(var(--accent))",
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
              [`${prop}-${device}`]: (value: string): CSSRuleObject | null => {
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
            {
              values: theme("spacing"),
              supportsNegativeValues: true,
            },
          );
        });
      };

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
          },
          { values: theme("spacing") },
        );

        matchUtilities(
          {
            [`h-${device}-vh`]: (value) => ({
              height: vhConverter(value, height),
            }),
          },
          { values: theme("spacing") },
        );
      });

      Object.entries(deviceSizes).forEach(([device, { width }]) => {
        matchUtilities(
          {
            [`text-${device}`]: (value) => {
              const result = {
                fontSize: dynamicTextConverter(value, width),
              };
              return result;
            },
          },
          { values: theme("fontSize") },
        );
      });
    }),

    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".custom-scrollbar": {
          "&::-webkit-scrollbar": {
            width: "clamp(4px, 0.5vw, 8px)",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "hsl(var(--accent))",
            borderRadius: "clamp(2px, 0.25vw, 4px)",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "hsl(var(--accent) / 0.8)",
          },
          "scrollbar-width": "thin",
          "scrollbar-color": "hsl(var(--accent)) transparent",
        },
      };
      addUtilities(newUtilities);
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
} satisfies Config;

export default config;
