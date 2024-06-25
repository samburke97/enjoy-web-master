import Sports from "../ui/sports/sports";
import { fetchSports } from "@/app/lib/data";

export default async function Page() {
  const totalSports = await fetchSports();

  return (
    <main className="flex flex-col min-h-screen  w-[926px] m-auto gap-4 text-primary text-2xl">
      <h1 className=" font-semibold">Sports</h1>
      <div className="flex flex-wrap justify-between gap-y-5">
        <Sports sports={totalSports} />
      </div>
    </main>
  );
}
