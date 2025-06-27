import Link from "next/link";

export default function Navbar() {
  const items = [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Poems",
      href: "/poems",
    },
  ];
  return (
    <header className="flex flex-row gap-8 w-screen items-center min-h-[10vh] py-4 px-8 border-b border-zinc-800">
      <nav className="order-2 sm:order-1 flex-1/3 flex flex-row items-center justify-end sm:justify-start space-x-8">
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
      <div className="flex-1/3 flex sm:justify-center sm:order-2">
        <Link
          href="/"
          className="text-3xl font-display font-semibold text-zinc-300 hover:text-white hover:underline transition-colors"
        >
          Orpheus
        </Link>
      </div>
      <div className="hidden sm:block sm:flex-1/3 order-3"></div>
    </header>
  );
}
