"use client";
import { deleteSport } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

interface SportsDeleteActionButtonClientProps {
  id: string | number;
}

const SportsDeleteActionButtonClient: React.FC<
  SportsDeleteActionButtonClientProps
> = ({ id }) => {
  return (
    <button onClick={() => deleteSport(id)}>
      <div className="w-8 h-8 bg-primary-light dark:bg-primary-light-dark border border-dotted border-primary-primary dark:border-primary-primary-dark flex justify-center rounded gap-y-4 mt-3 relative overflow-hidden">
        <TrashIcon className="w-6" />
      </div>
    </button>
  );
};

export default SportsDeleteActionButtonClient;
