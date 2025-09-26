import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { getPoem, getPoemContent, getPoems } from '@/util/notion';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const poems = await getPoems();

  return poems.map((poem) => ({
    slug: `${encodeURIComponent(poem.properties.Name.title.replaceAll(' ', '-'))}:${poem.id}`,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const [_title, id] = decodeURIComponent(params.slug).split(':');

  const poem = await getPoem(id);

  if (!poem) {
    return {};
  }

  const title = poem.properties.Name.title;

  return {
    title: `${title} | Poem by Krish Gupta`,
    description: `Read the poem "${title}" by Krish Gupta. Explore themes of love, loss, and the human experience through this thought-provoking verse.`,
    openGraph: {
      title: `${title} | Poem by Krish Gupta`,
      description: `Read the poem "${title}" by Krish Gupta. Explore themes of love, loss, and the human experience through this thought-provoking verse.`,
      url: `https://poems.krishg.com/${params.slug}`,
      siteName: 'Poems',
      locale: 'en_US',
      type: 'article',
      publishedTime: poem.properties.Written.start.toISOString(),
      modifiedTime: (
        poem.properties.Written.end || poem.properties.Written.start
      ).toISOString(),
      authors: ['https://krishg.com'],
      tags: [title, 'Poetry', 'Krish Gupta'],
    },
    twitter: {
      card: 'summary',
      title: `${title} | Poem by Krish Gupta`,
      description: `Read the poem "${title}" by Krish Gupta. Explore themes of love, loss, and the human experience through this thought-provoking verse.`,
      creator: '@kkrishguptaa',
    },
  };
}

export default async function Poem(props: Props) {
  const { slug } = await props.params;
  const [_title, id] = decodeURIComponent(slug).split(':');

  const poem = await getPoem(id);

  if (!poem) {
    return notFound();
  }

  const content = await getPoemContent(id);

  return (
    <main className="bg-zinc-100/90 dark:bg-zinc-950/80 w-full min-h-[50vh] py-12 px-8">
      <article className="container md:mx-auto prose prose-zinc dark:prose-invert prose-2xl">
        <h1>{poem.properties.Name.title}</h1>
        <main>
          {content.map((block) => {
            if (block.type !== 'paragraph') return null;
            return (
              <p key={block.id}>
                {block.paragraph.rich_text.map((t) =>
                  t.plain_text.split('\n').map((line, index, array) => (
                    <Fragment key={crypto.randomUUID()}>
                      {line}
                      {index !== array.length - 1 && <br />}
                    </Fragment>
                  )),
                )}
              </p>
            );
          })}
        </main>
      </article>
    </main>
  );
}
