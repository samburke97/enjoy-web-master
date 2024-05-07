"use client";

import { useState, useContext, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { UIContext } from "../../../../store/ui-context";
import { createTag } from "@/app/lib/actions";
import { Sport, Group } from "../../../lib/definitions";

interface CreateTagProps {
  sportsData: Sport[]; // Assuming Sport is the type for sports data
  groupsData: Group[]; // Assuming Group is the type for groups data
}

const CreateTag: React.FC<CreateTagProps> = ({ sportsData, groupsData }) => {
  const UICtx = useContext(UIContext);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedFilterGroup, setSelectedFilterGroup] = useState<string | null>(
    null
  );
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameInputRef.current?.value.trim();

    if (!name) {
      console.error("Name field is empty");
      return;
    }

    const createdTag = {
      name,
      sportId: selectedSport,
      groupId: selectedFilterGroup,
    };

    createTag(createdTag);
    UICtx.showModalAction();
  };

  return (
    <div className="fixed top-0 right-0 w-1/2 h-full bg-surface-light border-[1px] dark:bg-surface-primary-dark dark:border-outline-medium-dark p-10 overflow-scroll z-20">
      <div className="gap-y-5 dark:bg-surface-primary-dark">
        <div className="flex justify-between py-4 mb-4">
          <p className="font-semibold text-2xl">Create Tag</p>
          <button onClick={UICtx.showModalAction}>
            <XMarkIcon className="w-8 p-2 border border-outline-medium rounded-full" />
          </button>
        </div>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="tag-name" className="py-4">
              Tag Name
            </label>
            <input
              className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-6 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
              ref={nameInputRef}
              name="name"
              type="text"
              maxLength={50}
              placeholder="Enter Tag Name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="sport-name" className="py-4">
              Select Sport
            </label>
            <select
              className="block w-full rounded-md border border-outline-medium dark:border-outline-medium-dark dark:bg-surface-extra-light-dark py-[9px] pl-3 pr-12 text-sm outline-2 placeholder:on-light"
              value={selectedSport || ""}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">Select Sport</option>
              {sportsData.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="filter-group" className="py-4">
              Select Filter Group
            </label>
            <select
              className="block w-full rounded-md border border-outline-medium dark:border-outline-medium-dark dark:bg-surface-extra-light-dark py-[9px] pl-3 pr-12 text-sm outline-2 placeholder:on-light"
              value={selectedFilterGroup || ""}
              onChange={(e) => setSelectedFilterGroup(e.target.value)}
            >
              <option value="">Select Filter Group</option>
              {groupsData.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="text-black font-medium text-sm rounded py-2 px-6 mr-2 border border-black dark:border-surface-primary dark:text-surface-primary "
              onClick={UICtx.showModalAction}
            >
              Cancel
            </button>
            <button
              className="bg-primary-primary dark:bg-primary-primary-dark text-primary-light dark:text-outline-medium-dark font-medium text-sm rounded py-2 px-6 border border-transparent"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTag;
