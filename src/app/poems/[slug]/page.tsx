import { Metadata } from "next";
import { getPoems } from "../utils";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const poems = await getPoems();

  return poems.map((poem) => ({
    slug: poem.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const { getPoem } = await import("../utils");
  const poem = await getPoem(slug);

  const title = poem.title;

  return {
    title,
  };
}

export default async function Poem({ params }: Props) {
  const { slug } = params;
  const { getPoem } = await import("../utils");
  const poem = await getPoem(slug);

  const { default: MDX } = await import(`@/content/poems/${slug}/page.mdx`);

  console.log(poem.title);

  return (
    <div>
      <MDX />
    </div>
  );
}

export const dynamicParams = false;
