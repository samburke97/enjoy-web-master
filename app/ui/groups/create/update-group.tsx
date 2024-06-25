import { useState, useContext, useRef, useEffect } from "react";

import {
  XMarkIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { GroupsContext } from "../../../../store/groups-context";
import { fetchSports, fetchTags } from "@/app/lib/data";
import { updateGroup } from "@/app/lib/actions";

import { Sport, Group, Tags } from "@/app/lib/definitions";

const UpdateGroup: React.FC<{ group: Group }> = ({ group }) => {
  const groupsCtx = useContext(GroupsContext);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [sports, setSports] = useState<Sport[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [searchSportInput, setSearchSportInput] = useState<string>("");
  const [searchTagsInput, setSearchTagsInput] = useState<string>("");
  const [showSportsDropdown, setShowSportsDropdown] = useState<boolean>(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState<boolean>(false);
  const [showClearSportInput, setShowClearSportInput] =
    useState<boolean>(false);
  const [showClearTagsInput, setShowClearTagsInput] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const sportsData = await fetchSports();
      const tagsData = await fetchTags();
      setSports(sportsData);
      setTags(tagsData);
      setSelectedSports(group.sports);
      setSelectedTags(group.tags);
    };

    fetchData();
  }, [group.sports, group.tags]);

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

  const handleTagsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTagsIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedTagsList = selectedTagsIds.map(
      (id) => tags.find((tag) => tag.id === id)!
    );
    setSelectedTags((prevSelectedTags) => [
      ...prevSelectedTags,
      ...selectedTagsList,
    ]);
  };

  const handleSearchTagsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTagsInput(event.target.value);
    setShowClearTagsInput(!!event.target.value);
  };

  const clearSearchTagsInput = () => {
    setSearchTagsInput("");
    setShowClearTagsInput(false);
  };

  const removeSelectedTags = (id: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.filter((tag) => tag.id !== id)
    );
  };

  const handleSearchSportInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchSportInput(event.target.value);
    setShowClearSportInput(!!event.target.value);
  };

  const clearSearchSportInput = () => {
    setSearchSportInput("");
    setShowClearSportInput(false);
  };

  const removeSelectedSport = (id: string) => {
    setSelectedSports((prevSelectedSports) =>
      prevSelectedSports.filter((sport) => sport.id !== id)
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!selectedSports || !selectedSports.length) {
        throw new Error("Selected sports or tags are empty.");
      }

      const updatedGroupData = {
        id: group.id,
        name: nameInputRef.current?.value || group.name,
        sportIds: selectedSports.map((sport) => sport.id),
        tagIds: selectedTags.map((tag) => tag.id),
      };

      await updateGroup(updatedGroupData);

      console.log("Group updated successfully");
    } catch (error) {
      console.error("Error updating group:", error);
    }
    groupsCtx.showModalAction();
  };

  return (
    <div className="fixed top-0 right-0 w-1/2 h-full bg-surface-light border-[1px] dark:bg-surface-primary-dark dark:border-outline-medium-dark p-10 overflow-scroll z-20">
      <div className="gap-y-5 dark:bg-surface-primary-dark">
        <div className="flex justify-between py-4 mb-4">
          <p className="font-semibold text-2xl">{group.name}</p>
          <button onClick={groupsCtx.showModalAction}>
            <XMarkIcon className="w-8 p-2 border border-outline-medium rounded-full" />
          </button>
        </div>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="tag-name" className="py-4">
              Filter Group Name*
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-12 pr-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
                ref={nameInputRef}
                name="name"
                type="text"
                maxLength={50}
                placeholder="Enter Tag Name"
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="sport-name" className="py-4">
              Filter Group Sports ({selectedSports.length})
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
                    {sports
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

          <div className="flex flex-col">
            <label htmlFor="sport-name" className="py-4">
              Tags ({selectedTags.length})
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-12 pr-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
                type="text"
                placeholder="Search or select sports"
                value={searchTagsInput}
                onChange={handleSearchTagsInputChange}
                onFocus={() => setShowTagsDropdown(true)}
                onBlur={() => setTimeout(() => setShowTagsDropdown(false), 200)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {showClearTagsInput && (
                <XMarkIcon
                  className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={clearSearchTagsInput}
                />
              )}
              {showTagsDropdown && (
                <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-b-md shadow-lg">
                  <select
                    className="block w-full px-4 py-2 text-sm outline-none"
                    multiple
                    size={5}
                    value={selectedTags.map((tag) => tag.id)}
                    onChange={handleTagsChange}
                  >
                    {tags
                      .filter((tag) =>
                        tag.name
                          .toLowerCase()
                          .includes(searchTagsInput.toLowerCase())
                      )
                      .map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex flex-wrap mt-2">
              {selectedTags.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-gray-100 rounded-full px-3 py-2 mr-2 flex items-center"
                >
                  <PhotoIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{tag.name}</span>
                  <XMarkIcon
                    className="h-4 w-4 ml-2 cursor-pointer"
                    onClick={() => removeSelectedTags(tag.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="text-black font-medium text-sm rounded py-2 px-6 mr-2 border border-black dark:border-surface-primary dark:text-surface-primary"
              onClick={groupsCtx.showModalAction}
            >
              Cancel
            </button>

            <button
              className="bg-primary-primary dark:bg-primary-primary-dark text-primary-light dark:text-outline-medium-dark font-medium text-sm rounded py-2 px-6 border border-transparent"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateGroup;
