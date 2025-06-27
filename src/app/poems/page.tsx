import { getPoems } from "@/app/poems/utils";
import Link from "next/link";

export default function PoemsPage() {
  return getPoems().map((poem) => (
    <Link href={`/poems/${poem.slug}`} key={poem.slug}>
      {poem.title}
    </Link>
  ));
}
