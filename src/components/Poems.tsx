import { getPoems } from "@/app/poems/utils";
import getRelativeTime from "@/util/date";
import Link from "next/link";

export default async function Poems() {
  const poems = (await getPoems()).sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );

  return (
    <div className="snap-center relative w-screen pb-36 sm:pb-12 md:pb-0">
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-12 sm:px-40 md:px-60 lg:px-80 xl:px-120">
        <h2 className="w-full text-6xl text-white font-black mb-8">Poems</h2>
        <nav className="w-full space-y-4 text-xl">
          {poems.map((poem) => (
            <Link
              key={poem.slug}
              href={`/poems/${poem.slug}`}
              className="flex items-center flex-row justify-between border border-zinc-800 hover:bg-zinc-900 transition-colors rounded py-2 px-3 w-full"
            >
              <span className="text-zinc-50">{poem.title}</span>
              <span className="text-zinc-400">
                {getRelativeTime(poem.frontmatter.date)}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
