import Author from '@/components/Author';
import LatinVelocity from '@/components/LatinVelocity';
import PoemList from '@/components/PoemList';
import { getPoems } from '@/util/notion';

export const revalidate = 86400; // 1 day in seconds

export default async function Home() {
  const poems = await getPoems();

  return (
    <main className="snap-y snap-mandatory">
      <PoemList poems={poems} />
      <Author />
      <LatinVelocity />
    </main>
  );
}
