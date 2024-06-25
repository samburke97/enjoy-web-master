"use client";

import { deleteGroup } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

interface GroupDeleteBtnProps {
  id: string;
}

const GroupDeleteBtn: React.FC<GroupDeleteBtnProps> = ({ id }) => {
  return (
    <button onClick={() => deleteGroup(id)}>
      <div className="w-8 h-8 flex justify-center bg-primary-light dark:bg-primary-light-dark border border-dotted border-primary-primary dark:border-primary-primary-dark rounded overflow-hidden">
        <TrashIcon className="w-6" />
      </div>
    </button>
  );
};

export default GroupDeleteBtn;
