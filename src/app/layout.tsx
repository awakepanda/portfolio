import type { Metadata } from "next";
import "./globals.css";
import { notosansjp } from "./styles/fonts";
import { ThemeProvider } from "next-themes";

// export const metadata: Metadata = {
//   title: "Maeno Shingo Work",
//   description: "Maeno Shingo's Portofolio",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={notosansjp.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
