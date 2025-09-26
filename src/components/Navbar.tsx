import Link from 'next/link';
import { cn } from '@/util/css';

export default function Navbar() {
  const items = [
    {
      name: 'Portfolio',
      href: 'https://krishg.com',
      external: true,
      desktopOnly: false,
    },
    {
      name: 'Home',
      href: '/',
      external: false,
      desktopOnly: true,
    },
  ];
  return (
    <header className="flex flex-row justify-between gap-8 w-screen items-center min-h-[10vh] py-4 px-8 border-b bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
      <Link
        href="/"
        className="text-xl sm:text-3xl font-semibold text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:underline transition-colors"
      >
        <span className="hidden md:block">Krish Gupta</span>
        <span className="md:hidden">Home</span>
      </Link>
      <nav className="flex flex-row items-center justify-end sm:justify-start space-x-8">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            target={item.external ? '_blank' : '_self'}
            className={cn(
              item.desktopOnly ? 'hidden md:block' : '',
              'sm:text-xl text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:underline transition-colors',
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
