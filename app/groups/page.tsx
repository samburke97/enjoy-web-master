import Search from "../ui/search";
import Groups from "../ui/groups/groups";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen  w-[926px] m-auto gap-4 text-primary text-2xl">
      <h1 className=" font-semibold">Groups</h1>
      <div>
        <Search placeholder="Search" page="groups" />
      </div>
      <div className="flex flex-wrap justify-between gap-y-5">
        <Groups />
      </div>
    </main>
  );
}
