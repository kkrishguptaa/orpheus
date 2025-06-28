import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

const path = join('src', 'content', 'poems');

export interface PoemFrontmatter {
  title: string;
  date: Date;
}

interface Poem {
  title: string;
  slug: string;
  frontmatter: PoemFrontmatter;
  content: string;
}

export async function getPoem(slug: string): Promise<Poem> {
  const file = join(slug, 'page.mdx');
  const filePath = join('@', 'content', 'poems', file);

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
    return getPoem(poem);
  }));
}
