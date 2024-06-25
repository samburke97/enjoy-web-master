"use client";

import { deleteCenter } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

interface deleteCenterProps {
  id: string;
}

const DeleteCenterBtn: React.FC<deleteCenterProps> = ({ id }) => {
  return (
    <button onClick={() => deleteCenter(id)}>
      <div className="w-8 h-8 bg-primary-light dark:bg-primary-light-dark border border-dotted border-primary-primary dark:border-primary-primary-dark flex justify-center rounded gap-y-4 mt-3 relative overflow-hidden">
        <TrashIcon className="w-6" />
      </div>
    </button>
  );
};

export default DeleteCenterBtn;
