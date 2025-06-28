import { Metadata } from "next";
import { getPoems } from "../utils";
import TextPressure from "@/components/ui/text-pressure";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const poems = await getPoems();

  return poems.map((poem) => ({
    slug: poem.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const { getPoem } = await import("../utils");
  const poem = await getPoem(slug);

  const title = poem.title;

  return {
    title,
  };
}

export default async function Poem(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const { getPoem } = await import("../utils");
  const poem = await getPoem(slug);

  const { default: MDX } = await import(`@/content/poems/${slug}/page.mdx`);

  console.log(poem.title);

  return (
    <div className="relative overflow-hidden">
      <div className="-z-50 opacity-50 fixed flex items-center inset-0">
        <TextPressure text={poem.title.toUpperCase()} />
      </div>
      <main className="bg-zinc-950/90 flex flex-col w-full items-center justify-center min-h-[50vh] p-12 sm:px-40 md:px-60 lg:px-80 xl:px-120">
        <article className="prose prose-invert prose-zinc prose-2xl prose-p:my-0">
          <MDX />
        </article>
      </main>
    </div>
  );
}

export const dynamicParams = false;
