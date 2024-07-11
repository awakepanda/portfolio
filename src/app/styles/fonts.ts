import { Noto_Sans_JP, Inter } from "next/font/google";

export const notosansjp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
