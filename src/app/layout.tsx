import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Noto_Sans_JP, Inter } from "next/font/google";

const notosansjp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-font-noto-sans-jp",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Maeno Shingo Work",
  description: "Maeno Shingo's Portofolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.variable} ${notosansjp.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
