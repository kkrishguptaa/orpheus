import { getPoems } from "@/app/poems/utils";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default async function PoemList() {
  const poems = (await getPoems())
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
    .slice(0, 10);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-20 sm:px-40 md:px-60 lg:px-80 xl:px-120 py-8">
      <h2 className="w-full text-6xl text-white font-black mb-8">Poems</h2>
      <nav className="w-full space-y-4 text-xl">
        {poems.map((poem) => (
          <Link
            key={poem.slug}
            href={`/poems/${poem.slug}`}
            className="block border border-zinc-800 hover:bg-zinc-900 transition-colors rounded py-2 px-3 w-full"
          >
            {poem.title}
          </Link>
        ))}
        {poems.length > 10 && (
          <Link
            href="/poems"
            className="flex items-center flex-row justify-between border text-white border-zinc-600 hover:bg-zinc-900 transition-colors rounded py-2 px-3 w-full"
          >
            <span>All Poems</span>
            <FiArrowRight className="text-zinc-400 align-baseline" />
          </Link>
        )}
      </nav>
    </div>
  );
}
