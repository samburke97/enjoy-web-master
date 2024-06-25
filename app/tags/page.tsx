"use server";

import Tags from "../ui/tags/tags";
import { fetchTags } from "../lib/data";

export default async function Page() {
  const totalTags = await fetchTags();
  return (
    <main className="flex flex-col min-h-screen w-[926px] m-auto gap-4 text-primary text-2xl">
      <h1 className="font-semibold">Tags</h1>
      <div>
        <Tags tags={totalTags} />
      </div>
    </main>
  );
}
