import AiChat from "@/components/AiChat";
import { getPoems } from "@/app/poems/utils";

export default async function AI() {
  const poems = await getPoems();

  return <AiChat poems={poems} />;
}
