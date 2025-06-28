export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-8 border-t border-zinc-800 bg-zinc-950 text-zinc-300 *:text-center">
      <p>© {new Date().getFullYear()} Krish Gupta. All rights reserved.</p>
      <p>
        Built with ❤️ using Next.js and TailwindCSS. The Source Code is licensed
        open source under MIT, the poems are intellectual property.
      </p>
    </footer>
  );
}
