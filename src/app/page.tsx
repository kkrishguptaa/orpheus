import Author from "@/components/Author";
import Hero from "@/components/Hero";
import PoemList from "@/components/PoemList";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory">
      <Hero />
      <PoemList />
      <Author />
    </main>
  );
}
