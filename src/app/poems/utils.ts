import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { read } from 'gray-matter';

const path = join('src', 'app', 'poems', '(content)');

interface Poem {
  title: string;
  slug: string;
  frontmatter: Record<string, string>;
  rawContent: string;
}

export function getPoem(slug: string, iteration = false): Poem | Error {
  const file = join(slug, 'page.mdx');
  const filePath = join(path, file);

  if (!iteration && !readdirSync(path).includes(file)) {
    return new Error(`Poem with slug "${slug}" not found.`);
  }

  const matter = read(filePath);

  return {
    title: matter.data.title,
    slug,
    frontmatter: matter.data,
    rawContent: matter.content,
  };
}

export function getPoems() {
  const poems = readdirSync(path).filter(f => lstatSync(join(path, f)).isDirectory());

  return poems.map(poem => {
    return getPoem(poem, true) as Poem;
  })
}
