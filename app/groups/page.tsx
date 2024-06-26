import Groups from "../ui/groups/groups";
import { fetchGroups } from "../lib/data";

export default async function Page() {
  const totalGroups = await fetchGroups();

  return (
    <main className="flex flex-col min-h-screen  w-[926px] m-auto gap-4 text-primary text-2xl">
      <h1 className=" font-semibold">Groups</h1>
      <div className="flex flex-wrap justify-between gap-y-5">
        <Groups groups={totalGroups} />
      </div>
    </main>
  );
}
