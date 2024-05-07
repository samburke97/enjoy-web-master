"use client";

import { deleteTag } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

interface TagsDeleteActionButtonClientProps {
  id: string | number;
}

const TagsDeleteActionButtonClient: React.FC<
  TagsDeleteActionButtonClientProps
> = ({ id }) => {
  return (
    <button onClick={() => deleteTag(id)}>
      <div className="w-8 h-8 flex justify-center bg-primary-light dark:bg-primary-light-dark border border-dotted border-primary-primary dark:border-primary-primary-dark rounded overflow-hidden">
        <TrashIcon className="w-6" />
      </div>
    </button>
  );
};

export default TagsDeleteActionButtonClient;
