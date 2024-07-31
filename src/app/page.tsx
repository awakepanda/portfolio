"use client";

import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { inter } from "./styles/fonts";
import { useEffect, useState } from "react";

export default function Home() {
  const data = {
    title: "static title",
    body: "this is a static body text",
  };

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch("http://localhost:3000/api/hello");
      const data = await response.json();
      setMessage(data.message);
    };
    fetchMessage();
  }, []);

  console.log(message);

  return (
    <main className="relative flex w-full h-screen text-base">
      <div className="absolute left-0 top-0">
        <p>{message}</p>
        <p>{data.title}</p>
        <p>{data.body}</p>
      </div>
      <div className="w-1/2 bg-muted">
        <h1 className={`${inter.className} text-3xl font-medium`}>
          SHINGO MAENO WORKS
        </h1>
        <svg width="0" height="0">
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="3" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="-2 3" />
            </feComponentTransfer>
          </filter>
        </svg>
        <div className="display">
          <div className="goo">
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen">
        <ThemeSwitcher />
        <p>
          こんにちは！
          <br />
          <strong className="text-accent-foreground">前野慎吾</strong>です。
          <br />
          React.jsを中心としたクリエイティブなフロントエンド開発者です。
          <br />
          15年以上Web技術に携わっています。
          <br />
          現在はReact
          NativeでフルスタックのWebアプリケーションテンプレートとお弁当管理アプリを開発中！
        </p>
      </div>
    </main>
  );
}
