import AuthorImage from './AuthorImage';

export default function Author() {
  return (
    <section className="flex flex-wrap-reverse flex-row-reverse items-center justify-center gap-10 py-20 px-8">
      <AuthorImage />
      <main className="flex flex-col w-sm space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
          The Poet
        </h2>
        <span className="text-5xl sm:text-7xl text-zinc-900 dark:text-white">
          Krish Gupta
        </span>
        <p className="text-lg max-w-prose text-zinc-800 dark:text-zinc-300">
          What is the world but a collection of words? Everything we see, feel,
          and experience is an assumption, a belief, a word. I am a poet who
          believes in the power of words to shape our reality. Through my
          poetry, I explore the depths of human emotion, the beauty of nature,
          and the complexities of life. I invite you to join me on this journey
          of discovery, where we can find meaning in the chaos and beauty in the
          mundane.
        </p>
      </main>
    </section>
  );
}
