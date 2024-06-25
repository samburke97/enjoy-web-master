import { useState, useContext, useRef, useEffect } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UIContext } from "../../../../store/ui-context";
import { createGroup } from "@/app/lib/actions";
import { fetchTags, fetchSports } from "@/app/lib/data";
import { Tags, Sport } from "@/app/lib/definitions";

const CreateGroup: React.FC = () => {
  const UICtx = useContext(UIContext);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<Tags[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [searchTagInput, setSearchTagInput] = useState<string>("");
  const [showTagsDropdown, setShowTagsDropdown] = useState<boolean>(false);
  const [showClearTagInput, setShowClearTagInput] = useState<boolean>(false);
  const [searchSportInput, setSearchSportInput] = useState<string>("");
  const [showSportsDropdown, setShowSportsDropdown] = useState<boolean>(false);
  const [showClearSportInput, setShowClearSportInput] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const tagsData = await fetchTags();
      const sportsData = await fetchSports();
      setTags(tagsData);
      setSports(sportsData);
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

    if (selectedSports.length === 0) {
      console.error("No sports selected");
      return;
    }

    try {
      await createGroup(
        name,
        selectedTags.map((tag) => tag.id as string),
        selectedSports.map((sport) => sport.id as string)
      );
      UICtx.showModalAction();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleSearchTagInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTagInput(event.target.value);
    setShowClearTagInput(!!event.target.value);
  };

  const clearSearchTagInput = () => {
    setSearchTagInput("");
    setShowClearTagInput(false);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTagIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedTagsList = selectedTagIds.map(
      (id) => tags.find((tag) => tag.id === id)!
    );
    setSelectedTags((prevSelectedTags) => [
      ...prevSelectedTags,
      ...selectedTagsList,
    ]);
  };

  const removeSelectedTag = (id: string) => {
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

  const removeSelectedSport = (id: string) => {
    setSelectedSports((prevSelectedSports) =>
      prevSelectedSports.filter((sport) => sport.id !== id)
    );
  };

  return (
    <div className="fixed top-0 right-0 w-1/2 h-full bg-surface-light border-[1px] dark:bg-surface-primary-dark dark:border-outline-medium-dark p-10 overflow-scroll z-20">
      <div className="gap-y-4 dark:bg-surface-primary-dark">
        <div className="flex justify-between py-4 mb-4">
          <p className="font-semibold text-2xl">Create Group</p>
          <button onClick={UICtx.showModalAction}>
            <XMarkIcon className="w-8 p-2 border border-outline-medium rounded-full" />
          </button>
        </div>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="tag-name" className="py-4">
              Group Name*
            </label>
            <input
              className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-6 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
              ref={nameInputRef}
              name="name"
              type="text"
              maxLength={50}
              placeholder="Enter Group Name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="filter-tag" className="py-4">
              Filter Group Tags ({selectedTags.length})
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-12 pr-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
                type="text"
                placeholder="Search or select tags"
                value={searchTagInput}
                onChange={handleSearchTagInputChange}
                onFocus={() => setShowTagsDropdown(true)}
                onBlur={() => setTimeout(() => setShowTagsDropdown(false), 200)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {showClearTagInput && (
                <XMarkIcon
                  className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={clearSearchTagInput}
                />
              )}
              {showTagsDropdown && (
                <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-b-md shadow-lg">
                  <select
                    className="block w-full px-4 py-2 text-sm outline-none"
                    multiple
                    size={5}
                    value={selectedTags.map((tag) => tag.id)}
                    onChange={handleTagChange}
                  >
                    {tags
                      .filter((tag) =>
                        tag.name
                          .toLowerCase()
                          .includes(searchTagInput.toLowerCase())
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
                  <span className="text-sm">{tag.name}</span>
                  <XMarkIcon
                    className="h-4 w-4 ml-2 cursor-pointer"
                    onClick={() => removeSelectedTag(tag.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="filter-sport" className="py-4">
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
                    value={selectedSports.map((sport) => sport.id as string)}
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
                  <span className="text-sm">{sport.name}</span>
                  <XMarkIcon
                    className="h-4 w-4 ml-2 cursor-pointer"
                    onClick={() => removeSelectedSport(sport.id as string)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6">
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

export default CreateGroup;
