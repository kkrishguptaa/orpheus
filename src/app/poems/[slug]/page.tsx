import { Metadata } from "next";
import { getPoems } from "../utils";

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
    <article className="prose prose-invert prose-zinc prose-2xl">
      <MDX />
    </article>
  );
}

export const dynamicParams = false;
