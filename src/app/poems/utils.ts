import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

const path = join('src', 'app', 'poems', '(content)');

interface Poem {
  title: string;
  slug: string;
  frontmatter: Record<string, string>;
  rawContent: string;
}

export async function getPoem(slug: string, iteration = false) {
  const file = join(slug, 'page.mdx');
  const filePath = join('@', 'app', 'poems', '(content)', file);

  if (!iteration && !readdirSync(path).includes(slug)) {
    return new Error(`Poem with slug "${slug}" not found.`);
  }

  // import the file and take the frontmatter exported variable
  const { frontmatter } = await import(filePath);

  return {
    title: frontmatter.title,
    slug,
    frontmatter,
  } as Poem;
}

export async function getPoems() {
  const poems = readdirSync(path).filter(f => lstatSync(join(path, f)).isDirectory());

  return Promise.all(poems.map(async (poem) => {
    return getPoem(poem, true) as Promise<Poem>;
  }));
}
