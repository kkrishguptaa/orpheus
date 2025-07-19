import Link from "next/link";

export default function Navbar() {
  const items = [
    {
      name: "Poems",
      href: "/poems",
    },
  ];
  return (
    <header className="flex flex-row justify-between gap-8 w-screen items-center min-h-[10vh] py-4 px-8 border-b bg-zinc-950 border-zinc-800">
      <Link
        href="/"
        className="text-3xl font-semibold text-zinc-300 hover:text-white hover:underline transition-colors"
      >
        Orpheus
      </Link>
      <nav className="flex flex-row items-center justify-end sm:justify-start space-x-8">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-xl font-semibold text-zinc-300 hover:text-white hover:underline transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
