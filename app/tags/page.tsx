import Search from "../ui/search";
import Tags from "../ui/tags/tags";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen w-[926px] m-auto gap-4 text-primary text-2xl">
      <h1 className=" font-semibold">Tags</h1>
      <div>
        <Search placeholder="Search" page="tags" />
      </div>
      <Tags />
    </main>
  );
}
