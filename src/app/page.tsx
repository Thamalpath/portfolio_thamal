import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#010206] text-zinc-100 selection:bg-cyan-500 selection:text-black">
      <Hero />
      <Journey />
    </main>
  );
}
