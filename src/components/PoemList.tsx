import { getPoems } from "@/app/poems/utils";
import getRelativeTime from "@/util/date";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import CircularText from "./ui/circle-text";

export default async function PoemList() {
  const poems = (await getPoems()).sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );

  return (
    <div className="snap-center relative w-screen pb-36 sm:pb-12 md:pb-0">
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-12 sm:p-40 md:px-60 lg:px-80 xl:px-120">
        <h2 className="w-full text-6xl text-white font-black mb-8">Poems</h2>
        <nav className="w-full space-y-4 text-xl">
          {poems.slice(0, 7).map((poem) => (
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
          {poems.length > 10 ? (
            <Link
              href="/poems"
              className="flex items-center flex-row justify-between border text-white border-zinc-600 hover:bg-zinc-900 transition-colors rounded py-2 px-3 w-full"
            >
              <span>All Poems</span>
              <FiArrowRight className="text-zinc-400 align-baseline" />
            </Link>
          ) : null}
        </nav>
      </div>

      <div className="absolute bottom-0 sm:bottom-0 md:bottom-20 left-0 sm:left-10 lg:left-30 xl:left-50">
        <CircularText
          text="KRISH GUPTA •"
          onHover="speedUp"
          className="h-32 w-32"
        />
      </div>
    </div>
  );
}
