"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import { UIContext } from "../../store/ui-context";
import CreateSport from "./sports/create/page";
import CreateTag from "./tags/create/page";
import CreateGroup from "./groups/create/page";
import Modal from "./modal";

type SearchProps = {
  placeholder: string;
  page: string;
  onSearch: (query: string) => void;
};

export default function Search({ placeholder, page, onSearch }: SearchProps) {
  const UICtx = useContext(UIContext);
  const [showCreate, setShowCreate] = useState(false);

  const showCreateHandler = () => {
    setShowCreate(!showCreate);
    UICtx.showModalAction();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  let contentComponent = null;

  // Determine the modal content based on the page or context
  switch (page) {
    case "sports":
      contentComponent = CreateSport;
      break;
    case "tags":
      contentComponent = CreateTag;
      break;
    case "groups":
      contentComponent = CreateGroup;
      break;
    // Add more cases for other pages or contexts if needed
    default:
      contentComponent = CreateSport; // Default to CreateSport
  }

  return (
    <form className="relative flex flex-1 flex-shrink-0 gap-x-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-outline-medium dark:border-outline-medium-dark dark:bg-surface-extra-light-dark py-[9px] pl-10 text-sm outline-2 placeholder:on-light focus:outline-none focus:border-primary-primary dark:focus:border-primary-primary"
        placeholder={placeholder}
        onChange={handleSearchChange}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-outline-medium dark:text-on-surface-dark" />
      <button
        className="text-white dark:text-primary-light-dark text-sm font-bold text-nowrap border-1 bg-primary-primary dark:bg-primary-primary-dark px-8 py-1 rounded-xl"
        type="button"
        onClick={showCreateHandler}
      >
        Create New
      </button>
      <Modal content={contentComponent} />
    </form>
  );
}
