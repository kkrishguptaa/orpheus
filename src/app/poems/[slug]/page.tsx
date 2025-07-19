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
    title: `${title} | Poem by Krish Gupta - Orpheus`,
    description: `Read the poem "${title}" by Krish Gupta on Orpheus. Explore themes of love, loss, and the human experience through this thought-provoking verse.`,
    openGraph: {
      title: `${title} | Poem by Krish Gupta - Orpheus`,
      description: `Read the poem "${title}" by Krish Gupta on Orpheus. Explore themes of love, loss, and the human experience through this thought-provoking verse.`,
      url: `https://orpheus.krishg.com/poems/${slug}`,
      siteName: "Orpheus",
      locale: "en_US",
      type: "article",
      publishedTime: poem.frontmatter.date.toISOString(),
      modifiedTime: poem.frontmatter.date.toISOString(),
      authors: ["https://krishg.com"],
      tags: [poem.title, "Poetry", "Krish Gupta"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Poem by Krish Gupta - Orpheus`,
      description: `Read the poem "${title}" by Krish Gupta on Orpheus. Explore themes of love, loss, and the human experience through this thought-provoking verse.`,
      creator: "@kkrishguptaa",
    },
  };
}

export default async function Poem(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const { getPoem } = await import("../utils");
  const poem = await getPoem(slug);

  const { default: MDX } = await import(`@/content/poems/${slug}/page.mdx`);

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
