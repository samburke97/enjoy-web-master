"use client";

import { useState, useContext, useRef, useEffect } from "react";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { UIContext } from "../../../../store/ui-context";
import { createTag } from "@/app/lib/actions";
import { fetchGroups, fetchSports } from "@/app/lib/data";
import { Sport, Group } from "@/app/lib/definitions";

const CreateTag: React.FC = () => {
  const UICtx = useContext(UIContext);
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [selectedFilterGroups, setSelectedFilterGroups] = useState<Group[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [sports, setSports] = useState<Sport[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [showSportsDropdown, setShowSportsDropdown] = useState<boolean>(false);
  const [showGroupsDropdown, setShowGroupsDropdown] = useState<boolean>(false);
  const [searchSportInput, setSearchSportInput] = useState<string>("");
  const [searchGroupInput, setSearchGroupInput] = useState<string>("");
  const [showClearSportInput, setShowClearSportInput] =
    useState<boolean>(false);
  const [showClearGroupInput, setShowClearGroupInput] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const sportsData = await fetchSports();
      const groupsData = await fetchGroups();
      setSports(sportsData);
      setGroups(groupsData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameInputRef.current?.value.trim();

    if (!name) {
      console.error("Name field is empty");
      return;
    }

    const createdTag: any = {
      name,
    };

    // Include sportIds if there are selected sports
    if (selectedSports.length > 0) {
      createdTag.sportIds = selectedSports.map((sport) => sport.id);
    }

    // Include groupIds if there are selected filter groups
    if (selectedFilterGroups.length > 0) {
      createdTag.groupIds = selectedFilterGroups.map((group) => group.id);
      createdTag.groupId = selectedFilterGroups[0].id; // Assign groupId based on the first selected group
    }

    createTag(createdTag);
    UICtx.showModalAction();
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSportIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedSportsList = selectedSportIds.map(
      (id) => sports.find((sport) => sport.id === id)!
    );
    setSelectedSports((prevSelectedSports) => [
      ...prevSelectedSports,
      ...selectedSportsList,
    ]);
  };

  const handleFilterGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedGroupIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedGroupsList = selectedGroupIds.map(
      (id) => groups.find((group) => group.id === id)!
    );
    setSelectedFilterGroups((prevSelectedGroups) => [
      ...prevSelectedGroups,
      ...selectedGroupsList,
    ]);
  };

  const handleSearchSportInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchSportInput(event.target.value);
    setShowClearSportInput(!!event.target.value);
  };

  const handleSearchGroupInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchGroupInput(event.target.value);
    setShowClearGroupInput(!!event.target.value);
  };

  const clearSearchSportInput = () => {
    setSearchSportInput("");
    setShowClearSportInput(false);
  };

  const clearSearchGroupInput = () => {
    setSearchGroupInput("");
    setShowClearGroupInput(false);
  };

  const removeSelectedSport = (id: string) => {
    setSelectedSports((prevSelectedSports) =>
      prevSelectedSports.filter((sport) => sport.id !== id)
    );
  };

  const removeSelectedGroup = (id: string) => {
    setSelectedFilterGroups((prevSelectedGroups) =>
      prevSelectedGroups.filter((group) => group.id !== id)
    );
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
              Tag Name*
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-12 pr-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
                ref={nameInputRef}
                name="name"
                type="text"
                maxLength={50}
                placeholder="Enter Tag Name"
                required
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="sport-name" className="py-4">
              Tag Sports ({selectedSports.length})
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-12 pr-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
                type="text"
                placeholder="Search or select sports"
                value={searchSportInput}
                onChange={handleSearchSportInputChange}
                onFocus={() => setShowSportsDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowSportsDropdown(false), 200)
                }
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {showClearSportInput && (
                <XMarkIcon
                  className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={clearSearchSportInput}
                />
              )}
              {showSportsDropdown && (
                <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-b-md shadow-lg">
                  <select
                    className="block w-full px-3 py-1 text-sm outline-none rounded"
                    multiple
                    size={5}
                    value={selectedSports.map((sport) => sport.id)}
                    onChange={handleSportChange}
                  >
                    {sports
                      .filter((sport) =>
                        sport.name
                          .toLowerCase()
                          .includes(searchSportInput.toLowerCase())
                      )
                      .map((sport) => (
                        <option
                          key={sport.id}
                          value={sport.id}
                          className="py-3 px-3 hover:bg-primary-light border rounded hover:border-primary-primary"
                        >
                          <div className="flex">{sport.name}</div>
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex flex-wrap mt-2">
              {selectedSports.map((sport) => (
                <div
                  key={sport.id}
                  className="bg-gray-100 rounded-full px-3 py-2 mr-2 flex items-center"
                >
                  <PhotoIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{sport.name}</span>
                  <XMarkIcon
                    className="h-4 w-4 ml-2 cursor-pointer"
                    onClick={() => removeSelectedSport(sport.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="filter-group" className="py-4">
              Tag Filter Groups ({selectedFilterGroups.length})
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-12 pr-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
                type="text"
                placeholder="Search or select groups"
                value={searchGroupInput}
                onChange={handleSearchGroupInputChange}
                onFocus={() => setShowGroupsDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowGroupsDropdown(false), 200)
                }
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {showClearGroupInput && (
                <XMarkIcon
                  className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={clearSearchGroupInput}
                />
              )}
              {showGroupsDropdown && (
                <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-b-md shadow-lg">
                  <select
                    className="block w-full px-4 py-2 text-sm outline-none"
                    multiple
                    size={5}
                    value={selectedFilterGroups.map((group) => group.id)}
                    onChange={handleFilterGroupChange}
                  >
                    {groups
                      .filter((group) =>
                        group.name
                          .toLowerCase()
                          .includes(searchGroupInput.toLowerCase())
                      )
                      .map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex flex-wrap mt-2">
              {selectedFilterGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-gray-100 rounded-full px-3 py-2 mr-2 flex items-center"
                >
                  <PhotoIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{group.name}</span>
                  <XMarkIcon
                    className="h-4 w-4 ml-2 cursor-pointer"
                    onClick={() => removeSelectedGroup(group.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="text-black font-medium text-sm rounded py-2 px-6 mr-2 border border-black dark:border-surface-primary dark:text-surface-primary"
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
