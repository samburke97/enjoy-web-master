"use client";
import { deleteSport } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

interface SportsDeleteActionButtonClientProps {
  id: string | number;
}

// As you're using onClick, this MUST be a client component, as you're interacting with the user.
// Anything with interaction is managed on the client side, therefore you need to extract from your server side and put them in a different component! (This at the moment, it's the best practice)
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
