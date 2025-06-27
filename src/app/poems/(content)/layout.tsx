export default function PoemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="prose prose-zinc prose-invert">{children}</main>;
}
