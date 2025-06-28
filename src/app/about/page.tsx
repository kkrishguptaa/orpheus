import Author from "@/components/Author";
import LatinVelocity from "@/components/LatinVelocity";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Author />
      <LatinVelocity />
      <div className="flex flex-col items-center justify-center min-h-[40vh] w-screen">
        <Link href="/ai">
          <button className="bg-zinc-800 text-zinc-300 text-2xl px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors">
            talk to orpheus
          </button>
        </Link>
      </div>
    </>
  );
}
