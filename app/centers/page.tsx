import Centers from "../ui/centers/centers";
import { fetchCenters } from "@/app/lib/data";

export default async function Page() {
  const totalCenters = await fetchCenters();

  return (
    <main className="flex flex-col min-h-screen  w-[926px] m-auto gap-4 text-primary text-2xl">
      <h1 className=" font-semibold">Centers</h1>
      <div className="flex flex-wrap justify-between gap-y-5">
        <Centers centers={totalCenters} />
      </div>
    </main>
  );
}
