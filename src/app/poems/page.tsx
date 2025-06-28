import Poems from "@/components/Poems";
import TextPressure from "@/components/ui/text-pressure";

export default async function PoemsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="-z-50 opacity-50 fixed flex items-center inset-0">
        <TextPressure text="POEMS" />
      </div>
      <Poems />
    </div>
  );
}
