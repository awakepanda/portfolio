import { inter } from "./styles/fonts";

export default function Home() {
  return (
    <main className="relative flex w-full h-screen text-base">
      <div className="w-1/2 h-screen py-[50px] px-[50px]">
        <h1 className={`${inter.className} text-3xl font-medium`}>
          SHINGO MAENO WORKS
        </h1>
      </div>
      <div className="w-1/2 h-screen bg-primary">テスト</div>
    </main>
  );
}
