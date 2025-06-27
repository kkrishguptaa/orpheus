import { getPoems } from "@/app/poems/utils";
import Link from "next/link";

export default async function PoemsPage() {
  return (await getPoems()).map((poem) => (
    <Link href={`/poems/${poem.slug}`} key={poem.slug}>
      {poem.title}
    </Link>
  ));
}
