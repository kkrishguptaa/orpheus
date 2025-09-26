import Link from 'next/link';
import getRelativeTime from '@/util/date';
import type { getPoems } from '@/util/notion';
import Backdrop from './Backdrop';

export default async function PoemList({
  poems,
}: {
  poems: Awaited<ReturnType<typeof getPoems>>;
}) {
  return (
    <div className="w-full">
      <Backdrop poemsCount={poems.length} />
      <div className="flex flex-col items-center justify-center py-12 px-8 container mx-auto max-w-lg">
        <h2 className="w-full text-6xl text-white font-black mb-8">Poems</h2>
        <nav className="w-full space-y-4 text-xl">
          {poems.map((poem) => (
            <Link
              key={poem.id}
              href={`/${encodeURIComponent(poem.properties.Name.title.replaceAll(' ', '-'))}:${poem.id}`}
              className="flex items-center flex-row justify-between border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors rounded py-2 px-3 w-full"
            >
              <span className="text-zinc-900 dark:text-zinc-50">
                {poem.properties.Name.title}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {getRelativeTime(poem.properties.Written.start)}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
