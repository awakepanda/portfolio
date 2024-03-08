import GlobaleMenu from "@/app/components/GlobalMenu";
import Hero from "@/app/components/Hero";
import Content01 from "./components/Contents01";
import Content02 from "./components/Contents02";

export default function Home() {
  return (
    <main className="relative">
      <GlobaleMenu />
      <Hero />
      <Content01 />
      <Content02 />
    </main>
  );
}
