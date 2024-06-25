"use client";

import React, { useState, useContext, useRef, useEffect } from "react";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { UIContext } from "../../store/ui-context";
import { createGroup, createTag } from "@/app/(home)/lib/actions";
import { Tags, Sport, Group } from "@/app/(home)/lib/definitions";

const CreateForm: React.FC<{
  title: string;
  createType: string;
  tags: Tags[];
  sports: Sport[];
}> = ({ title, createType, tags, sports }) => {
  const UICtx = useContext(UIContext);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [selectedFilterGroups, setSelectedFilterGroups] = useState<Group[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [showTagsDropdown, setShowTagsDropdown] = useState<boolean>(false);
  const [showSportsDropdown, setShowSportsDropdown] = useState<boolean>(false);
  const [showGroupsDropdown, setShowGroupsDropdown] = useState<boolean>(false);
  const [searchTagInput, setSearchTagInput] = useState<string>("");
  const [searchSportInput, setSearchSportInput] = useState<string>("");
  const [searchGroupInput, setSearchGroupInput] = useState<string>("");
  const [showClearTagInput, setShowClearTagInput] = useState<boolean>(false);
  const [showClearSportInput, setShowClearSportInput] =
    useState<boolean>(false);
  const [showClearGroupInput, setShowClearGroupInput] =
    useState<boolean>(false);
  const [loadedTags, setLoadedTags] = useState<Tags[]>([]);
  const [loadedSports, setLoadedSports] = useState<Sport[]>([]);
  const [loadedGroups, setLoadedGroups] = useState<Group[]>([]);

  useEffect(() => {
    setLoadedTags(tags);
    setLoadedSports(sports);
  }, [tags, sports]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameInputRef.current?.value.trim();

    if (!name) {
      console.error("Name field is empty");
      return;
    }

    const formData: any = {
      name,
    };

    // Include tagIds if there are selected tags
    if (selectedTags.length > 0) {
      formData.tagIds = selectedTags.map((tag) => tag.id);
    }

    // Include sportIds if there are selected sports
    if (selectedSports.length > 0) {
      formData.sportIds = selectedSports.map((sport) => sport.id);
    }

    // Include groupIds if there are selected filter groups
    if (selectedFilterGroups.length > 0) {
      formData.groupIds = selectedFilterGroups.map((group) => group.id);
      formData.groupId = selectedFilterGroups[0].id; // Assign groupId based on the first selected group
    }

    if (createType === "group") {
      await createGroup(formData.name, formData.tagIds, formData.sportIds);
    } else if (createType === "tag") {
      await createTag(formData);
    }

    UICtx.showModalAction();
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTagIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedTagsList = selectedTagIds.map(
      (id) => loadedTags.find((tag) => tag.id === id)!
    );
    setSelectedTags((prevSelectedTags) => [
      ...prevSelectedTags,
      ...selectedTagsList,
    ]);
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSportIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedSportsList = selectedSportIds.map(
      (id) => loadedSports.find((sport) => sport.id === id)!
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
      (id) => loadedGroups.find((group) => group.id === id)!
    );
    setSelectedFilterGroups((prevSelectedGroups) => [
      ...prevSelectedGroups,
      ...selectedGroupsList,
    ]);
  };

  const handleSearchTagInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTagInput(event.target.value);
    setShowClearTagInput(!!event.target.value);
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

  const clearSearchTagInput = () => {
    setSearchTagInput("");
    setShowClearTagInput(false);
  };

  const clearSearchSportInput = () => {
    setSearchSportInput("");
    setShowClearSportInput(false);
  };

  const clearSearchGroupInput = () => {
    setSearchGroupInput("");
    setShowClearGroupInput(false);
  };

  const removeSelectedTag = (id: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.filter((tag) => tag.id !== id)
    );
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
          <p className="font-semibold text-2xl">{title}</p>
          <button onClick={UICtx.showModalAction}>
            <XMarkIcon className="w-8 p-2 border border-outline-medium rounded-full" />
          </button>
        </div>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="py-4">
              {createType === "group" ? "Group Name" : "Tag Name"}
            </label>
            <input
              className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-6 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
              ref={nameInputRef}
              name="name"
              type="text"
              maxLength={50}
              placeholder={`Enter ${
                createType === "group" ? "Group" : "Tag"
              } Name`}
              required
            />
          </div>

          {createType === "tag" && (
            <>
              <div className="flex flex-col mt-4">
                <label htmlFor="tag-name" className="py-4">
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
                        className="block w-full px-4 py-2 text-sm outline-none"
                        multiple
                        size={5}
                        value={selectedSports.map((sport) => sport.id)}
                        onChange={handleSportChange}
                      >
                        {loadedSports
                          .filter((sport) =>
                            sport.name
                              .toLowerCase()
                              .includes(searchSportInput.toLowerCase())
                          )
                          .map((sport) => (
                            <option key={sport.id} value={sport.id}>
                              {sport.name}
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

              <div className="flex flex-col mt-2">
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
                        {loadedGroups
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
            </>
          )}

          <div className="flex flex-col mt-4">
            <label htmlFor="tag-name" className="py-4">
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
                    className="block w-full px-4 py-2 text-sm outline-none"
                    multiple
                    size={5}
                    value={selectedSports.map((sport) => sport.id)}
                    onChange={handleSportChange}
                  >
                    {loadedSports
                      .filter((sport) =>
                        sport.name
                          .toLowerCase()
                          .includes(searchSportInput.toLowerCase())
                      )
                      .map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.name}
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

          <button
            type="submit"
            className="bg-primary-primary text-white px-8 py-3 rounded-md mt-8 text-center"
          >
            {createType === "group" ? "Create Group" : "Create Tag"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
