import Test from "@/features/framer/components/test";

export default function Framer() {
  return (
    <main className="relative flex w-full h-screen">
      <div className="w-1/2 h-screen bg-white flex flex-row items-center">
        <Test />
      </div>
      <div className="w-1/2 h-screen"></div>
    </main>
  );
}
