import type { Metadata } from "next";
import "../styles/globals.css";
import { notosansjp } from "./styles/fonts";

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
    <html lang="ja">
      <body className={notosansjp.className}>{children}</body>
    </html>
  );
}
